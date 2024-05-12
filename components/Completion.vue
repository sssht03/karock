<template>
  <div id="completion">
    <h1>Completion</h1>
    <button @click="goToNext">Next</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToNext = () => {
  router.push("/");
};
</script>
