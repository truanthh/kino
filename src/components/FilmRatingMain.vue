<script setup>
import RatingStars from "@/components/RatingStars.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";

const emit = defineEmits(["updateRating"]);

const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
});

// let rating = props.film.rating_users;
// let count = props.film.rating_users_count;

function handleStarClick(rating) {
  emit("updateRating", { rating: rating + 1, id: props.film.id });
}
</script>

<template>
  <div class="filmRatingMain__container">
    <div class="filmRatingMain__header">
      <h2>Рейтинг фильма</h2>
    </div>
    <div class="filmRatingMain__body">
      <RatingStars :rating="film.rating_users" :handleStarClick />
      <FilmRatingStats
        :rating="film.rating_users"
        :count="film.rating_users_count"
      />
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
