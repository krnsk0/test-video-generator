import { spawn } from 'child_process';
import { flatmap } from './utils';
const ffmpegPath = require('ffmpeg-static');

export const concatenate = async (
  invideo: string,
  inaudio: string,
  outname: string,
): Promise<void> => {
  const args = flatmap([
    ['-hide_banner'],
    ['-i', `./output/${invideo}`],
    ['-i', `./output/${inaudio}`],
    ['-c:v', 'copy'],
    ['-c:a', 'aac'],
    ['-loglevel', 'warning'],
    ['-y'],
    [`./output/${outname}`],
  ]);

  // run ffmpeg
  const ffmpeg = spawn(`${ffmpegPath}`, args);
  ffmpeg.stdout.pipe(process.stdout);
  ffmpeg.stderr.pipe(process.stderr);
  process.on('exit', () => {
    ffmpeg.kill();
  });

  return new Promise((resolve) => {
    ffmpeg.on('exit', () => {
      resolve();
    });
  });
};
