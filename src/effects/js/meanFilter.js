const filter = async (frame) => {
  const { width, data } = frame;
  const start = width * 4;
  const end = data.length - width * 4;
  for (let i = start; i < end; i += 4) {
    let r = 0;
    let g = 0;
    let b = 0;

    r = data[i] + data[i - 4] + data[i + 4]
      + data[i - width * 4] + data[i - width * 4 - 4] + data[i - width * 4 + 4]
      + data[i + width * 4 - 4] + data[i + width * 4] + data[i + width * 4 + 4];

    g = data[i + 1] + data[i - 3] + data[i + 5]
      + data[i - width * 4 +  1] + data[i - width * 4 -  3] + data[i - width * 4 +  5]
      + data[i + width * 4 -  3] + data[i + width * 4 +  1] + data[i + width * 4 +  5];

    b = data[i + 2] + data[i - 2] + data[i + 6]
      + data[i - width * 4 +  2] + data[i - width * 4 -  2] + data[i - width * 4 +  6]
      + data[i + width * 4 -  2] + data[i + width * 4 +  2] + data[i + width * 4 +  6];

    r /= 9;
    g /= 9;
    b /= 9;

    frame.data[i] = r;
    frame.data[i + 1] = g;
    frame.data[i + 2] = b;
  }
  return frame;
};

filter.toString = () => '[JS] Mean filter';

export default filter;