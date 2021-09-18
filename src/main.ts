import { generate } from './generate';
import { play } from './play';

(async () => {
  await generate({ play: true });
  await play('out.mp4', 10);
})();
