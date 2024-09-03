<script setup>
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/audio.css";
import "vidstack/player/styles/default/layouts/video.css";
import "vidstack/player";
import "vidstack/player/layouts";
import "vidstack/player/ui";
import path from "path";

import { MediaPlayerElement } from "vidstack/elements";
import { onMounted, ref } from "vue";

const videoUrl = ref(new URL("@/assets/video.mp4", import.meta.url).href);
</script>

<template>
  <div class="wrapper">
    <media-player
      class="player"
      title="Sprite Fight"
      :src="videoUrl"
      crossOrigin
      playsInline
    >
      <media-provider>
        <media-poster
          class="vds-poster"
          src="https://files.vidstack.io/sprite-fight/poster.webp"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
      </media-provider>
      <media-audio-layout />
      <media-video-layout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
      />
    </media-player>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  height: calc(100vh - 72px);
  justify-content: center;
  align-items: center;
  /* background-color: orange; */
}

.player {
  --brand-color: #f5f5f5;
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

.src-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  margin-inline: auto;
  max-width: 300px;
}
</style>
