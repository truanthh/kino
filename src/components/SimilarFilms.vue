<script setup>
import Carousel from "@/components/Carousel.vue";
import FilmPosterLink from "@/components/FilmPosterLink.vue";

const props = defineProps({
  similarFilms: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="similarFilms__container">
    <div class="similarFilms__header">
      <h2>Если вам понравился этот фильм</h2>
    </div>
    <div class="similarFilms__carousel">
      <Carousel :gap="1" :visibleSlides="5" :slides="similarFilms">
        <FilmPosterLink />
      </Carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.similarFilms {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__header {
    color: black;
  }
  &__carousel {
    width: 790px;
    height: 290px;
  }
}
</style>
