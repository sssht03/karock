<template>
  <div id="message-entry" class="container">
    <div class="description">
      <p>名前を記入して</p>
      <p>メッセージを選択しよう！</p>
    </div>
    <div class="inputContainer">
      <div class="formGroup">
        <label for="fromName" class="formLabel">From</label>
        <input id="fromName" v-model="fromName" type="text" class="formInput" />
      </div>
      <div class="formGroup">
        <label for="toName" class="formLabel">To</label>
        <input id="toName" v-model="toName" type="text" class="formInput"/>
      </div>
    </div>
    <div class="buttonContainer">
      <button @click="goToNext" class="nextButton">プレビューへ</button>
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
  flex-direction: column;
  justify-content: start;
}

.description {
  font-family: "Noto Sans JP";
  font-size: 24px;
  margin: 36px 0 0 24px;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 36px 0 0 24px;
  font-size: 20px;
}

.formGroup {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.formLabel {
  width: 56px;
  margin-right: 8px;
}

.formInput {
  border: 1px solid #1a1a1a;
  border-radius: 6px;
  height: 48px;
  width: 144px;
  padding: 8px;
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
}

.formInput:focus {
  outline: 2px #1a1a1a;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 24px;
  width: 100%;
}

.nextButton {
  height: 56px;
  width: 300px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  background-color: #1a1a1a;
}
</style>
