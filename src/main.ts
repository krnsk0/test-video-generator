import { makeTestVideo } from './make-test-video';
import { play } from './play';

(async () => {
  try {
    await makeTestVideo({
      fps: 30,
      duration: 10,
      width: 1280,
      height: 720,
      outname: 'out.mp4',
    });

    await play('out.mp4', 10);
  } catch (err) {
    console.log(err);
  }
})();
