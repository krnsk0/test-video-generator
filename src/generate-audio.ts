import { spawn } from 'child_process';
import { flatmap } from './utils';
const pathToSox = require('sox-static-macos');

export const generateAudio = async (seconds: number): Promise<void> => {
  const args = flatmap([
    ['./src/click.wav'],
    ['./output/temp.wav'],
    ['repeat', `${seconds - 1}`],
  ]);
  // run ffmpeg
  const sox = spawn(`${pathToSox}`, args);
  sox.stdout.pipe(process.stdout);
  sox.stderr.pipe(process.stderr);
  process.on('exit', () => {
    sox.kill();
  });

  return new Promise((resolve) => {
    sox.on('exit', () => {
      resolve();
    });
  });
};
