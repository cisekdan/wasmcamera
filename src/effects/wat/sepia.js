import getWasmInstance from '../../wasm/getInstance';

const delta = 20;

let memory = new WebAssembly.Memory({ initial: 75 });

const filter = async (frame) => {
  const { data } = frame;
  const buffer = new Uint32Array(memory.buffer);
  buffer.set(data);

  const importObject = { js: { memory } };
  const { instance } = await getWasmInstance('./dist/sepia.wasm', importObject);

  instance.exports.effect(0, data.length, delta);
  return new ImageData(
    new Uint8ClampedArray(buffer),
    frame.width,
    frame.height,
  );
};

filter.toString = () => '[WAT] Sepia';

export default filter;