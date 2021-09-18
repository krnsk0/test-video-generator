const ffplayPath = require('ffplay-static');
import { spawn } from 'child_process';
import { flatmap } from './utils';

export const play = (path: string, seconds: number = 1): Promise<void> => {
  const args = flatmap([
    ['-hide_banner'],
    [`./output/${path}`],
    ['-loglevel', 'warning'],
    ['-t', seconds.toString()],
    ['-autoexit'],
    ['-exitonkeydown'],
  ]);

  const ffplay = spawn(ffplayPath.default, args);

  ffplay.stdout.pipe(process.stdout);
  ffplay.stderr.pipe(process.stderr);
  process.on('exit', () => {
    ffplay.kill();
  });

  return new Promise((resolve) => {
    ffplay.on('exit', () => {
      resolve();
    });
  });
};
