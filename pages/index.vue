<template>
  <div>
    <h1>Video and Data Upload</h1>
    <input type="file" @change="handleFileChange" />
    <input
      type="text"
      v-model="giftPurpose"
      placeholder="What is the gift for?"
    />
    <input type="text" v-model="fromName" placeholder="Who is the gift from?" />
    <input type="text" v-model="toName" placeholder=" Who is the gift for?" />
    <textarea v-model="message" placeholder="Message to recipient"></textarea>
    <button @click="upload">Upload Data</button>
    <button @click="getData">Get Data</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { documentId } from "firebase/firestore";

const { $uploadData, $getStoreData } = useNuxtApp();

const file = ref(null);
const giftPurpose = ref("");
const fromName = ref("");
const toName = ref("");
const message = ref("");

function handleFileChange(event) {
  file.value = event.target.files[0];
}

async function upload() {
  if (
    file.value &&
    giftPurpose.value &&
    fromName.value &&
    toName.value &&
    message.value
  ) {
    const documentId = "your-document-id"; // これは適切なロジックで取得するか、ユーザーが提供するID
    await $uploadData(
      file.value,
      giftPurpose.value,
      fromName.value,
      toName.value,
      message.value,
      documentId
    );
  } else {
    alert("Please fill all fields and select a file");
  }
}

async function getData() {
  const data = await $getStoreData('your-document-id')
}
</script>
