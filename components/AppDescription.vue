<template>
  <div id="app-desctiption">
    <template v-if="isLoading"></template>
    <template v-else>
      <h1>アプリの説明</h1>
      <p>このアプリは〜〜〜〜です</p>
      <button @click="goToNextStep">次へ</button>
    </template>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();
const route = useRoute();

const { $getStoreData } = useNuxtApp();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const documentId = route.query["documentId"] as string;

  if (documentId === undefined) {
    alert("NFCタグに不具合が起きています");
  }

  giftStore.setDocumentId(documentId);

  const hasDocument = await confirmDocumentExists(documentId);
  if (hasDocument && hasDocument === true) {
    router.push({ hash: "#viewer", query: { documentId: documentId } });
  }
  isLoading.value = false;
});

async function confirmDocumentExists(
  documentId: string
): Promise<boolean | void> {
  try {
    const data = await $getStoreData(documentId);
    if (data !== null) {
      giftStore.setVideo(null, data.videoUrl);
      giftStore.setMessages(
        data.title,
        data.fromName,
        data.toName,
        data.message
      );
      return true;
    } else return false;
  } catch (error) {}
}

const goToNextStep = () => {
  router.push("#video-instructions");
};
</script>
