import { setVideoSource } from './camera';
import videoPreprocessor from './videoProcessor';
import {
  js as jsEffects,
  wat as watEffects
} from './effects';

const dimensions = { width: 640, height: 480 };

const prepareEffectPreview = (video, effect, name = effect.toString()) => {
  let totalTime = 0;
  let renders = 0;
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
    totalTime += time;
    renders++;
    timeDisplay.textContent = `x̄  = ${Math.round(totalTime/renders)} ms`;
  });
};

const sets = {
  greyscale: [jsEffects.greyscale, watEffects.greyscale],
  greyscaleBuffer: [jsEffects.greyscaleBuffer, watEffects.greyscale],
};

const getSetIdentifier = (defaultValue = null) => (new URL(document.location)).searchParams.get('set') || defaultValue;

window.onload = () => {
  (async () => {
    const video = document.querySelector('video');
    await setVideoSource(video);
    sets[getSetIdentifier()].forEach(effect => prepareEffectPreview(video, effect));
  })();
};
