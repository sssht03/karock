<template>
  <div id="video-instructions">
    <h1>Video Instructions</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToNext = () => {
  router.push("/#video-recording");
};
</script>
