<script setup>
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

// console.log(item);
</script>

<template>
  <div class="filmPosterLink__container">
    <div class="filmPosterLink__poster">
      <img
        :src="item.poster_url"
        class="filmPosterLink__poster__img"
        v-if="item.poster_url"
      />
      <!-- <ImageSkeleton v-else /> -->
      <div class="filmPosterLink__poster__rating">1.2</div>
    </div>
    <div class="filmPosterLink__title">{{ item.title }}</div>
    <div class="filmPosterLink__misc">
      {{ item.prod_year }}, {{ item.director_name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filmPosterLink {
  &__container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  &__poster {
    height: 78%;
    position: relative;
    // overflow: hidden;
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // opacity: 0.1;
    }
    &__rating {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Tahoma;
      font-weight: bold;
      font-size: 13px;
      color: white;
      z-index: 100;
      top: 6px;
      left: 6px;
      position: absolute;
      width: 32px;
      height: 20px;
      background-color: #3bb33b;
    }
  }
  &__title {
    // display: flex;
    // align-items: start;
    height: 13%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 600;
    font-size: 15px;
    line-height: 15px;
    font-family: Tahoma;
  }
  &__misc {
    height: 9%;
    display: block;
    overflow: hidden;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
