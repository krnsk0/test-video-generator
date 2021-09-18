import { makeTestVideo } from './make-test-video';
import { play } from './play';

(async () => {
  await makeTestVideo({
    fps: 30,
    width: 1280,
    height: 720,
    outname: 'out.mp4',
  });

  // play a video after generation
  // optional dev velocity enhancement
  await play('out.mp4', 10);
})();
