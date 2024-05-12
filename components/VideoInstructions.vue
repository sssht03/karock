<template>
  <div id="video-instructions">
    <h1>動画を撮影するよ！</h1>
    <p>注意事項</p>
    <p>10秒とるよ！</p>
    <button @click="goToNextStep">撮影に進む</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToNextStep = () => {
  router.push("#video-recording");
};
</script>
