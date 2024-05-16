<template>
  <div id="message-entry">
    <h1>Message Entry</h1>
    <video :src="giftStore.videoUrl" autoplay playsinline></video>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title" class="sr-only">Title:</label>
        <input id="title" v-model="title" type="text" />
      </div>
      <div>
        <label for="fromName" class="sr-only">From Name:</label>
        <input id="fromName" v-model="fromName" type="text" />
      </div>
      <div>
        <label for="toName" class="sr-only">To Name:</label>
        <input id="toName" v-model="toName" type="text" />
      </div>
      <div>
        <label for="message" class="sr-only">Message:</label>
        <textarea id="message" v-model="message"></textarea>
      </div>
      <button type="submit">プレビューへ</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const giftStore = useGiftStore();

const title = ref("");
const fromName = ref("");
const toName = ref("");
const message = ref("");

function submitForm() {
  if (
    title.value != "" &&
    fromName.value != "" &&
    toName.value != "" &&
    message.value != ""
  ) {
    giftStore.setMessages(
      title.value,
      fromName.value,
      toName.value,
      message.value
    );

    const documentId = useRoute().query["documentId"] as string;
    router.push({ hash: "#preview", query: { documentId: documentId } });
  } else {
    alert("全部の項目埋めてね！");
    throw Error("たりないよ");
  }
}
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
