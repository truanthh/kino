<script setup>
import { computed } from "vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import { Icon as IconifyIcon } from "@iconify/vue";
// import VideoPlayer from "@/components/VideoPlayer.vue";

const props = defineProps({
  openVideoPlayer: {
    type: Function,
    default: () => {},
  },
  // videoSrc: {
  //   type: String,
  //   default: "",
  // },
  thumbnailSrc: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "description",
  },
  date: {
    type: String,
    default: "",
  },
});

// this is retarded but it drives me nuts
const thumbnail = computed(() => {
  return "http://localhost:5173/src" + props.thumbnailSrc.slice(1);
});

function debug() {
  // console.log(new URL(props.thumbnailSrc, import.meta.url).href);
  console.log(thumbnail.value);
}
</script>

<template>
  <div class="videoPreview" @click="openVideoPlayer">
    <ImageSkeleton class="videoPreview_skeleton" v-if="!thumbnailSrc" />

    <img class="videoPreview_thumbnail" :src="thumbnail" v-else />

    <div class="videoPreview_playButton"></div>

    <IconifyIcon class="videoPreview_playIcon" icon="ion:play-sharp" />

    <div class="videoPreview_desc">{{ desc }}</div>
    <div class="videoPreview_date">{{ date }}</div>
  </div>
</template>

<style lang="scss" scoped>
.videoPreview {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 170px;
  &_skeleton {
    width: 100%;
    height: 170px;
  }
  &_thumbnail {
    width: 100%;
    height: 170px;
    object-fit: cover;
  }
  &_playButton {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #ff6600;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }
  &_playIcon {
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    position: absolute;
    color: white;
    font-size: 22px;
    opacity: 0;
  }
  &:hover {
    & .videoPreview_playButton {
      opacity: 1;
    }
    & .videoPreview_playIcon {
      opacity: 1;
    }
  }
  &_desc {
    font-size: 16px;
    color: black;
  }
  &_date {
    font-size: 12px;
    color: gray;
  }
}
</style>
