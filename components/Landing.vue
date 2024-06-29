<template>
  <transition name="fade">
    <div v-if="showTitle" id="app-description" class="container">
      <p class="title">yomi yomi</p>
      <div v-if="isError" class="errorText">
        <p>ごめんなさい！</p>
        <p>NFC タグに不具合があります🙇</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const giftStore = useGiftStore();
const router = useRouter();
const route = useRoute();
const { $getStoreData } = useNuxtApp();

const showTitle = ref(true);
const isLoading = ref(true);
const isError = ref(false);
const documentId = ref();

onMounted(async () => {
  isLoading.value = true;
  documentId.value = route.query["documentId"] as string;

  if (documentId.value === undefined) {
    alert("NFCタグに不具合が起きています");
    isError.value = true;
    return;
  }

  const hasDocument = await checkDocumentExists(documentId.value);
  await delay(2000);
  if (hasDocument && hasDocument === true) {
    showTitle.value = false;
    router.push({ hash: "#viewer", query: { documentId: documentId.value } });
  } else {
    isLoading.value = false;
    showTitle.value = false;
    navigateToNextStep();
  }
});

async function checkDocumentExists(
  documentId: string
): Promise<boolean | void> {
  try {
    const data = await $getStoreData(documentId);
    if (data !== null) {
      giftStore.setVideo(null, data.videoUrl);
      giftStore.setMessages(
        data.fromName,
        data.toName,
        data.date,
        data.message
      );
      return true;
    } else return false;
  } catch (error) {}
}

const navigateToNextStep = () => {
  router.push({
    hash: "#video-instructions",
    query: { documentId: documentId.value },
  });
};
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.errorText {
  margin-top: 8px;
  color: #fff;
  font-size: 1.2rem;
}

.title {
  font-size: 56px;
  font-family: "Montserrat";
  font-weight: 900;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
