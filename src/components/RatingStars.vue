<script setup>
import { ref } from "vue";
import StarIcon from "@/components/StarIcon.vue";

const props = defineProps({
  filmRating: {
    type: String,
    default: "0",
  },
  handleStarClick: {
    type: Function,
    default: () => {},
  },
});

const COLOR_FILLED_STAR = "#ff5500";
const COLOR_FILLED_STAR_TEXT = "#999999";
const COLOR_EMPTY_STAR = "#cccccc";
const COLOR_EMPTY_STAR_TEXT = "#cccccc";
const COLOR_SELECTED_STAR = "black";
const COLOR_SELECTED_STAR_TEXT = "black";

let starsCount = 10;

let stars = ref(Array(starsCount).fill("0%"));

let colors = ref(
  Array(starsCount).fill({
    star: COLOR_EMPTY_STAR,
    text: COLOR_EMPTY_STAR_TEXT,
  }),
);

function setRating() {
  let rating = Number(props.filmRating);

  for (let i = 0; i < starsCount; i++) {
    if (rating - 1 >= 0) {
      stars.value[i] = "100%";
      colors.value[i] = {
        star: COLOR_FILLED_STAR,
        text: COLOR_FILLED_STAR_TEXT,
      };
      rating--;
    } else {
      stars.value[i] = `${Math.round(rating * 100)}%`;
      colors.value[i] = {
        star: COLOR_FILLED_STAR,
        text: COLOR_FILLED_STAR_TEXT,
      };
      break;
    }
  }
}

setRating();

let tempColors = [];
let tempPerc = [];

function handleMouseEnter(i) {
  tempColors = colors.value;
  colors.value = colors.value.map((el, idx) =>
    idx <= i
      ? { star: COLOR_SELECTED_STAR, text: COLOR_SELECTED_STAR_TEXT }
      : { star: COLOR_EMPTY_STAR, text: COLOR_EMPTY_STAR_TEXT },
  );
  tempPerc = stars.value;
  stars.value = stars.value.map((el, idx) => (idx <= i ? "100%" : "0%"));
}

function handleMouseLeave(i) {
  colors.value = tempColors;
  stars.value = tempPerc;
}
</script>

<template>
  <div class="ratingBar">
    <div
      class="ratingBar_slot"
      v-for="(star, i) of stars"
      :key="i"
      @mouseenter="handleMouseEnter(i)"
      @mouseleave="handleMouseLeave(i)"
      @click="handleStarClick(i)"
    >
      <div class="ratingBar_slot_iconContainer">
        <StarIcon
          class="ratingBar_slot_iconContainer_icon"
          :percentage="stars[i]"
          :starFilledColor="colors[i].star"
          :starId="i"
        />
      </div>
      <div class="ratingBar_slot_numberText" :style="'color:' + colors[i].text">
        {{ i + 1 }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ratingBar {
  display: flex;
  justify-content: center;
  align-items: center;
  &_slot {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 38px;
    justify-content: center;
    align-items: center;
    &_iconContainer {
      &_icon {
        font-size: 35px;
        color: #cccccc;
      }
    }
    &_numberText {
      font-size: 14px;
      color: #a6a6a6;
      margin: auto;
    }
  }
}
</style>
