import { generateVideo } from './generate-video';
import { text } from './text';
import { joinFilters } from './utils';

type IMakeTestVideo = {
  fps: number;
  width: number;
  height: number;
  outname: string;
};

/**
 * Makes a test video with some useful information printed
 * to the screen: its width, height, fps, and timestamps.
 */
export const makeTestVideo = ({
  fps,
  width,
  height,
  outname,
}: IMakeTestVideo): Promise<void> => {
  const size = 40; // base font size
  const margin = 10;

  return generateVideo({
    fps,
    width,
    height,
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
};
