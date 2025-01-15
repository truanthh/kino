<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import VideoPreview from "@/components/VideoPreview.vue";
import FilmRatingMain from "@/components/FilmRatingMain.vue";
import FilmRatingStats from "@/components/FilmRatingStats.vue";
import FilmRatingCritics from "@/components/FilmRatingCritics.vue";
import Carousel from "@/components/Carousel.vue";
import FilmPosterLink from "@/components/FilmPosterLink.vue";
import FilmTrailerPreview from "@/components/FilmTrailerPreview.vue";
import ListItems from "@/components/ListItems.vue";
import FilmReviewsList from "@/components/FilmReviewsList.vue";
import FilmEdit from "@/components/FilmEdit.vue";

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;

const route = useRoute();

const film = ref({});

const isFilmDataLoaded = ref(false);


let similarFilms = ref([]);

const isOpenFilmEdit = ref(false);

async function updateFilmRating(data){
  try {
    let response = await axiosApiInstance.put(
      `http://${DB_SERVER_ADDRESS}/film/${data.id}`,
      {
        id: data.id,
        rating: data.rating
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getFilmById(id) {
  // console.log(`trying to get film ${id}`);
  try {
    let response = await axiosApiInstance.get(
      `http://${DB_SERVER_ADDRESS}/film/${id}`,
    );
    film.value = response.data;
    //just for testing
    for (let i = 0; i < 10; i++) {
      similarFilms.value.push(film.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isFilmDataLoaded.value = true;
  }
}

onMounted(async () => {
  // window.scroll(0, 0);

  await getFilmById(route.params.id);
});

// const imagePath = ref("");

function toggleFilmEdit() {
  isOpenFilmEdit.value = !isOpenFilmEdit.value;
}

const videoUrl = ref("");

//TRAILER STUFF
const testVideoUrl = "@/assets/video.mp4";

const testThumbnailUrl = "@/assets/bla.jpg";

let filmTrailers = ref([
  { videoUrl: "@/assets/video.mp4", thumbnailUrl: "@/assets/bla.jpg" },
  { videoUrl: "@/assets/perp1.mp4", thumbnailUrl: "@/assets/perp1.jpg" },
  { videoUrl: "@/assets/video.mp4", thumbnailUrl: "@/assets/bla.jpg" },
  { videoUrl: "@/assets/perp1.mp4", thumbnailUrl: "@/assets/perp1.jpg" },
]);

let filmReviews = ref([
  "Фильм снят по мотивам романа Джона Рональда Руэла Толкина «Властелин колец» (The Lord of the Rings, 1954-1955).",
  "Фильм снят по мотивам романа Джона Рональда Руэла Толкина «Властелин колец» (The Lord of the Rings, 1954-1955).",
  "Фильм снят по мотивам романа Джона Рональда Руэла Толкина «Властелин колец» (The Lord of the Rings, 1954-1955).",
]);
</script>

<template>
  <VideoPlayer />
  <FilmEdit :isOpenFilmEdit :film="film" @close="toggleFilmEdit" />
  <div class="upperSection__wrapper">
    <div class="upperSection__flexMain">
      <Button
        class="upperSection__wrapper__editbtn"
        @click="toggleFilmEdit"
        icon="icon-park-outline:edit"
        rounded
        outlined
        color="gray"
      />
      <div class="filmMedia">
        <img
          :src="film.poster_url"
          class="filmMedia__poster"
          v-if="film.poster_url"
        />
        <ImageSkeleton v-if="!film.poster_url" class="filmMedia__poster" />

        <FilmTrailerPreview
          :item="filmTrailers[0]"
          class="filmMedia__trailer"
        />
      </div>
      <div class="filmInfo">
        <div class="filmInfo__title">
          {{ film.title }} ({{ film.prod_year }})
        </div>
        <div class="filmInfo__titleOrig">
          {{ film.title_orig }} {{ film.age_restriction }}
        </div>
        <div class="btnsContainer">
          <Button
            rounded
            color="lightgray"
            icon="tdesign:bookmark-add"
            label="Буду смотреть"
            class="btnsContainer__bookmark"
          />
          <Button
            rounded
            color="lightgray"
            icon="tabler:dots"
            class="btnsContainer__bookmarkMore"
          />
        </div>
        <div class="filmInfo__about__title">О фильме</div>
        <div class="filmInfo__about">
          <div>Год производства</div>
          <div>
            {{ film.prod_year }}
          </div>
          <div>Страна</div>
          <div>
            {{ film.country }}
          </div>
          <div>Жанр</div>
          <div>
            {{ film.genre }}
          </div>
          <div>Слоган</div>
          <div class="filmInfo__about__slogan">«{{ film.slogan }}»</div>
          <div>Режиссер</div>
          <div>
            {{ film.director }}
          </div>
          <div>Композитор</div>
          <div>
            {{ film.composer }}
          </div>
          <div>Бюджет</div>
          <div>
            {{ film.budget }}
          </div>
          <div>Возраст</div>
          <div>
            {{ film.age_restriction }}
          </div>
          <div>Премьера в России</div>
          <div>
            {{ film.premiere_russia }}
          </div>
          <div>Премьера в мире</div>
          <div>
            {{ film.premiere_world }}
          </div>
        </div>
      </div>
      <div class="filmMisc">
        <FilmRatingStats
          :imdbRatingEnabled="false"
          rateFilmButtonEnabled
          reviewsCountEnabled
          smallRatingEnabled
        />
        <div class="filmMisc__actors" v-if="film.actors">
          <div class="filmMisc__actors__title">В главных ролях</div>
          <span class="filmMisc__actors__actor" v-for="actor of film.actors"> {{ actor }} </span>
          <span class="filmMisc__actors__count">{{ film.actors.length}} актеров </span>
        </div>
        <div class="filmMisc__actorsVoice" v-if="film.actors_voice">
          <div class="filmMisc__actorsVoice__title"> Роли дублировали </div>
          <span class="filmMisc__actorsVoice__actor" v-for="actor of film.actors_voice"> {{ actor }} </span>
          <span class="filmMisc__actorsVoice__count">{{ film.actors_voice.length}} актеров </span>
        </div>
      </div>
    </div>
  </div>
  <div class="middleSection__wrapper">
    <div class="middleSection__flexMain">
      <div class="middleSection__spoilers">
        <div class="spoilerBar">
          <a class="spoilerBar__item">Обзор</a>
          <a class="spoilerBar__item">Награды</a>
          <a class="spoilerBar__item">Премьеры</a>
          <a class="spoilerBar__item">Изображения</a>
          <a class="spoilerBar__item">Трейлеры</a>
          <a class="spoilerBar__item">Студии</a>
          <a class="spoilerBar__item">Связи</a>
          <a class="spoilerBar__item">Рецензии</a>
          <a class="spoilerBar__item">Сайты</a>
          <a class="spoilerBar__item">Еще</a>
        </div>
        <div class="filmSynopsis">
          {{ film.synopsis }}
        </div film.synopsis >
        <div class="ratingMain">
          <FilmRatingMain v-if="isFilmDataLoaded" :film @updateRating="updateFilmRating"/>
        </div>
        <div class="ratingCritics">
          <FilmRatingCritics
            header="Рейтинг кинокритиков в мире"
            positiveReviewsCount="217"
            negativeReviewsCount="20"
            starValueEnabled
          />
          <FilmRatingCritics
            header="В России"
            positiveReviewsCount="5"
            negativeReviewsCount="2"
          />
        </div>
        <div class="middleSection__similarFilms">
          <div class="middleSection__similarFilms__header">
            <h2>Если вам понравился этот фильм</h2>
          </div>
          <Carousel
            class="middleSection__similarFilms__carousel"
            :slides="similarFilms"
            :slidesShown="5"
            :component="FilmPosterLink"
            gapPercent="1"
            buttonsOffsetPercent="-10"
          />
        </div>
        <div class="middleSection__trailers">
          <div class="middleSection__trailers__header">
            <h2>Трейлеры и тизеры</h2>
          </div>
          <Carousel
            class="middleSection__trailers__carousel"
            :slides="filmTrailers"
            :component="FilmTrailerPreview"
            :slidesShown="2"
            gapPercent="1"
          />
        </div>
        <div class="middleSection__filmFacts">
          <div class="middleSection__filmFacts__header">
            <h2>Знаете ли вы, что...</h2>
          </div>
          <div class="middleSection__filmFacts__list">
            <ListItems v-if="film.facts" :items="film.facts" />
          </div>
        </div>
        <!-- <div class="middleSection__filmReviewsCritics"> -->
        <!--   <div class="middleSection__filmReviewsCritics__header"> -->
        <!--     <h2>Рецензии кинокритиков</h2> -->
        <!--   </div> -->
        <!--   <Carousel -->
        <!--     class="middleSection__filmReviewsCritics__carousel" -->
        <!--     :slides="filmReviews" -->
        <!--     :component="FilmTrailerPreview" -->
        <!--     :slidesShown="3" -->
        <!--     gapPercent="1" -->
        <!--   /> -->
        <!-- </div> -->
        <div class="middleSection__filmReviews">
          <div class="middleSection__filmReviews__header">
            <h2>Рецензии зрителей</h2>
          </div>
          <FilmReviewsList :items="filmReviews" />
        </div>
      </div>
      <div class="middleSection__rightPanel">
        <div class="middleSection__rightPanel__friends">
          <div class="middleSection__rightPanel__friends__title">
            <b>Друзья</b>
          </div>
          <div class="middleSection__rightPanel__friends__noFriends">
            Пока никто из друзей не оценил этот фильм...
          </div>
        </div>
        <div class="middleSection__rightPanel__lists">
          <div class="middleSection__rightPanel__lists__title">
            <b>В списках</b>
          </div>
          <div class="middleSection__rightPanel__lists__content">
            <div>Фильмы про волшебство и про магию</div>
            <div>Лучшие фильмы для Детей: список лучших детских фильмов</div>
          </div>
        </div>
        <div class="middleSection__rightPanel__soundtracks">
          <div class="middleSection__rightPanel__soundtracks__title">
            <b> Саундтреки </b>
          </div>
          <div class="middleSection__rightPanel__soundtracks__content">
            <div>Soundtrack1</div>
            <div>Soundtrack2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-width-global {
  min-width: 1200px;
}

@media screen and (max-width: 1200px) {
  .content-width-global {
    min-width: 1000px;
  }
}

.upperSection {
  &__wrapper {
    border-bottom: solid 1px rgba(222, 222, 222, 0.4);
    display: flex;
    height: 100%;
    padding: 50px 360px;
    align-items: center;
    justify-content: center;
    position: relative;
    &__editbtn {
      position: absolute;
      max-width: 200px;
      top: 50px;
      right: 50px;
    }
  }
  &__grid-main {
    // @extend .content-width-global;
    // display: grid;
    // height: 100%;
    // grid-template-columns: auto auto auto;
    // background-color: #f0f0f0;
  }
  &__flexMain{
    @extend .content-width-global;
    display: flex;
    justify-content: space-between;
  }
}

.middleSection {
  &__similarFilms {
    margin-top: 60px;
    &__header {
      color: black;
      margin-bottom: 14px;
    }
    &__carousel {
      width: 800px;
      height: 290px;
    }
  }
  &__trailers {
    margin-top: 60px;
    &__header {
      color: black;
      margin-bottom: 14px;
    }
    &__carousel {
      width: 800px;
      height: 217px;
    }
  }
  &__filmFacts {
    margin-top: 60px;
    &__header {
      color: black;
      margin-bottom: 14px;
    }
  }
  &__filmReviewsCritics {
    margin-top: 60px;
    &__header {
      color: black;
      margin-bottom: 14px;
    }
    &__carousel {
      width: 800px;
      height: 290px;
    }
  }
  &__filmReviews {
    margin-top: 40px;
    &__header {
      color: black;
      margin-bottom: 20px;
    }
  }
  &__writeReview {
    margin-top: 40px;
    &__header {
      color: black;
      margin-bottom: 20px;
    }
  }
  &__wrapper {
    display: flex;
    height: 100%;
    padding: 50px 360px;
    // justify-content: space-between;
    align-items: center;
    justify-content: center;
  }
  &__flexMain {
    @extend .content-width-global;
    display: flex;
    height: 100%;
    gap: 80px;
    // position: relative;
  }
  &__spoilers {
    display: flex;
    flex-direction: column;
    // background-color: orange;
  }
  &__rightPanel {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    width: 320px;
    height: 1000px;
    &__friends {
      &__title {
        display: flex;
        font-size: 18px;
      }
      &__noFriends {
        font-size: 14px;
      }
    }
    &__lists {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      font-size: 18px;
      background-color: teal;
      height: 400px;
      &__content {
        font-size: 14px;
      }
    }
  }
}

.spoilerBar {
  // background-color: #f0f0f0;
  display: flex;
  gap: 14px;
  height: 37px;
  border-bottom: solid 1px rgba(222, 222, 222, 0.4);
  cursor: pointer;
  &__item {
    &:hover {
      color: #ff5500;
    }
  }
}

.ratingMain {
  padding-bottom: 20px;
  border-bottom: solid 1px rgba(222, 222, 222, 0.4);
}

.ratingCritics {
  display: flex;
  margin-top: 20px;
  gap: 40px;
}

.filmSynopsis {
  display: flex;
  padding: 40px 0px;
  width: 728px;
}

.filmInfo {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0rem 3.2rem;
  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    color: black;
    font-family: Tahoma;
  }
  &__titleOrig {
    margin-top: 10px;
    font-size: 18px;
    color: #666666;
  }
  &__about {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    row-gap: 1rem;
    margin-top: 1.2rem;
    font-size: 0.8rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    &__title {
      font-size: 1.5rem;
      font-weight: bold;
      color: black;
      margin-top: 3rem;
    }
    &__slogan {
      color: gray;
    }
  }
}

.filmMisc {
  &__actors {
    margin-top: 100px;
    &__title {
      @extend .actorsTitle;
    }
    &__actor {
      margin-top: 2px;
      display: block;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #ff5500;
      }
    }
    &__count {
      @extend .actorsCount;
    }
  }
  &__actorsVoice {
    margin-top: 50px;
    &__title {
      @extend .actorsTitle;
    }
    &__actor {
      margin-top: 2px;
      display: block;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #ff5500;
      }
    }
    &__count {
      @extend .actorsCount;
    }
  }
}

.filmMedia {
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 300px;
  max-width: 300px;
  &__poster {
    width: 100%;
    height: 453px;
    // border-radius: 4px;
  }
  &__trailer {
    height: 170px;
  }
}

.btn {
  &__rate {
    margin-top: 10px;
    height: 33px;
    width: 200px;
    font-weight: bold;
    font-size: 13px;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.btnsContainer {
  margin-top: 40px;
  display: flex;
  gap: 8px;
  &__bookmark {
    font-weight: bold;
    height: 50px;
    width: 200px;
    &:hover {
      transform: scale(1.05);
    }
  }
  &__bookmarkMore {
    font-weight: bold;
    height: 50px;
    width: 50px;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.actorsTitle {
  font-weight: bold;
  font-size: 16px;
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
  color: black;
  &::after {
    content: "";
    position: absolute;
    top: 5px;
    // display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='48' height='48' fill='%23000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.519 23.968 13.339 8.466 16.66 5l18 17.246 1.821 1.745-1.832 1.732-18 17.02-3.298-3.487L29.52 23.968Z'/%3E%3C/svg%3E");
  }
}

.actorsCount {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #ff5500;
  cursor: pointer;
}
</style>
