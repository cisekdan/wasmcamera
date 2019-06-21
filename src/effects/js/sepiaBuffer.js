import { toBuffer, toImageData } from '../helpers';

const delta = 20;

const filter = async (frame) => {
  const { data } = frame;
  const buffer = toBuffer(data);

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
  return toImageData(buffer, frame);
};

filter.toString = () => '[JS] Sepia - copy to buffer';

export default filter;