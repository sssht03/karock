<template>
  <div id="preview" class="container">
    <div>
      <div class="videoContainer">
        <video
          :src="giftStore.videoUrl"
          playsinline
          loop
          class="videoPreview"
        ></video>
        <p class="name">
          from {{ giftStore.fromName }} to {{ giftStore.toName }}
        </p>
        <p class="message">{{ giftStore.message }}</p>
        <p class="date">{{ giftStore.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
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

</style>
