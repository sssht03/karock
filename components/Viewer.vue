<template>
  <div id="viewer">
    <h1>Viewer</h1>
    <video :src="giftStore.videoUrl" autoplay loop></video>
    <p>{{ giftStore.title }}</p>
    <p>{{ giftStore.fromName }}</p>
    <p>{{ giftStore.toName }}</p>
    <p>{{ giftStore.message }}</p>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();

</script>
