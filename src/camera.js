export const setVideoSource = async (videoDisplay) => {
  if (!navigator.mediaDevices.getUserMedia) {
    throw new Error("No camera available");
  }
  videoDisplay.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
};