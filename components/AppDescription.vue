<template>
  <div id="app-desctiption">
    <h1>アプリの説明</h1>
    <p>このアプリは〜〜〜〜です</p>
    <button @click="goToNextStep">次へ</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const giftStore = useGiftStore()
const router = useRouter();
const route = useRoute()

onMounted(() => {
  const query = route.query['documentId'] as string
  giftStore.setDocumentId(query)
})

const goToNextStep = () => {
  router.push("#video-instructions");
};
</script>
