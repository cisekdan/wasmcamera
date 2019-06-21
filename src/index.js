import { setVideoSource } from './camera';
import videoPreprocessor from './videoProcessor';
import {
  js as jsEffects,
  wat as watEffects
} from './effects';

const dimensions = { width: 640, height: 480 };

const prepareEffectPreview = (video, effect, name = effect.toString()) => {
  const canvas = document.createElement('canvas');
  Object.entries(dimensions).map(([k, v]) => canvas[k] = v);
  const wrapper = document.createElement('div');
  wrapper.className = 'display';
  wrapper.appendChild(document.createTextNode(name));
  wrapper.appendChild(canvas);
  const timeDisplay = document.createElement('time');
  wrapper.appendChild(timeDisplay);
  document.querySelector('#displays').appendChild(wrapper);
  videoPreprocessor(video, canvas, effect, (time) => {
    timeDisplay.textContent = `${1000/time} FPS`;
  });
};

window.onload = () => {
  (async () => {
    const video = document.querySelector('video');
    await setVideoSource(video);
    // prepareEffectPreview(video, jsEffects.meanFilter);
    // prepareEffectPreview(video, watEffects.greyscale);
    prepareEffectPreview(video, watEffects.meanFilter);
  })();
};
