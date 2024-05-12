<template>
  <div id="video-review">
    <h1>Video Review</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToNext = () => {
  router.push("/#message-entry");
};
</script>
