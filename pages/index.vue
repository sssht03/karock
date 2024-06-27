<template>
  <div>
    <component :is="currentComponent" class="container"/>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Landing from "~/components/Landing.vue";
import VideoInstructions from "~/components/VideoInstructions.vue";
import VideoRecording from "~/components/VideoRecording.vue";
import MessageEntry from "~/components/MessageEntry.vue";
import Preview from "~/components/Preview.vue";
import Upload from "~/components/Upload.vue";
import Completion from "~/components/Completion.vue";
import Viewer from "~/components/Viewer.vue";

const route = useRoute();
const hash = ref("");

const componentsMap = {
  "": Landing,
  "#video-instructions": VideoInstructions,
  "#video-recording": VideoRecording,
  "#message-entry": MessageEntry,
  "#preview": Preview,
  "#upload": Upload,
  "#completion": Completion,
  "#viewer": Viewer
};

const currentComponent = computed(() => {
  return componentsMap[hash.value] || Landing;
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
