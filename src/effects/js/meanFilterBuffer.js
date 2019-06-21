import { toBuffer, toImageData } from '../helpers';

const filter = async (frame) => {
  const { width, data } = frame;

  const buffer = toBuffer(data);
  const start = width * 4;
  const end = buffer.length - width * 4;
  for (let i = start; i < end; i += 4) {
    let r = 0;
    let g = 0;
    let b = 0;

    r = buffer[i] + buffer[i - 4] + buffer[i + 4]
      + buffer[i - width * 4] + buffer[i - width * 4 - 4] + buffer[i - width * 4 + 4]
      + buffer[i + width * 4 - 4] + buffer[i + width * 4] + buffer[i + width * 4 + 4];

    g = buffer[i + 1] + buffer[i - 3] + buffer[i + 5]
      + buffer[i - width * 4 +  1] + buffer[i - width * 4 -  3] + buffer[i - width * 4 +  5]
      + buffer[i + width * 4 -  3] + buffer[i + width * 4 +  1] + buffer[i + width * 4 +  5];

    b = buffer[i + 2] + buffer[i - 2] + buffer[i + 6]
      + buffer[i - width * 4 +  2] + buffer[i - width * 4 -  2] + buffer[i - width * 4 +  6]
      + buffer[i + width * 4 -  2] + buffer[i + width * 4 +  2] + buffer[i + width * 4 +  6];

    r /= 9;
    g /= 9;
    b /= 9;

    buffer[i] = r;
    buffer[i + 1] = g;
    buffer[i + 2] = b;
  }
  return toImageData(buffer, frame);
};

filter.toString = () => '[JS] Mean filter - Copy to buffer';

export default filter;