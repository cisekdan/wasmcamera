const greyscale = async (frame) => {
  const length = frame.data.length / 4;
  for (let i = 0; i < length; i++) {
    const offset = i * 4;
    const r = frame.data[offset];
    const g = frame.data[offset + 1];
    const b = frame.data[offset + 2];
    const greyscale = (r + g + b) / 3;
    frame.data[offset] = greyscale;
    frame.data[offset + 1] = greyscale;
    frame.data[offset + 2] = greyscale;
  }
  return frame;
};

greyscale.toString = () => '[JS] Greyscale';

export default greyscale;