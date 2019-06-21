import getWasmInstance from '../../wasm/getInstance';
import {
  toImageData,
  toBuffer,
} from '../helpers';

let memory = new WebAssembly.Memory({ initial: 75 });

const greyscale = async (frame) => {
  const { data } = frame;

  const buffer = toBuffer(data, memory.buffer);

  const importObject = { js: { memory } };
  const { instance } = await getWasmInstance('./dist/greyscale.wasm', importObject);

  instance.exports.effect(0, data.length);
  return toImageData(buffer, frame);
};

greyscale.toString = () => '[WAT] Greyscale';

export default greyscale;
