import { setVideoSource } from './camera';
import videoPreprocessor from './videoProcessor';
import { greyscale as effect } from './effects/js';

window.onload = () => {
  (async () => {
    const video = document.querySelector('video');
    const canvas = document.querySelector('#videoCanvas');
    await setVideoSource(video);
    videoPreprocessor(video, canvas, effect);
  })();
};
