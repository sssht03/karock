<template>
  <section class="container">
    <div class="videoContainer">
      <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>

      <video
        v-if="recordedVideoUrl === null"
        class="videoRecording"
        ref="videoElement"
        autoplay
        muted
        playsInline
        aria-label="Live camera feed"
      ></video>

      <div v-if="isRecording === true" class="recordingIcon">
        <div class="recordingCircle"></div>
        <p class="recordingText">REC</p>
      </div>

      <video
        v-if="recordedVideoUrl !== null"
        class="videoPreview"
        :src="recordedVideoUrl"
        autoplay
        playsInline
        loop
        aria-label="Recorded video preview"
      ></video>
    </div>

    <div v-if="isRecording === true" class="progressContainer">
      <!-- <canvas ref="waveformCanvas" class="waveformCanvas"></canvas> -->
      <svg class="progressCircle" viewBox="0 0 36 36">
        <path
          class="progressBg"
          d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="progressBar"
          d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div class="progressText" id="progressText">{{ progressText }}</div>
    </div>

    <div v-if="recordedVideoUrl !== null" class="controls">
      <button @click="recordAgain" class="retakeButton">撮り直す</button>
      <button @click="navigateToNextStep" class="confirmButton">これでOK</button>
    </div>
  </section>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();
const route = useRoute();

const countdown = ref<number>(0);
const videoElement = ref<HTMLVideoElement | null>(null);
const recordedVideoUrl = ref<string | null>(null);
const isRecording = ref<boolean>(false);
const progressText = ref<string>("");

let stream: MediaStream;
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];
const RECORDING_TIME = 10000;

let animationFrameId: number;
const waveformCanvas = ref<HTMLCanvasElement | null>(null);
let audioContext: AudioContext;
let analyser: AnalyserNode;
let dataArray: Uint8Array;

onMounted(async () => {
  await initializeRecording();
});

onBeforeUnmount(() => {
  stopRecording();
});

async function initializeRecording() {
  try {
    stream = await getMediaStream();
    await startCountdown();
    setupVideoStream(stream);
    isRecording.value = true;

    await nextTick();

    startMediaRecorder(stream);
    startCircularProgressBar(RECORDING_TIME);
    // startAudioWaveform();

    setTimeout(() => {
      stopRecording();
      isRecording.value = false;
    }, RECORDING_TIME + 300);
  } catch (error) {
    handleError(error as Error);
  }
}

async function startCountdown() {
  countdown.value = 3;
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

async function getMediaStream(): Promise<MediaStream> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("getUserMedia is not supported in this browser");
  }
  return await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
    },
    audio: true,
  });
}

function setupVideoStream(stream: MediaStream) {
  if (videoElement.value) {
    videoElement.value.srcObject = stream;
    // videoElement.value.onloadedmetadata = () => {};
  }
}

function startMediaRecorder(stream: MediaStream) {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = previewRecording;
  mediaRecorder.start();
}

function handleDataAvailable(event: BlobEvent) {
  if (event.data && event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

function stopRecording() {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
  }
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }
  cancelAnimationFrame(animationFrameId);
}

function previewRecording() {
  if (!recordedChunks.length) return;
  const blob = new Blob(recordedChunks, { type: 'video/mp4' });
  recordedVideoUrl.value = URL.createObjectURL(blob);
  giftStore.setVideo(blob, recordedVideoUrl.value);
}

function recordAgain() {
  recordedVideoUrl.value = null;
  giftStore.setVideo(null, "");
  recordedChunks = [];
  progressText.value = "";
  initializeRecording();
}

function startCircularProgressBar(duration: number): void {
  const progressBar = document.querySelector<SVGPathElement>(".progressBar");
  if (!progressBar) return;

  let startTime: number | null = null;

  function updateProgressBar(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const remainingTime = duration - elapsed;
    const seconds = Math.floor(remainingTime / 1000);
    const tenths = Math.floor((remainingTime % 1000) / 100);

    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedTenths = tenths.toString();
    const dashOffset = 100 - progress * 100;

    if (progressBar) {
      progressBar.style.strokeDashoffset = dashOffset.toString();
    }

    progressText.value = `${formattedSeconds}:${formattedTenths}`;

    if (progress < 1) {
      requestAnimationFrame(updateProgressBar);
    } else {
      progressText.value = "00:0";
    }
  }

  requestAnimationFrame(updateProgressBar);
}

// function startAudioWaveform() {
//   if (!waveformCanvas.value) return;

//   const canvas = waveformCanvas.value;
//   const canvasCtx = canvas.getContext("2d");
//   audioContext = new AudioContext();
//   analyser = audioContext.createAnalyser();
//   const source = audioContext.createMediaStreamSource(stream);
//   source.connect(analyser);
//   analyser.fftSize = 2048;
//   const bufferLength = analyser.frequencyBinCount;
//   dataArray = new Uint8Array(bufferLength);

//   function draw() {
//     if (!canvasCtx) return;
//     animationFrameId = requestAnimationFrame(draw);

//     analyser.getByteTimeDomainData(dataArray);

//     canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//     canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

//     canvasCtx.lineWidth = 2;
//     canvasCtx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
//     canvasCtx.fillStyle = 'rgba(0, 255, 0, 0.3)'; 

//     canvasCtx.beginPath();
//     const sliceWidth = (canvas.width * 1.0) / bufferLength;
//     let x = 0;

//     canvasCtx.moveTo(0, canvas.height / 2);

//     for (let i = 0; i < bufferLength; i++) {
//       const v = dataArray[i] / 128.0;
//       const y = (v * canvas.height) / 2;

//       if (i === 0) {
//         canvasCtx.moveTo(x, y);
//       } else {
//         canvasCtx.lineTo(x, y);
//       }

//       x += sliceWidth;
//     }

//     canvasCtx.lineTo(canvas.width, canvas.height / 2);
//     canvasCtx.stroke();
//     canvasCtx.fill();
//   }

//   animationFrameId = requestAnimationFrame(draw);
// }

function navigateToNextStep() {
  const documentId = route.query["documentId"] as string;
  router.push({ hash: "#message-entry", query: { documentId: documentId } });
}

function handleError(error: Error) {
  console.error("Error:", error);
  alert(error.message);
}
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  position: relative;
  height: 100svh;
}

.countdown {
  color: #fff;
  font-size: 6rem;
  font-family: "Montserrat";
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.videoContainer {
  height: calc(100svh - 72px);
  border-radius: 24px;
}

.videoContainer video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
}

.recordingIcon {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.recordingCircle {
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background-color: #ec0000;
  animation: blink 2s infinite;
}

.recordingText {
  color: #fff;
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  margin-top: 1px;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.progressContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 56px;
  margin-top: 8px;
}

.progressCircle {
  width: 100%;
  height: 100%;
}

.progressBg {
  fill: none;
  stroke: #f3f3f3;
  stroke-width: 4;
}

.progressBar {
  fill: none;
  stroke: #0066be;
  stroke-width: 4;
  stroke-dasharray: 100, 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.1s linear;
}

.progressText {
  position: absolute;
  font-size: 0.8rem;
  color: #fff;
}

/* .waveformCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
} */

.controls {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 72px;
  padding: 8px;
  gap: 8px;
  background-color: #1a1a1a;
}

.controls button {
  height: 48px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
}

.retakeButton {
  border: solid 1px #fff;
  color: #fff;
  background-color: #1a1a1a;
}

.retakeButton:hover {
  background-color: #999999;
}

.confirmButton {
  border: none;
  color: #1a1a1a;
  background-color: #fff;
}
</style>
