export default (source, target, process, timeFn) => {
  const context = target.getContext('2d');
  const processor = {
    timerCallback: () => {
      processor.process();
      setTimeout(() => processor.timerCallback(), 1000 / 60);
    },
    process: () => {
      context.drawImage(source, 0, 0, 640, 480);
      const frame = context.getImageData(0, 0, source.width, source.height);
      const start = performance.now();
      const processedFrame = process(frame);
      const duration = performance.now() - start;
      timeFn(duration);
      context.putImageData(processedFrame, 0, 0);
    }
  };
  processor.timerCallback();
  return processor;
};