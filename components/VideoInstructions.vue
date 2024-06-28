<template>
  <div id="video-instructions" class="container">
    <div class="content">
      <div class="navigationText">
        <p>10秒の</p>
        <p>動画を撮るよ！</p>
      </div>
      <div class="buttonContainer">
        <p class="guideText">\ 用意はOK? /</p>
        <button @click="navigateToNextStep" class="nextButton">撮影する</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const navigateToNextStep = () => {
  const documentId = route.query["documentId"] as string;
  router.push({ hash: "#video-recording", query: { documentId: documentId } });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.navigationText {
  font-size: 32px;
  margin-bottom: 24px;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 24px;
}

.guideText {
  font-size: 18px;
  margin-bottom: 8px;
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
  background-color: #1A1A1A;
}
</style>
