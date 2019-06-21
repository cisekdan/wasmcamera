export default (data, from = null) => {
  const buffer = new Uint32Array(from || data.length);
  buffer.set(data);

  return buffer;
}