<template>
  <div id="preview" class="container">
    <div class="videoContainer">
      <video
        :src="giftStore.videoUrl"
        playsinline
        autoplay
        loop
        class="videoPreview"
      ></video>
      <p class="name">from {{ giftStore.fromName }} to {{ giftStore.toName }}</p>
      <p class="message">{{ giftStore.message }}</p>
      <p class="date">{{ giftStore.date }}</p>
    </div>

    <div class="controls">
      <button @click="navigateToNextStep" class="confirmButton">これで保存する</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();

function navigateToNextStep() {
  const documentId = useRoute().query["documentId"] as string;
  router.push({ hash: "#upload", query: { documentId: documentId } });
}
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  height: 100svh;
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  /* transform-origin: right top; */
  /* transform: rotate(-90deg); */
}

.controls {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}

.confirmButton {
  height: 56px;
  padding: 16px 48px;
  border: none;
  border-radius: 8px;
  color: #1a1a1a;
  background-color: #fff;
  font-size: 18px;
  font-family: "Noto Sans JP", sans-serif;
}
</style>
