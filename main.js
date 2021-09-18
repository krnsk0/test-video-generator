const ffmpegPath = require('ffmpeg-static');
const { spawn } = require('child_process');

const flatmap = (arr) => {
  return arr.reduce((a, e) => a.concat(e), []);
};

const fps = 100;
const seconds = 5;
const width = 1280;
const height = 720;
const outName = 'out.mp4';
const color = 'blue';

const inputFiltergraph = `
color=
s=${width}x${height}:
duration=${seconds}:
rate=${fps}:
c=${color}
`;

const makeFilter = (text, options) => `
drawtext=
fontfile=roboto.ttf:
fontsize=${options?.size ?? 30}:
fontcolor=${options?.color ?? 'white'}:
x=${options?.x ?? `(w-text_w)/2`}:
y=${options?.y ?? `(h-text_h)/2`}:
text='${text}'
`;

const joinFilters = (...filters) => filters.join(',');

const args = flatmap([
  ['-hide_banner'],
  ['-t', seconds],
  ['-f', 'lavfi'],
  ['-i', inputFiltergraph],
  ['-c:v', 'libx264'],
  ['-pix_fmt', 'yuv420p'],
  ['-vf', joinFilters(makeFilter('hello'), makeFilter('hi'))],
  ['-y'],
  [`./output/${outName}`],
]);

const ffmpeg = spawn(`${ffmpegPath}`, args);

ffmpeg.stdout.pipe(process.stdout);
ffmpeg.stderr.pipe(process.stderr);

process.on('exit', () => {
  ffmpeg.kill();
});
