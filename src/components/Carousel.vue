<script setup>
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const props = defineProps({
  header: {
    type: String,
    default: "Если вам понравился этот фильм",
  },
});
</script>

<template>
  <div class="carousel__container">
    <div class="carousel__header">
      <h2>{{ header }}</h2>
    </div>
    <div class="carousel__suggestions">
      <span class="carousel__buttonLeft"></span>
      <ImageSkeleton
        class="carousel__filmPoster"
        v-for="i of [1, 2, 3, 4, 5, 6, 7, 8]"
        :key="i"
      />
      <span class="carousel__buttonRight"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__header {
    color: black;
  }
  &__suggestions {
    display: flex;
    height: 290px;
    // background-color: orange;
    position: relative;
  }
  &__filmPoster {
    width: 200px;
  }
  &__buttonRight {
    z-index: 20;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 22px);
    right: -22px;
    background-color: orange;
    border-radius: 50%;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8px' height='14px' viewBox='0 0 8 14' fill='%23666'%3E%3Cpath d='M1.3 0 8 7l-6.7 7L0 12.7 5.5 7 0 1.3z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 50%;
    box-shadow:
      0 4px 6px 0 rgba(0, 0, 0, 0.05),
      0 1px 0 1px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      transform: translateX(5px);
    }
  }
  &__buttonLeft {
    z-index: 20;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 22px);
    left: -22px;
    background-color: orange;
    border-radius: 50%;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8px' height='14px' viewBox='0 0 8 14' fill='%23666'%3E%3Cpath d='M1.3 0 8 7l-6.7 7L0 12.7 5.5 7 0 1.3z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 50%;
    box-shadow:
      0 4px 6px 0 rgba(0, 0, 0, 0.05),
      0 1px 0 1px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    transition: 0.2s;
    cursor: pointer;
    transform: scaleX(-1);
    &:hover {
      transform: scaleX(-1) translateX(5px);
    }
  }
}
</style>
