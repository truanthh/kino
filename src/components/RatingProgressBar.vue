<script setup>
import { ref } from "vue";
import StarIcon from "@/components/StarIcon.vue";

const props = defineProps({
  progressCount: {
    type: String,
    default: "0",
  },
  remainderCount: {
    type: String,
    default: "0",
  },
  maxWidth: {
    type: String,
    default: "400px",
  },
});

let progressPercent = 0;
let totalCount = 0;

function setRating() {
  progressPercent = (
    (Number(props.remainderCount) / Number(props.progressCount)) *
    1000
  ).toFixed(2);

  totalCount = Number(props.remainderCount) + Number(props.progressCount);
}

setRating();
</script>

<template>
  <div class="bar-container" :style="[{ 'max-width': maxWidth }]">
    <div class="bar">
      <div
        class="bar-progress"
        :style="[
          {
            width: `${progressPercent > 0 ? progressPercent : 0}%`,
            'max-width': maxWidth,
          },
        ]"
      >
        <div class="bar-progress-text">{{ progressCount }}</div>
      </div>
      <div
        class="bar-remainder"
        :style="[
          {
            width: `${progressPercent > 0 ? 100 - progressPercent : 0}%`,
            'max-width': maxWidth,
          },
        ]"
      >
        <div class="bar-remainder-text">{{ remainderCount }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gen-countText {
  height: 100%;
  display: flex;
  font-weight: bold;
  font-size: 12px;
  align-items: center;
  font-family: sans-serif;
}

.gen-bar {
  border-radius: 2px;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar {
  &-container {
    // margin-top: 10px;
    // overflow: hidden;
  }
  height: 16px;
  border-radius: 2px;
  display: flex;
  &-remainder {
    @extend .gen-bar;
    background-color: #ffd1b2;
    &-text {
      @extend .gen-countText;
      color: #fe000b;
    }
  }
  &-progress {
    @extend .gen-bar;
    background-color: #99d6ad;
    transition: 0.3s;
    position: relative;
    &-text {
      @extend .gen-countText;
      color: #149933;
    }
    &::after {
      content: "";
      position: absolute;
      z-index: 1000;
      right: -1px;
      top: -3px;
      width: 2px;
      height: 22px;
      display: inline-block;
      background-color: #009933;
    }
  }
  // &-percentText {
  //   color: #3bb33b;
  //   display: block;
  //   text-align: left;
  //
  //   font-weight: bold;
  //   font-size: 22px;
  //   margin-top: 10px;
  // }
}
</style>
