<template>
  <div id="preview">
    <h1>Preview</h1>
    <video :src="giftStore.videoUrl" autoplay loop></video>
    <p>{{ giftStore.title }}</p>
    <p>{{ giftStore.fromName }}</p>
    <p>{{ giftStore.toName }}</p>
    <p>{{ giftStore.message }}</p>
    <button @click="goToNextStep">これで保存する</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const giftStore = useGiftStore();

function goToNextStep() {
  router.push("#upload");
}
</script>
