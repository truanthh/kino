<script setup>
import { ref, computed } from "vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import FilmPosterLink from "@/components/FilmPosterLink.vue";
import FilmTrailerPreview from "@/components/FilmTrailerPreview.vue";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  component: {
    type: Object,
    required: true,
  },
  slidesShown: {
    type: Number,
    default: 4,
  },
  slideStepSize: {
    type: Number,
    default: 0,
  },
  gapPercent: {
    type: String,
    default: "",
  },
  buttonsOffsetPercent: {
    type: String,
    default: "",
  },
});

let firstItemId = ref(0);

const slideWidth = computed(() => {
  // width in percentage of scrollBar
  return 100 / props.slidesShown;
});

const stepSize = computed(() => {
  return props.slideStepSize > 0 ? props.slideStepSize : props.slidesShown - 1;
});

function handleButtonRightClick() {
  let newId = firstItemId.value + stepSize.value;
  let firstItemVisibleMax = props.slides.length - props.slidesShown;

  while (newId > firstItemVisibleMax) {
    newId--;
  }

  firstItemId.value = newId;
}

function handleButtonLeftClick() {
  let newId = firstItemId.value - stepSize.value;

  while (newId < 0) {
    newId++;
  }

  firstItemId.value = newId;
}
</script>

<template>
  <div class="carousel__scrollBar">
    <span
      class="carousel__buttonLeft"
      @click="handleButtonLeftClick"
      :style="{ top: `calc(50% - 22px + ${buttonsOffsetPercent}%)` }"
    ></span>
    <div class="carousel__itemsList" :style="{ gap: gapPercent + '%' }">
      <div
        class="carousel__itemsList__item"
        v-for="(slide, id) of slides"
        :key="id"
        :style="{
          'margin-left': id === 0 ? `-${firstItemId * slideWidth}%` : '0px',
          width: slideWidth - gapPercent + '%',
          'min-width': slideWidth - gapPercent + '%',
        }"
      >
        <!-- <ImageSkeleton /> -->
        <component :item="slide" />
        <!-- <slot :film="slide"></slot> -->
      </div>
    </div>
    <span
      class="carousel__buttonRight"
      :style="{
        right: `calc(-22px + ${gapPercent}%)`,
        top: `calc(50% - 22px + ${buttonsOffsetPercent}%)`,
      }"
      @click="handleButtonRightClick"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  &__scrollBar {
    height: 100%;
    position: relative;
  }
  &__itemsList {
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    overflow-x: hidden;
    scrollbar-width: none;
    &__item {
      transition: margin 0.2s ease-out;
      overflow: hidden;
    }
  }
  &__buttonRight {
    z-index: 20;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 22px);
    // right: -22px;
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
    -webkit-user-select: none;
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
    -webkit-user-select: none;
  }
}
</style>
