const ffmpegPath = require('ffmpeg-static');

const flatmap = (arr) => {
  return arr.reduce((a, e) => a.concat(e), []);
};

const args = flatmap(['-hide_banner']);

const ffmpeg = spawn(`${ffmpegPath}`, args);

ffmpeg.stdout.pipe(process.stdout);
ffmpeg.stderr.pipe(process.stderr);

process.on('exit', () => {
  ffmpeg.kill();
});
