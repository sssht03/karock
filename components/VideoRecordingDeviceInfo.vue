<template>
  <div class="device-selector">
    <h2>Select Input Devices</h2>
    <div>
      <label for="videoInput">Camera:</label>
      <select
        id="videoInput"
        v-model="selectedVideoDeviceId"
        @change="updateDevices"
      >
        <option
          v-for="device in videoDevices"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label }}
        </option>
      </select>
    </div>
    <div>
      <label for="audioInput">Microphone:</label>
      <select
        id="audioInput"
        v-model="selectedAudioDeviceId"
        @change="updateDevices"
      >
        <option
          v-for="device in audioDevices"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoDevices = ref<MediaDeviceInfo[]>([]);
const audioDevices = ref<MediaDeviceInfo[]>([]);

const selectedVideoDeviceId = ref("");
const selectedAudioDeviceId = ref("");

watch([selectedVideoDeviceId, selectedAudioDeviceId], () => {
  updateDevices();
});

function updateDevices() {
  const constraints = {
    video: {
      deviceId: selectedVideoDeviceId.value
        ? { exact: selectedVideoDeviceId.value }
        : undefined,
    },
    audio: {
      deviceId: selectedAudioDeviceId.value
        ? { exact: selectedAudioDeviceId.value }
        : undefined,
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    })
    .catch((error) => {
      console.error("Error accessing media devices:", error);
    });
}

onMounted(async () => {
  onMounted(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      videoDevices.value = devices.filter(
        (device) => device.kind === "videoinput"
      );
      audioDevices.value = devices.filter(
        (device) => device.kind === "audioinput"
      );
    });
  });
});
</script>
