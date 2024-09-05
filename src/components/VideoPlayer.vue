<script setup>
// vidstack
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/audio.css";
import "vidstack/player/styles/default/layouts/video.css";
import "vidstack/player";
import "vidstack/player/layouts";
import "vidstack/player/ui";
import { MediaPlayerElement } from "vidstack/elements";

//other
import { onMounted, ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

const emit = defineEmits(["closePlayer"]);

const videoUrl = ref(new URL("@/assets/video.mp4", import.meta.url).href);

const player = ref();

const props = defineProps({
  openVideoPlayer: {
    type: Boolean,
    default: false,
  },
});

function handleClick() {
  player.value.paused = true;
  emit("closePlayer");
}
</script>

<template>
  <div
    :class="['modal-overlay', { 'modal-overlay_isopen': openVideoPlayer }]"
    @click.self="handleClick"
  >
    <IconifyIcon
      class="btn_close"
      icon="material-symbols:close"
      @click="handleClick"
    />
    <media-player
      class="player"
      title="ken carson"
      :src="videoUrl"
      crossOrigin
      playsInline
      ref="player"
    >
      <media-provider>
        <media-poster class="vds-poster" />
      </media-provider>
      <media-audio-layout />
      <media-video-layout />
    </media-player>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  &_isopen {
    display: flex;
  }
}

.btn_close {
  position: absolute;
  top: 30px;
  right: 30px;
  color: gray;
  cursor: pointer;
  font-size: 34px;
  &:hover {
    color: white;
  }
}

.player {
  --brand-color: orange;
  --focus-color: #4e9cf6;

  --audio-brand: var(--brand-color);
  --audio-focus-ring-color: var(--focus-color);
  --audio-border-radius: 2px;

  --video-brand: var(--brand-color);
  --video-focus-ring-color: var(--focus-color);
  --video-border-radius: 2px;

  width: 800px;
  height: 450px;

  /* width: 60%; */
  /* height: auto; */
}

.player[data-view-type="audio"] media-poster {
  display: none;
}

.player[data-view-type="video"] {
  aspect-ratio: 16 /9;
}

.play-button[data-paused] {
  color: orange;
}

.src-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  margin-inline: auto;
  max-width: 300px;
}
</style>
