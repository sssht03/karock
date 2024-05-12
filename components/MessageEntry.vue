<template>
  <div id="message-entry">
    <h1>Message Entry</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToNext = () => {
  router.push("/#preview");
};
</script>
