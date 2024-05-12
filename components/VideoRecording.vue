<template>
  <div id="video-recording">
    <h1>Video Recording</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToNext = () => {
  router.push("/#video-review");
};
</script>
