<template>
  <div class="video-recording">
    <h1 v-if="count > 0">Recording starts in: {{ count }}</h1>
    <h1 v-else-if="count == 0">Recording starts!!</h1>
    <h1 v-else-if="isRecording">Recording...</h1>
    <h1 v-else>Recording Finished</h1>

    <video
      v-if="recordedVideoUrl === null"
      ref="videoElement"
      autoplay
      muted
    ></video>
    <video v-else :src="recordedVideoUrl" autoplay loop></video>

    <template v-if="!isRecording && recordedVideoUrl">
      <button @click="goToNextStep">これでOK</button>
      <button @click="recordAgain">撮り直す</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const count = ref(3);

const videoElement = ref<HTMLVideoElement | null>(null);
const recordedVideoUrl = ref<string | null>(null);
const isRecording = ref(false);
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

onMounted(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoElement.value) {
      videoElement.value.srcObject = stream;
    }
    setupMediaRecorder(stream);
    startCountdown();
  } catch (error) {
    console.error("Permission denied or not available: ", error);
    alert("You need to grant permissions to proceed.");
  }
});

function setupMediaRecorder(stream: MediaStream) {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    recordedVideoUrl.value = URL.createObjectURL(blob);
    console.log("Recording stopped, video available at:", recordedVideoUrl);
    isRecording.value = false; // Ensure recording state is updated when stopped
  };
}

function startCountdown() {
  const timer = setInterval(() => {
    console.log(count.value);
    if (count.value > 0) {
      count.value--;
    } else if (mediaRecorder && mediaRecorder.state === "inactive") {
      clearInterval(timer);
      startRecording();
      count.value = -1;
    }
  }, 1000);
}

function startRecording() {
  if (mediaRecorder) {
    isRecording.value = true;
    mediaRecorder.start();

    setTimeout(() => {
      if (mediaRecorder!.state === "recording") {
        mediaRecorder!.stop();
      }
    }, 3000); // Stop recording after 10 seconds
  }
}

function recordAgain() {
  recordedVideoUrl.value = "";
  startRecording();
}

const router = useRouter();
const goToNextStep = () => {
  router.push("/#video-review");
};
</script>
