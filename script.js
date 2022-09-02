const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = async () => {
      await videoElement.requestPictureInPicture();
      videoElement.play();
    };
  } catch (error) {}
}

button.addEventListener("click", async () => {
  button.disabled = true;

  await selectMediaStream();

  button.disabled = false;
});

// On Load
