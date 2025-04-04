<script setup>
import Button from "@/components/Button.vue";
import { ref, computed } from "vue";

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  smallRatingEnabled: {
    type: Boolean,
    default: false,
  },
  imdbRatingEnabled: {
    type: Boolean,
    default: true,
  },
  rateFilmButtonEnabled: {
    type: Boolean,
    default: false,
  },
  reviewsCountEnabled: {
    type: Boolean,
    default: false,
  },
});

const rating = computed(() => {
  return Math.round(props.rating * 100) / 100;
});
</script>

<template>
  <div class="filmRatingStats-container">
    <div class="filmRatingStats-ratingBlock">
      <span
        class="filmRatingStats-ratingBlock-ratingValue"
        :style="{ fontSize: smallRatingEnabled ? '30px' : '48px' }"
      >
        {{ rating }}
      </span>
      <div class="filmRatingStats-placement">
        <span class="filmRatingStats-placement-leafLeft"></span>
        <div class="filmRatingStats-placement-text">
          <span class="filmRatingStats-placement-text-top250Title">
            ТОП 250
          </span>
          <span class="filmRatingStats-placement-text-place"> 10 место </span>
        </div>
        <span class="filmRatingStats-placement-leafRight"></span>
      </div>
    </div>
    <div class="filmRatingStats-countBlock">
      <span class="filmRatingStats-countBlock-gradesCount">
        {{ count }} оценки
      </span>
      <div class="filmRatingStats-countBlock-IMDb" v-if="imdbRatingEnabled">
        <span class="filmRatingStats-countBlock-IMDb-rating"> IMDb: 8.90 </span>
        <span class="filmRatingStats-countBlock-IMDb-gradesCount">
          2 054 501 оценка
        </span>
      </div>
    </div>
    <Button
      color="lightgray"
      label="Оценить фильм"
      name="rate"
      rounded
      class="btn-rate"
      v-if="rateFilmButtonEnabled"
    />
    <div>
      <span class="filmRatingStats-reviewsCount" v-if="reviewsCountEnabled">
        278 рецензий
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filmRatingStats {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
  &-ratingBlock {
    display: flex;
    gap: 12px;
    // background-color: orange;
    &-ratingValue {
      // font-size: 48px;
      font-family: Tahoma;
      font-weight: 600;
      background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &-countBlock {
    display: flex;
    // align-items: center;
    font-family: Tahoma;
    color: #666666;
    &-gradesCount {
      font-size: 13px;
    }
    &-IMDb {
      display: flex;
      margin-left: 10px;
      gap: 8px;
      &-rating {
        font-size: 13px;
        font-weight: bold;
      }
      &-gradesCount {
        font-size: 13px;
      }
    }
  }
  &-placement {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    &-text {
      display: flex;
      flex-direction: column;
      &-top250Title {
        font-family: sans-serif;
        font-weight: 600;
        line-height: 18px;
        background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &-place {
        line-height: 18px;
        font-family: sans-serif;
        background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &-leafLeft {
      display: inline-block;
      width: 18px;
      height: 43px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3csvg width='10' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.26 19.395s1.385-.617 1.768-1.806c.382-1.188-.384-2.498-.384-2.498s-1.386.618-1.768 1.806c-.382 1.189.384 2.498.384 2.498Z' fill='url(%23a)'/%3e%3cpath d='M6.583 19.679s-1.457.422-2.516-.24c-1.058-.662-1.317-2.157-1.317-2.157s1.457-.422 2.515.24c1.059.662 1.318 2.157 1.318 2.157Z' fill='url(%23b)'/%3e%3cpath d='M5.793 15.217s-.142-1.51.706-2.427c.847-.916 2.364-.892 2.364-.892s.143 1.51-.705 2.427-2.365.892-2.365.892Z' fill='url(%23c)'/%3e%3cpath d='M5.547 6.953s1.848-.823 2.357-2.407c.733-2.278-.28-4.048-.28-4.048s-2.344.66-3.085 2.965c-.742 2.305 1.008 3.49 1.008 3.49Z' fill='url(%23d)'/%3e%3cpath d='M4.806 10.864s-2.353-.03-3.626-1.488C-.094 7.918.194 5.583.194 5.583s2.353.029 3.626 1.487c1.274 1.459.986 3.794.986 3.794Z' fill='url(%23e)'/%3e%3cpath d='M5.484 10.822s-.189-2.014.942-3.235c1.13-1.221 3.153-1.188 3.153-1.188s.19 2.014-.942 3.236c-1.13 1.221-3.153 1.187-3.153 1.187Z' fill='url(%23f)'/%3e%3cpath d='M5.32 15.337s-1.989.366-3.305-.653C.698 13.665.554 11.648.554 11.648s1.99-.366 3.305.653c1.317 1.018 1.462 3.036 1.462 3.036Z' fill='url(%23g)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.313 3.167c.205.034-.51 4.06-.544 4.264-.59 3.547-.394 9.795 3.33 15.285a.384.384 0 0 1-.08.518.373.373 0 0 1-.536-.083C4.61 17.453 4.416 10.978 5.025 7.308c.034-.205 1.083-4.175 1.288-4.141Z' fill='url(%23h)'/%3e%3cdefs%3e%3clinearGradient id='a' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='b' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='c' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='f' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='g' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='h' x1='3.7' y1='3.033' x2='9.68' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    }
    &-leafRight {
      display: inline-block;
      width: 18px;
      height: 43px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3csvg width='10' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.74 19.395s-1.385-.617-1.768-1.806c-.382-1.188.384-2.498.384-2.498s1.386.618 1.768 1.806c.382 1.189-.384 2.498-.384 2.498Z' fill='url(%23a)'/%3e%3cpath d='M3.417 19.679s1.457.422 2.516-.24c1.058-.662 1.317-2.157 1.317-2.157s-1.457-.422-2.515.24c-1.059.662-1.318 2.157-1.318 2.157Z' fill='url(%23b)'/%3e%3cpath d='M4.207 15.217s.142-1.51-.706-2.427c-.847-.916-2.364-.892-2.364-.892s-.143 1.51.705 2.427 2.365.892 2.365.892Z' fill='url(%23c)'/%3e%3cpath d='M4.453 6.953S2.605 6.13 2.096 4.546c-.733-2.278.28-4.048.28-4.048s2.344.66 3.085 2.965c.742 2.305-1.008 3.49-1.008 3.49Z' fill='url(%23d)'/%3e%3cpath d='M5.194 10.864s2.353-.03 3.626-1.488c1.274-1.458.986-3.793.986-3.793S7.453 5.612 6.18 7.07c-1.274 1.459-.986 3.794-.986 3.794Z' fill='url(%23e)'/%3e%3cpath d='M4.516 10.822s.189-2.014-.942-3.235C2.444 6.366.421 6.399.421 6.399s-.19 2.014.942 3.236c1.13 1.221 3.153 1.187 3.153 1.187Z' fill='url(%23f)'/%3e%3cpath d='M4.68 15.337s1.989.366 3.305-.653c1.317-1.019 1.461-3.036 1.461-3.036s-1.99-.366-3.305.653c-1.317 1.018-1.462 3.036-1.462 3.036Z' fill='url(%23g)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.687 3.167c-.205.034.51 4.06.544 4.264.59 3.547.394 9.795-3.33 15.285a.384.384 0 0 0 .08.518c.17.132.415.095.536-.083C5.39 17.453 5.584 10.978 4.975 7.308c-.034-.205-1.083-4.175-1.288-4.141Z' fill='url(%23h)'/%3e%3cdefs%3e%3clinearGradient id='a' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='b' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='c' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='f' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='g' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3clinearGradient id='h' x1='6.3' y1='3.033' x2='.32' y2='12.801' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD25E'/%3e%3cstop offset='1' stop-color='%23B59646'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    }
  }
  &-reviewsCount {
    font-size: 14px;
  }
}

.btn-rate {
  margin-top: 10px;
  height: 33px;
  width: 200px;
  font-weight: bold;
  font-size: 13px;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
