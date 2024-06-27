<template>
  <section class="container">
    <div class="videoContainer">
      <video
        v-if="recordedVideoUrl === null"
        class="videoRecording"
        ref="videoElement"
        autoplay
        muted
        playsInline
        aria-label="Live camera feed"
      ></video>

      <video
        v-if="recordedVideoUrl !== null"
        class="videoPreview"
        :src="recordedVideoUrl"
        autoplay
        playsInline
        aria-label="Recorded video preview"
      ></video>
    </div>
    <div class="controls">
      <button @click="recordAgain" class="retakeButton">撮り直す</button>
      <button @click="goToNextStep" class="confirmButton">これでOK</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

const giftStore = useGiftStore();
const router = useRouter();

const videoElement = ref<HTMLVideoElement | null>(null);
const recordedVideoUrl = ref<string | null>(null);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  await initializeRecording();
});

onBeforeUnmount(() => {
  stopRecording();
});

let stream: MediaStream;
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

async function initializeRecording() {
  try {
    stream = await getMediaStream();
    setupVideoStream(stream);
    startMediaRecorder(stream);

    setTimeout(() => {
      stopRecording();
    }, 5000);
  } catch (error) {
    handleError(error);
  }
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
    videoElement.value.onloadedmetadata = () => {
      isLoading.value = false; // カメラ映像が準備できたらローディング状態を更新する
    };
  }
}

function startMediaRecorder(stream: MediaStream) {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);
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
}

function previewRecording() {
  if (!recordedChunks.length) return;
  const blob = new Blob(recordedChunks, { type: mediaRecorder!.mimeType });
  recordedVideoUrl.value = URL.createObjectURL(blob);
  giftStore.setVideo(blob, recordedVideoUrl.value);
}

function recordAgain() {
  recordedVideoUrl.value = null;
  giftStore.setVideo(null, "");
  recordedChunks = [];
  isLoading.value = true;
  initializeRecording();
}

function goToNextStep() {
  const documentId = useRoute().query["documentId"] as string;
  router.push({ hash: "#message-entry", query: { documentId: documentId } });
}

function handleError(error: Error) {
  console.error("Error:", error);
  alert(error.message);
  isLoading.value = false;
}
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  position: relative;
  height: 100svh;
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

.controls {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 72px; /* 固定された高さ */
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

.confirmButton {
  color: #1a1a1a;
  background-color: #fff;
}
</style>
