import getWasmInstance from '../../wasm/getInstance';

let memory = new WebAssembly.Memory({ initial: 75 });

const filter = async (frame) => {
  const { data } = frame;
  const buffer = new Uint32Array(memory.buffer);
  buffer.set(data);

  const importObject = { js: { memory } };
  const { instance } = await getWasmInstance('./dist/meanFilter.wasm', importObject);

  instance.exports.effect(0, data.length, frame.width);
  return new ImageData(
    new Uint8ClampedArray(buffer),
    frame.width,
    frame.height,
  );
};

filter.toString = () => '[WAT] Mean filter';

export default filter;