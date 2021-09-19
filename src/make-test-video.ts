import { generateVideo } from './generate-video';
import { generateAudio } from './generate-audio';
import { text } from './text';
import { joinFilters } from './utils';
import { concatenate } from './concatenate';
import { remove, ensureDir } from 'fs-extra';

type IMakeTestVideo = {
  fps: number;
  duration: number;
  width: number;
  height: number;
  outname: string;
};

/**
 * Makes a test video with some useful information printed
 * to the screen: its width, height, fps, and timestamps.
 */
export const makeTestVideo = async ({
  fps,
  duration,
  width,
  height,
  outname,
}: IMakeTestVideo): Promise<void> => {
  await ensureDir('./tmp');

  const size = 40; // base font size
  const margin = 10;

  await generateVideo({
    fps,
    width,
    height,
    duration,
    outname: 'temp.mp4',
    filters: joinFilters(
      // screen top center
      text({ text: `${outname}`, size, y: `${margin}` }),
      text({ text: `${width}x${height}`, size, y: `${margin + size}` }),
      text({ text: `FPS: ${fps}`, size, y: `${margin + size * 2}` }),

      // screen center
      text({
        text: `%{pts \: hms}`,
        size: size * 4,
      }),

      // screen bottom left
      text({
        text: `audio`,
        size,
        x: `${margin * 3}`,
        y: `(h-${size + margin * 2})`,
        box: true,
        boxcolor: 'white',
        color: 'black',
        enable: `lt(mod(t\\,1)\\,0.05)`, // every second for 0.5
      }),

      // screen bottom center
      text({ text: `frame: %{n}`, size, y: `(h-${size + margin})` }),
    ),
  });

  await generateAudio(duration);

  await concatenate('temp.mp4', 'temp.wav', outname);

  await remove('./outout/temp.mp4', (err) => console.log(err));
  await remove('./outout/temp.wav', (err) => console.log(err));

  return Promise.resolve();
};
