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

const greyscale = async (frame) => {
  const { data } = frame;
  const buffer = new Uint32Array(memory.buffer);
  buffer.set(data);

  const importObject = { js: { memory, log: console.log } };
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
/**
 const { data } = imageData;
 const pages = Math.ceil(data.length * 4 / 2 ** 16) + (additionalMemoryPages || 0);
 const memory = new WebAssembly.Memory({ initial: pages });
 const buffer = new Uint32Array(memory.buffer);
 buffer.set(data);
 **/