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
      // at top of screen
      text({ text: `${outname}`, size, y: `${margin}` }),
      text({ text: `${width}x${height}`, size, y: `${margin + size}` }),
      text({ text: `FPS: ${fps}`, size, y: `${margin + size * 2}` }),

      // screen center
      text({
        text: `%{pts \: hms}`,
        size: size * 4,
      }),

      // screen bottom
      text({ text: `frame: %{n}`, size, y: `(h-${size + margin})` }),
    ),
  });
};
