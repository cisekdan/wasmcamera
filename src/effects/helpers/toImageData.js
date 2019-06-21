export default (buffer, { width, height }) => new ImageData(
  new Uint8ClampedArray(buffer),
  width,
  height,
);