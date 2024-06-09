<template>
  <section class="video-recording">
    <h1>Recording</h1>

    <div
        v-if="isLoading"
        class="loading-screen"
        role="alert"
        aria-live="assertive"
      >
        <p>Loading...</p>
      </div>

    <video
      v-if="recordedVideoUrl === null"
      ref="videoElement"
      autoplay
      muted
      playsInline
      aria-label="Live camera feed"
    ></video>

    <video
      v-if="recordedVideoUrl !== null"
      :src="recordedVideoUrl"
      autoplay
      muted
      playsInline
      aria-label="Recorded video preview"
    ></video>

    <div v-if="recordedVideoUrl !== null" class="controls">
      <button @click="goToNextStep">これでOK</button>
      <button @click="recordAgain">撮り直す</button>
    </div>
  </section>
</template>

<script setup lang="ts">
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
    video: true,
    // audio: true,
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
  isLoading.value = true
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
