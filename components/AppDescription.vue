<template>
  <div id="app-desctiption">
    <template v-if="isLoading"></template>
    <template v-else>
      <h1>アプリの説明</h1>
      <p>このアプリは〜〜〜〜です</p>
      <button @click="goToNextStep()">次へ</button>
    </template>
  </div>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();
const route = useRoute();
const { $getStoreData } = useNuxtApp();
const isLoading = ref(false);
const documentId = ref();

onMounted(async () => {
  isLoading.value = true;
  documentId.value = route.query["documentId"] as string;

  if (documentId.value === undefined) {
    // alert("NFCタグに不具合が起きています");
    // showError({ statusCode: 404 });
    documentId.value = 'test1234-aaaa-bbbb-cccc-test5678test'
  }

  const hasDocument = await checkDocumentExists(documentId.value);
  if (hasDocument && hasDocument === true) {
    router.push({ hash: "#viewer", query: { documentId: documentId.value } });
  }
  isLoading.value = false;
});

async function checkDocumentExists(
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
  router.push({
    hash: "#video-instructions",
    query: { documentId: documentId.value },
  });
};
</script>
