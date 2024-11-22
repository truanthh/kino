<script setup>
import { ref, computed } from "vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});

let showButtonMore = ref(true);

let testString =
  "Читали ли вы Толкиена? Если нет, то знайте, что мир, который на протяи долгих лет создавал писатель в своих книгах, по-настоящему огромен. Выдуманные страны, народы, обычаи и культуры увлекают некоторых энтузиастовvv гораздо больше нашего собственного. Они живут в альтернативной реальности, путешествуют во времени. Их называют толкиенистами. Но даже если вы не читали книг, толкиенистом вам захочется стать посмотрев фильмы Питера Джексона. Его эпическая трилогия «Властелин колец» переносит зрителя в иное измерение. Нужно было иметь мужество, чтобы созреть для решения снять фильмы по мотивам такого монументального произведения. Удивление и восхищение вызывает проделанная работа! То, как актеры на время съемок переродились в сказочных персонажей, прониклись духом фантазии, достойно оваций! Первая часть трилогии под названием «Братство кольца» знакомит Вас с поистине ярким, светлым и бескрайним миром Среднеземья. И начинается всё в землях Шира – там, где живут хоббиты. Именно они, эти маленькие и добродушные, похожие на детей, сказочные существа будут главными действующими лицами. И именно на них падет миссия о спасении всего живого от вездесущего Зла. Пока еще светит солнце и в рощах поют птицы и беззаботные обитатели Шира не чувствуют опасности, но она близко.";

let reviewText = ref(testString);

const isTextExpanded = computed(() => {
  return showButtonMore.value
    ? "filmReviewsList__review__text"
    : "filmReviewsList__review__text_expanded";
});

function showFullReview() {
  showButtonMore.value = false;
}
</script>

<template>
  <div class="filmReviewsList__wrapper">
    <div class="filmReviewsList__review">
      <div class="filmReviewsList__review__header">
        <div class="filmReviewsList__review__header__userInfo">
          <div
            class="filmReviewsList__review__header__userInfo__avatarContainer"
          >
            <ImageSkeleton rounded />
          </div>
          <div class="filmReviewsList__review__header__userInfo__infoContainer">
            <span>Mitrandir</span>
            <span>8 reviews</span>
          </div>
        </div>
        <div class="filmReviewsList__review__header__summaryInfo">
          <span>9 октября 2007 в 20:32</span>
          <span>прямая ссылка</span>
        </div>
      </div>
      <div class="filmReviewsList__review__title">
        «Сказка – ложь, да в ней намек…»
      </div>
      <div :class="isTextExpanded">
        {{ reviewText }}
      </div>
      <button v-if="showButtonMore" class="buttonMore" @click="showFullReview">
        показать всю рецензию
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reviewText {
  margin: 10px 20px 20px 20px;
  font-size: 13px;
  font-family: Verdana;
  overflow: hidden;
  --max-lines: 3;
  --line-height: 1.4;
  line-height: var(--line-height);
}

.filmReviewsList {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2%;
    width: 800px;
    height: 2000px;
    background-color: orange;
  }
  &__review {
    // display: flex;
    // flex-direction: column;
    width: 622px;
    background-color: #ebf7eb;
    &__header {
      display: flex;
      background-color: #ebf7eb;
      height: 81px;
      border-bottom: 1px solid rgba(31, 31, 31, 0.07);
      align-items: center;
      &__userInfo {
        display: flex;
        margin-left: 20px;
        height: 48px;
        gap: 10px;
        &__infoContainer {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          justify-content: center;
          color: #5e635e;
        }
        &__avatarContainer {
          height: 48px;
          width: 48px;
        }
      }
      &__summaryInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: auto;
        margin-right: 20px;
        font-size: 14px;
        color: #5e635e;
      }
    }
    &__title {
      color: black;
      font-weight: bold;
      font-size: 19px;
      margin: 10px 20px 0px 20px;
    }
    &__text {
      @extend .reviewText;
      max-height: calc(var(--max-lines) * 1em * var(--line-height));
      &_expanded {
        @extend .reviewText;
        max-height: auto;
      }
    }
  }
}

.buttonMore {
  background-color: #d3d3d3;
  color: #565956;
  cursor: pointer;
  border: none;
  width: 160px;
  height: 18px;
  font-size: 13px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 1px 6px 2px;
}
</style>
