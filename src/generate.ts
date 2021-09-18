import { spawn } from 'child_process';
const ffmpegPath = require('ffmpeg-static');
import { flatmap, joinFilters } from './utils';
import { text } from './text';

type IGenerate = {
  seconds?: number;
  width?: number;
  height?: number;
  fps?: number;
  bgColor?: string;
  outName?: string;
  play?: boolean;
};

/**
 * use ffmpeg to generate a test video with the given paramaters
 */
export const generate = ({
  seconds = 10,
  width = 1280,
  height = 720,
  fps = 25,
  bgColor = 'blue',
  outName = 'out.mp4',
  play = false,
}: IGenerate): Promise<void> => {
  /**
   * in lavfi mode the input comes from a filtergraph string
   * responsible for setting background color but also
   * size, duration, fps.
   */
  const inputFiltergraph = `
    color=
    s=${width}x${height}:
    duration=${seconds}:
    rate=${fps}:
    c=${bgColor}
  `;

  const args = flatmap([
    ['-hide_banner'],
    ['-t', seconds.toString()],
    ['-f', 'lavfi'],
    ['-i', inputFiltergraph],
    ['-c:v', 'libx264'],
    ['-pix_fmt', 'yuv420p'],
    ['-vf', joinFilters(text({ text: 'hello' }), text({ text: 'test' }))],
    ['-loglevel', 'warning'],
    ['-y'],
    [`./output/${outName}`],
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
