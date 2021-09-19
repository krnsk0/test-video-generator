import { makeTestVideo } from './make-test-video';
import { play } from './play';

(async () => {
  try {
    await makeTestVideo({
      fps: 30,
      duration: 10,
      width: 1280,
      height: 720,
      outname: '10sec30fps720p.mp4',
      bgcolor: 'blue'
    });

    await makeTestVideo({
      fps: 33,
      duration: 10,
      width: 1280,
      height: 720,
      outname: '10sec33fps720p.mp4',
      bgcolor: 'green'
    });

    await makeTestVideo({
      fps: 25,
      duration: 10,
      width: 1280,
      height: 720,
      outname: '10sec25fps720p.mp4',
      bgcolor: 'red'
    });

  } catch (err) {
    console.log(err);
  }
})();
