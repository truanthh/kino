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
const rating = ref(Number(props.film.rating_users));
const count = ref(Number(props.film.rating_users_count));

const oldRating = rating.value;
const oldCount = count.value;
let hasVoted = false;

function handleStarClick(i) {
  const newRating = i + 1;

  showRecalcRating(newRating);
  // emit("updateRating", { rating: i + 1, id: props.film.id });
}

function showRecalcRating(newRating) {
  rating.value = Math.round(oldRating * oldCount + newRating) / (oldCount + 1);

  if (!hasVoted) {
    count.value += 1;
    hasVoted = true;
  }
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
