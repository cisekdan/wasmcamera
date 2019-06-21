const delta = 20;

const filter = async (frame) => {
  const { data } = frame;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    r = Math.min(255, r + 2 * delta);
    g = Math.min(255, g + delta);

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  return frame;
};

filter.toString = () => '[JS] Sepia';

export default filter;