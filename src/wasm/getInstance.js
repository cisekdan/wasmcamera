const cache = {};

const getInstance = async (file, args) => {
  if (file in cache) {
    return cache[file];
  }
  const response = await fetch(file);
  const buffer = await response.arrayBuffer();
  cache[file] = await WebAssembly.instantiate(buffer, args);
  return cache[file];
};

export default getInstance;