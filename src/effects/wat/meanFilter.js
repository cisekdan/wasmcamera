let wasmInstance = null;
let memory = new WebAssembly.Memory({ initial: 75 });

const getWasmInstance = async (file, importData) => {
  if (wasmInstance) {
    return wasmInstance;
  }
  const response = await fetch(file);
  const buffer = await response.arrayBuffer();
  wasmInstance = await WebAssembly.instantiate(buffer, importData);
  return wasmInstance;
};

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