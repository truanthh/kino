<script setup>
import { ref } from "vue";
import RatingStars from "@/components/RatingStars.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";
</script>

<template>
  <div class="filmRatingMain-container">
    <div class="filmRatingMain-header">
      <h2>Рейтинг фильма</h2>
    </div>
    <div class="filmRatingMain">
      <RatingStars filmRating="8.6" :handleStarClick class="ratingStars" />
      <FilmRatingStats />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ratingStars {
  // background-color: orange;
}
.filmRatingMain {
  display: flex;
  gap: 30px;
  &-header {
    color: black;
  }
  &-container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}
</style>
