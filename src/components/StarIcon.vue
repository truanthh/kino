<script setup>
import { ref } from "vue";

const props = defineProps({
  percentage: {
    type: String,
    default: "0%",
  },
  // starId is needed for svg fill inside v-for
  starId: {
    type: Number,
    required: true,
  },
  starColor: {
    type: String,
    default: "#ff5500",
  },
});
</script>

<template>
  <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient
        :id="`perc-fill-${starId}`"
        x1="0%"
        y1="0%"
        :x2="percentage"
        y2="0%"
      >
        <stop offset="100%" class="default_color1" />
        <stop offset="100%" class="default_color2" />
      </linearGradient>
    </defs>
    <path
      d="m16 23.817-8.652 4.85 1.932-9.74L2 12.188l9.847-1.17L16 2l4.154 9.017L30 12.187l-7.28 6.74 1.932 9.74L16 23.817Z"
      :fill="`url(#perc-fill-${starId})`"
    />
  </svg>
</template>

<style scoped>
.default_color1 {
  stop-color: v-bind("starColor");
  stop-opacity: 1;
}
.default_color2 {
  stop-color: #cccccc;
  stop-opacity: 1;
}
</style>
