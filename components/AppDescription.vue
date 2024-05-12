<template>
  <div id="app-desctiption">
    <h1>App Description</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToNext = () => {
  router.push("/#video-instructions");
};
</script>
