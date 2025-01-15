<script setup>
import { ref, watch, computed } from "vue";
import StarIcon from "@/components/StarIcon.vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
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

const starsCount = 10;
const starsDisplay = ref(
  new Array(starsCount).fill({
    fill: "0%",
    colors: { star: COLOR_EMPTY_STAR, text: COLOR_EMPTY_STAR_TEXT },
  }),
);

// WHY WATCH DOESNT WORK HERE???
// watch(
//   () => props.rating,
//   () => {
//     setRating();
//   },
// );

function setRating() {
  const stars = new Array(starsCount);

  for (let i = 0; i < stars.length; i++) {
    stars.push({
      fill: "0%",
      colors: { star: COLOR_EMPTY_STAR, text: COLOR_EMPTY_STAR_TEXT },
    });
  }

  let rating = props.rating;
  let ratingInt = Math.floor(rating);

  while (rating >= 1) {
    rating--;
  }

  for (let i = 0; i < ratingInt; i++) {
    // console.log([...stars]);
    stars[i].fill = "100%";
    stars[i].colors.star = COLOR_FILLED_STAR;
    stars[i].colors.text = COLOR_FILLED_STAR_TEXT;
  }

  if (rating > 0 && ratingInt < starsCount) {
    stars[ratingInt].fill = `${Math.round(rating * 100)}%`;
    stars[ratingInt].colors.star = COLOR_FILLED_STAR;
    stars[ratingInt].colors.text = COLOR_FILLED_STAR_TEXT;
  }

  return stars;
}

function handleMouseEnter(i) {
  // colors.value = colors.value.map((el, idx) =>
  //   idx <= i
  //     ? { star: COLOR_SELECTED_STAR, text: COLOR_SELECTED_STAR_TEXT }
  //     : { star: COLOR_EMPTY_STAR, text: COLOR_EMPTY_STAR_TEXT },
  // );
  // stars.value = stars.value.map((el, idx) => (idx <= i ? "100%" : "0%"));
}

function handleMouseLeave(i) {}

function handleStarClickWrapper(i) {}

console.log(setRating());
</script>

<template>
  <Button class="btn__debug" @click="setRating"> DEBUG </Button>
  <div class="ratingBar">
    <div
      class="ratingBar_slot"
      v-for="(star, i) of stars"
      :key="i"
      @mouseenter="handleMouseEnter(i)"
      @mouseleave="handleMouseLeave(i)"
      @click="handleStarClickWrapper(i)"
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
