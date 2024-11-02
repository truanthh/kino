<script setup>
import RatingProgressBar from "@/components/RatingProgressBar.vue";
import StarIcon from "@/components/StarIcon.vue";

const props = defineProps({
  header: {
    type: String,
    default: "default header",
  },
  positiveReviewsCount: {
    type: String,
    default: "0",
  },
  negativeReviewsCount: {
    type: String,
    default: "0",
  },
  starValueEnabled: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "400px",
  },
});

let progressCount = props.positiveReviewsCount;
let remainderCount = props.negativeReviewsCount;

let totalCount = 0;

let progressPercent = 0;

let starValue = 8.2;

function setRating() {
  totalCount = Number(remainderCount) + Number(progressCount);

  progressPercent = (
    (Number(progressCount) / Number(totalCount)) *
    100
  ).toFixed(2);
}

setRating();
</script>

<template>
  <div class="filmRatingCritics__container">
    <div class="filmRatingCritics__header">
      <h3>{{ header }}</h3>
    </div>
    <div class="bar__container" :style="[{ 'max-width': maxWidth }]">
      <div class="bar">
        <div
          class="bar__progress"
          :style="[
            {
              width: `${progressPercent > 0 ? progressPercent : 0}%`,
              'max-width': maxWidth,
            },
          ]"
        >
          <div class="bar__progress__text" v-if="progressPercent > 0">
            {{ progressCount }}
          </div>
        </div>
        <div
          class="bar__remainder"
          :style="[
            {
              width: `${progressPercent > 0 ? 100 - progressPercent : 0}%`,
              'max-width': maxWidth,
            },
          ]"
        >
          <div class="bar__remainder__text" v-if="progressPercent < 100">
            {{ remainderCount }}
          </div>
        </div>
      </div>
    </div>
    <div class="filmRatingCritics__addInfo">
      <span class="filmRatingCritics__ratingPercentage">
        {{ Math.round(progressPercent) }}%
      </span>
      <span class="filmRatingCritics__totalCount">
        {{ totalCount }} оценок
      </span>
      <span class="filmRatingCritics__starValue" v-if="starValueEnabled">
        {{ starValue }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filmRatingCritics {
  &__container {
    // background-color: orange;
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 371px;
  }
  &__header {
    color: black;
  }
  &__addInfo {
    // background-color: #b3b3b3;
    // text-align: left;
  }
  &__ratingPercentage {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 22px;
    color: #3bb33b;
  }
  &__totalCount {
    font-family: sans-serif;
    font-size: 12px;
    color: #666666;
  }
  &__starValue {
    margin-left: 10px;
    font-size: 18px;
    &::before {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-inline-end: 6px;
      content: "";
      vertical-align: -10%;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='20' height='20' fill='%23000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m10 14.886-5.407 3.03L5.8 11.83 1.25 7.616l6.154-.73L10 1.25l2.596 5.635 6.154.731-4.55 4.214 1.207 6.087L10 14.885Z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}

.genCountText {
  height: 100%;
  display: flex;
  font-weight: bold;
  font-size: 12px;
  align-items: center;
  font-family: sans-serif;
}

.genBar {
  border-radius: 2px;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar {
  &__container {
    // margin-top: 10px;
    // overflow: hidden;
  }
  height: 16px;
  border-radius: 2px;
  display: flex;
  &__remainder {
    @extend .genBar;
    background-color: #ffd1b2;
    &__text {
      @extend .genCountText;
      color: #fe000b;
    }
  }
  &__progress {
    @extend .genBar;
    background-color: #99d6ad;
    transition: 0.3s;
    position: relative;
    &__text {
      @extend .genCountText;
      color: #149933;
    }
    &::after {
      content: "";
      position: absolute;
      z-index: 1000;
      right: -1px;
      top: -3px;
      width: 2px;
      height: 22px;
      display: inline-block;
      background-color: #009933;
    }
  }
}
</style>
