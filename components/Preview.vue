<template>
  <div id="preview">
    <h1>Preview</h1>
    <video :src="giftStore.videoUrl" playsinline autoplay loop></video>
    <p>{{ giftStore.title }}</p>
    <p>{{ giftStore.fromName }}</p>
    <p>{{ giftStore.toName }}</p>
    <p>{{ giftStore.message }}</p>
    <button @click="navigateToNextStep">これで保存する</button>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();

function navigateToNextStep() {
  const documentId = useRoute().query["documentId"] as string
  router.push({ hash: "#upload", query: { documentId: documentId } });
}
</script>
