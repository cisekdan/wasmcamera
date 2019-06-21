const delta = 20;

const filter = async (imageData) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];

    r = Math.min(255, r + 2 * delta);
    g = Math.min(255, g + delta);

    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
  }
  return imageData;
};

filter.toString = () => '[JS] Sepia';

export default filter;