<template>
  <div id="completion">
    <h1>Completion</h1>
    <p>もう一度かざしてみてね！</p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToNext = () => {
  const documentId = useRoute().query["documentId"] as string
  router.push({ hash: "/", query: { documentId: documentId } });
};
</script>
