import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVideoStore = defineStore("video", () => {
  const isOpenVideoPlayer = ref(false);

  const currentVideoPlaying = ref("");

  return {
    currentVideoPlaying,
    isOpenVideoPlayer,
  };
});
