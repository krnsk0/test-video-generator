import { generate } from './generate';
import { text } from './text';
import { joinFilters } from './utils';

type IMakeTestVideo = {
  fps: number;
  width: number;
  height: number;
};

export const makeTestVideo = ({
  fps,
  width,
  height,
}: IMakeTestVideo): Promise<void> => {
  const topOffset = 10;
  const size = 40;

  return generate({
    fps,
    width,
    height,
    filters: joinFilters(
      text({ text: `FPS: ${fps}`, y: `${topOffset}`, size }),
      text({ text: `${width}x${height}`, y: `${topOffset + size}`, size }),
    ),
  });
};
