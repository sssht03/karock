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
  const documentId = useRoute().query["documentId"] as string
  router.push({ hash: "#video-recording", query: { documentId: documentId } });
};
</script>
