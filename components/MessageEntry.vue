<template>
  <div id="message-entry" class="container">
    <div class="inputContainer">
      <div>
        <label for="fromName" class="label">From</label>
        <input id="fromName" v-model="fromName" type="text" class="" />
      </div>
      <div>
        <label for="toName" class="label">To</label>
        <input id="toName" v-model="toName" type="text" />
      </div>
      <div>
        <p>date</p>
      </div>
    </div>
    <div class="buttonContainer">
      <button @click=goToNext class="nextButton">プレビューへ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const giftStore = useGiftStore();

const fromName = ref("");
const toName = ref("");
const date = ref("");
const message = ref("");

function goToNext() {
  if (
    fromName.value != "" &&
    toName.value != "" &&
    date.value != "" &&
    message.value != ""
  ) {
    giftStore.setMessages(
      fromName.value,
      toName.value,
      date.value,
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputContainer {
  display: flex;
  flex-direction: column;
}

.buttonContainer {
  position: fixed;
  bottom: 24px;
}

.nextButton {
  height: 56px;
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  background-color: #1a1a1a;
}
</style>
