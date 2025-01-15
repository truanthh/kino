<script setup>
import RatingStars from "@/components/RatingStars.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";
import { ref } from "vue";

const emit = defineEmits(["updateRating"]);

const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
});

// making this instead of referencing props directly
// for debouncing. and to immediately reflect changes to rating
// after user set their grade
const rating = ref(props.film.rating_users);
const count = ref(props.film.rating_users_count);

function handleStarClick(i) {
  const newRating = i + 1;
  rating.value =
    Math.round(rating.value * count.value + newRating) / ++count.value;
  // emit("updateRating", { rating: i + 1, id: props.film.id });
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
