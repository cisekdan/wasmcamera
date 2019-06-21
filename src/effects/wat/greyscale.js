import getWasmInstance from '../../wasm/getInstance';

let memory = new WebAssembly.Memory({ initial: 75 });

const greyscale = async (frame) => {
  const { data } = frame;
  const buffer = new Uint32Array(memory.buffer);
  buffer.set(data);

  const importObject = { js: { memory } };
  const { instance } = await getWasmInstance('./dist/greyscale.wasm', importObject);

  instance.exports.effect(0, data.length);
  return new ImageData(
    new Uint8ClampedArray(buffer),
    frame.width,
    frame.height,
  );
};

greyscale.toString = () => '[WAT] Greyscale';

export default greyscale;
