<template>
  <div id="completion">
    <h1>Completion</h1>
    <p>もう一度かざしてみてね！</p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToNext = () => {
  router.push("/");
};
</script>
