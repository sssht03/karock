<template>
  <div id="preview" class="container">
    <div>
      <div class="videoContainer">
        <video
          :src="giftStore.videoUrl"
          playsinline
          autoplay
          loop
          class="videoPreview"
        ></video>
        <p class="name">
          from {{ giftStore.fromName }} to {{ giftStore.toName }}
        </p>
        <p class="message">{{ giftStore.message }}</p>
        <p class="date">{{ giftStore.date }}</p>
      </div>

      <div class="controls">
        <button @click="navigateBack" class="backButton">戻る</button>
        <button @click="startUpload" class="confirmButton">保存する</button>
      </div>
    </div>

    <div v-if="isUploading" class="modal">
      <div class="uploadModal">
        <div class="loader"></div>
        <p>保存中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();
const { $uploadData } = useNuxtApp();

const isUploading = ref(false);
const uploadError = ref(false);

function navigateBack() {
  router.back();
}

async function startUpload() {
  isUploading.value = true;

  const documentId = useRoute().query["documentId"] as string;
  const { videoBlob, fromName, toName, date, message } = giftStore;

  if (videoBlob === null) {
    throw Error("ビデオがうまく撮れてません");
  }

  try {
    await $uploadData(documentId, videoBlob, fromName, toName, date, message);
  } catch (error) {
    uploadError.value = true;
    return
  } finally {
    isUploading.value = false;
    router.push({ hash: "#completion", query: { documentId: documentId } });
  }
}
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  height: 100svh;
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
  position: relative;
}

.videoContainer {
  position: relative;
  height: calc(100svh - 72px);
  border-radius: 24px;
}

.videoContainer video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
}

.name {
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  font-size: 1rem;
  /* transform-origin: left bottom; */
  /* transform: rotate(90deg); */
}

.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.date {
  position: absolute;
  bottom: 8px;
  right: 12px;
  color: white;
  font-size: 1rem;
}

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

.backButton {
  border: solid 1px #fff;
  color: #fff;
  background-color: #1a1a1a;
}

.backButton:hover {
  background-color: #999999;
}

.confirmButton {
  border: none;
  color: #1a1a1a;
  background-color: #fff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.uploadModal {
  background-color: #fff;
  padding: 32px 32px 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0066be;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
