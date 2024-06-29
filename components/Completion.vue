<template>
  <div id="completion" class="container">
    <div class="successIcon">
      <div class="successCircle">
        <svg
          class="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <!-- <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" /> -->
          <path
            class="checkmark-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
    </div>
    <p class="successText">保存完了！</p>
    <p>もう一度かざすと動画が再生できるよ</p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToNext = () => {
  const documentId = useRoute().query["documentId"] as string;
  router.push({ hash: "/", query: { documentId: documentId } });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.successIcon {
  display: flex;
  align-items: center;
}

.successCircle {
  width: 50px;
  height: 50px;
  background-color: #1a1a1a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}

.checkmark {
  width: 80%;
  height: 80%;
}

/* .checkmark-circle {
  stroke: #fff;
  stroke-width: 3;
  animation: stroke 0.4s ease-in-out forwards;
} */

.checkmark-check {
  stroke: #fff;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.4s 0.4s ease-in-out forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

.successText {
  font-size: 1.4rem;
  margin-top: 16px;
  margin-bottom: 4px;
  color: #1a1a1a;
}
</style>
