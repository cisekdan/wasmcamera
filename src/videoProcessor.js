export default (source, target, process) => {
  const context = target.getContext('2d');
  const processor = {
    timerCallback: () => {
      processor.process();
      setTimeout(() => processor.timerCallback(), 1000 / 60);
    },
    process: () => {
      context.drawImage(source, 0, 0, 640, 480);
      const frame = context.getImageData(0, 0, source.width, source.height);
      const processedFrame = process(frame);
      context.putImageData(processedFrame, 0, 0);
    }
  };
  processor.timerCallback();
  return processor;
};