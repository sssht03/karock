<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppDescription from "~/components/AppDescription.vue";
import VideoInstructions from "~/components/VideoInstructions.vue";
import VideoRecording from "~/components/VideoRecording.vue";
import MessageEntry from "~/components/MessageEntry.vue";
import Preview from "~/components/Preview.vue";
import Upload from "~/components/Upload.vue";
import Completion from "~/components/Completion.vue";

const route = useRoute();
const hash = ref("");

const componentsMap = {
  "": AppDescription,
  "#video-instructions": VideoInstructions,
  "#video-recording": VideoRecording,
  "#message-entry": MessageEntry,
  "#preview": Preview,
  "#upload": Upload,
  "#completion": Completion,
};

const currentComponent = computed(() => {
  return componentsMap[hash.value] || AppDescription;
});

onMounted(() => {
  hash.value = window.location.hash;
  watch(
    () => route.hash,
    (newHash) => {
      hash.value = newHash;
    }
  );
});
</script>
