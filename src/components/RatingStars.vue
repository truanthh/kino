<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import StarIcon from "@/components/StarIcon.vue";

const props = defineProps({
  filmRating: {
    type: String,
    default: "0",
  },
});

let starsCount = 10;

let stars = ref(Array(starsCount).fill("0%"));

function setStars() {
  let rating = Number(props.filmRating);

  for (let i = 0; i < starsCount; i++) {
    if (rating - 1 >= 0) {
      stars.value[i] = "100%";
      rating--;
    } else {
      stars.value[i] = `${Math.trunc(rating * 100)}%`;
      break;
    }
  }
}

setStars();
</script>

<template>
  <div class="ratingBar">
    <div class="ratingBar_slot" v-for="(star, i) of stars" :key="i">
      <StarIcon
        class="ratingBar_slot_icon"
        :percentage="stars[i]"
        :starId="i"
      />
      <div class="ratingBar_slot_numberText">{{ i + 1 }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ratingBar {
  display: flex;
  gap: 5px;
  &_slot {
    display: flex;
    flex-direction: column;
    &_icon {
      font-size: 35px;
      color: #cccccc;
    }
    &_numberText {
      font-size: 14px;
      color: #a6a6a6;
      margin: auto;
    }
  }
}
</style>
