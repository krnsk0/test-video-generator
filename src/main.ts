import { makeTestVideo } from './make-test-video';
import { play } from './play';

(async () => {
  await makeTestVideo({ fps: 25, width: 1280, height: 720 });

  // play a video after generation
  // optional dev velocity enhancement
  await play('out.mp4', 10);
})();
