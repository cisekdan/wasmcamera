export default (from, dataToSet = null) => {
  const buffer = new Uint32Array(from);
  if (dataToSet) {
    buffer.set(dataToSet);
  }

  return buffer;
}