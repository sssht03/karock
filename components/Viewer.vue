<template>
  <div id="preview" class="container">
    <div>
      <div class="videoContainer">
        <video playsinline controls class="videoPreview">
          <source :src="giftStore.videoUrl" type="video/mp4" />
        </video>
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

onMounted(() => {
  console.log(giftStore.videoUrl);
});
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
  height: calc(100svh);
  border-radius: 24px;
}

.videoContainer video {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  top: 30%;
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
