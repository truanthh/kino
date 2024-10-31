<script setup>
import { ref } from "vue";
import StarIcon from "@/components/StarIcon.vue";
import RatingStars from "@/components/RatingStars.vue";
</script>

<template>
  <div class="filmRatingMain-container">
    <div class="filmRatingMain-header">
      <h2>Рейтинг фильма</h2>
    </div>
    <div class="filmRatingMain">
      <RatingStars filmRating="8.6" :handleStarClick />
      <div class="filmRatingMain-stats">8.6</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filmRatingMain {
  display: flex;
  &-header {
    color: black;
  }
  &-container {
    background-color: gray;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 20px;
    border-bottom: solid 1px rgba(222, 222, 222, 0.4);
  }
  &-stats {
    background-color: orange;
  }
}
</style>
