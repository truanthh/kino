<script setup>
import RatingStars from "@/components/RatingStars.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

function handleStarClick(i) {
  console.log(i + 1 + "hey from filmratingmain!");
}
</script>

<template>
  <div class="filmRatingMain__container">
    <div class="filmRatingMain__header">
      <h2>Рейтинг фильма</h2>
    </div>
    <div class="filmRatingMain__body">
      <RatingStars :rating :handleStarClick />
      <FilmRatingStats :rating :count />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filmRatingMain {
  &__header {
    color: black;
  }
  &__body {
    display: flex;
    gap: 30px;
  }
}
</style>
