<template>
  <div id="message-entry" class="container">
    <div class="description">
      <p>名前を記入して</p>
      <p>メッセージを選択しよう！</p>
    </div>
    <div class="inputContainer">
      <p class="inputDescription">誰から誰に送る?</p>
      <div class="formGroup">
        <label for="fromName" class="formLabel">From</label>
        <input id="fromName" v-model="fromName" type="text" class="formInput" />
      </div>
      <div class="formGroup">
        <label for="toName" class="formLabel">To</label>
        <input id="toName" v-model="toName" type="text" class="formInput" />
      </div>
    </div>
    <div class="messageContainer">
      <p class="messageDescription">どんなメッセージ？</p>
      <div v-for="msg in messages" :key="msg" class="messageOption">
        <input
          type="radio"
          :id="msg"
          :value="msg"
          v-model="message"
          class="custom-checkbox"
        />
        <label :for="msg" class="messageLabel">{{ msg }}</label>
      </div>
    </div>
    <div class="buttonContainer">
      <button @click="navigateToNextStep" class="nextButton">プレビューへ</button>
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

const messages = ref([
  "Happy BirthDay",
  "Thank you",
  "I LOVE you",
  "Congratulations",
]);

function navigateToNextStep() {
  date.value = getFormattedDate()
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

.inputDescription,
.messageDescription {
  font-size: 16px;
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
  font-size: 16px;
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
  outline: none;
}

.messageContainer {
  margin: 36px 0 0 24px;
}

.messageOption {
  display: flex;
  align-items: center;
  margin: 8px 0px;
}

.custom-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  appearance: none;
}

.custom-checkbox:checked {
  background-color: #1a1a1a;
}

.custom-checkbox:checked::after {
  content: '';
  background-color: white;
}

.messageLabel {
  font-size: 20px;
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
