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
  const { documentId, videoBlob, title, fromName, toName, message } = giftStore;

  if (
    documentId != "" &&
    videoBlob &&
    title != "" &&
    fromName != "" &&
    toName != "" &&
    message != ""
  ) {
    try {
      await $uploadData(
        documentId,
        videoBlob,
        title,
        fromName,
        toName,
        message
      );
      router.push("#completion");
    } catch (error) {
      console.log("Failed to upload data: ", error);
      uploadError.value = true;
    } finally {
      isUploading.value = false;
    }
  } else {
    throw new Error(
      "All fields must be filled out and a valid video must be selected."
    );
  }
}
</script>
