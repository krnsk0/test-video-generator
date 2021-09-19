import { spawn } from 'child_process';
import { flatmap } from './utils';
const ffmpegPath = require('ffmpeg-static');

type IGenerate = {
  duration?: number;
  width?: number;
  height?: number;
  fps?: number;
  bgcolor?: string;
  outname?: string;
  play?: boolean;
  filters?: string;
};

/**
 * use ffmpeg to generate a test video with the given paramaters
 */
export const generateVideo = ({
  duration = 10,
  width = 1280,
  height = 720,
  fps = 25,
  bgcolor = 'blue',
  outname = 'temp.mp4',
  filters = '',
}: IGenerate): Promise<void> => {
  /**
   * in lavfi mode the input comes from a filtergraph string
   * responsible for setting background color but also
   * size, duration, fps.
   */
  const inputFiltergraph = `
    color=
    s=${width}x${height}:
    duration=${duration}:
    rate=${fps}:
    c=${bgcolor}
  `;

  const args = flatmap([
    ['-hide_banner'],
    ['-t', duration.toString()],
    ['-f', 'lavfi'],
    ['-i', inputFiltergraph],
    ['-c:v', 'libx264'],
    ['-pix_fmt', 'yuv420p'],
    ['-vf', filters],
    ['-loglevel', 'warning'],
    ['-y'],
    [`./tmp/${outname}`],
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
