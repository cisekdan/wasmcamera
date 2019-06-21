const delta = 20;

const filter = async (imageData) => {
  const { data } = imageData;
  const buffer = new Uint32Array(data);
  buffer.set(data);
  for (let i = 0; i < buffer.length; i += 4) {
    let r = buffer[i];
    let g = buffer[i + 1];
    let b = buffer[i + 2];

    r = Math.min(255, r + 2 * delta);
    g = Math.min(255, g + delta);

    buffer[i] = r;
    buffer[i + 1] = g;
    buffer[i + 2] = b;
  }
  return new ImageData(
    new Uint8ClampedArray(buffer),
    imageData.width,
    imageData.height,
  );
  // return imageData;
};

filter.toString = () => '[JS] Sepia';

export default filter;