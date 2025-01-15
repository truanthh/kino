<script setup>
import { ref, computed } from "vue";

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
  starFilledColor: {
    type: String,
    default: "#ff5500",
  },
  starEmptyColor: {
    type: String,
    default: "#cccccc",
  },
});

// const perc = computed(() => {
//   return props.percentage
// });
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
        <stop offset="100%" class="star_filled" />
        <stop offset="100%" class="star_empty" />
      </linearGradient>
    </defs>
    <path
      d="m16 23.817-8.652 4.85 1.932-9.74L2 12.188l9.847-1.17L16 2l4.154 9.017L30 12.187l-7.28 6.74 1.932 9.74L16 23.817Z"
      :fill="`url(#perc-fill-${starId})`"
    />
  </svg>
</template>

<style scoped>
.star_filled {
  stop-color: v-bind("starFilledColor");
  stop-opacity: 1;
}
.star_empty {
  stop-color: v-bind("starEmptyColor");
  stop-opacity: 1;
}
</style>
