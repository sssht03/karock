<template>
  <div id="upload">
    <h1>Upload</h1>
    <p v-if="isUploading">Uploading...</p>
    <button v-if="!isUploading && uploadError" @click="startUpload">
      Retry Upload
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { $uploadData } = useNuxtApp();

const isUploading = ref(false);
const uploadError = ref(false);
const giftStore = useGiftStore();

onMounted(() => {
  startUpload();
});

async function startUpload() {
  isUploading.value = true;

  const documentId = useRoute().query["documentId"] as string;
  const { videoBlob, title, fromName, toName, message } = giftStore;
  
  if (videoBlob === null) {
    throw Error('ビデオがうまく撮れてません');
  }

  try {
    await $uploadData(documentId, videoBlob, title, fromName, toName, message);
    router.push({ hash: "#completion", query: { documentId: documentId } });
  } catch (error) {
    uploadError.value = true;
  } finally {
    isUploading.value = false;
  }
}
</script>
