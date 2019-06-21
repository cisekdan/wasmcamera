import { toBuffer, toImageData } from '../helpers';

const effect = async (frame) => {
  const { data } = frame;
  const buffer = toBuffer(data);

  const length = data.length / 4;
  for (let i = 0; i < length; i++) {
    const offset = i * 4;
    const r = buffer[offset];
    const g = buffer[offset + 1];
    const b = buffer[offset + 2];
    const greyscale = (r + g + b) / 3;
    buffer[offset] = greyscale;
    buffer[offset + 1] = greyscale;
    buffer[offset + 2] = greyscale;
  }

  return toImageData(buffer, frame);
};

effect.toString = () => '[JS] Greyscale - copy to buffer';

export default effect;