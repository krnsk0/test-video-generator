const ffmpegPath = require('ffmpeg-static');
const { spawn } = require('child_process');

const flatmap = (arr) => {
  return arr.reduce((a, e) => a.concat(e), []);
};

const removeSpace = (s) => s[0].replace(/\s+/g, '');

const fps = 30;
const seconds = 3;
const width = 1280;
const height = 720;
const outName = 'out.mp4';
const filtergraph = removeSpace`
drawtext=fontfile=DroidSansMono.ttf:
timecode='09\\:57\\:00\\:00':
x=(w-tw)/2:
y=(w-ty)/2:
fontcolor=white
`;

const args = flatmap([
  ['-hide_banner'],
  ['-t', seconds],
  ['-f', 'lavfi'],
  ['-i', `color=c=black:s=${width}x${height}`],
  ['-c:v', 'libx264'],
  ['-r', fps], // set fps
  ['-pix_fmt', 'yuv420p'],
  ['-y'],
  [`./output/${outName}`],
]);

const ffmpeg = spawn(`${ffmpegPath}`, args);

ffmpeg.stdout.pipe(process.stdout);
ffmpeg.stderr.pipe(process.stderr);

process.on('exit', () => {
  ffmpeg.kill();
});
