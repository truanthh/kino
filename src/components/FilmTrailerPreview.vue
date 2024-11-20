<script setup>
import { computed } from "vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import { useVideoStore } from "@/stores/video";

const videoStore = useVideoStore();

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

// this is retarded but it drives me nuts
const thumbnail = computed(() => {
  return "http://localhost:5173/src" + props.item.thumbnailUrl.slice(1);
});

function openVideo() {
  videoStore.currentVideoPlaying = props.item.videoUrl;
  videoStore.isOpenVideoPlayer = true;
}
</script>

<template>
  <div class="videoPreview" @click="openVideo">
    <ImageSkeleton class="videoPreview_skeleton" v-if="!item.thumbnailUrl" />

    <img class="videoPreview_thumbnail" :src="thumbnail" v-else />

    <div class="videoPreview_playButton"></div>

    <IconifyIcon class="videoPreview_playIcon" icon="ion:play-sharp" />

    <div class="videoPreview_desc">{{ item.desc }}</div>
    <div class="videoPreview_date">{{ item.date }}</div>
  </div>
</template>

<style lang="scss" scoped>
.videoPreview {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  &_skeleton {
    width: 100%;
    height: 100%;
  }
  &_thumbnail {
    width: 100%;
    height: 100%;
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
