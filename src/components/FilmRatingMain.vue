<script setup>
import RatingStars from "@/components/RatingStars.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";

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
      <RatingStars filmRating="8.6" :handleStarClick />
      <FilmRatingStats />
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
