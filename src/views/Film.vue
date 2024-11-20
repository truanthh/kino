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

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;

const route = useRoute();

const film = ref({});

// const actors = computed(() => {
//   return film.value.actor_names || [];
// });

let similarFilms = ref([]);

const editFilm = ref(false);

const titleField = ref("");
const prodyearField = ref("");
const directorField = ref("");
const countryField = ref("");

async function getFilmById(id) {
  // console.log(`trying to get film ${id}`);
  try {
    let response = await axiosApiInstance.get(
      `http://${DB_SERVER_ADDRESS}/film/${id}`,
    );
    // console.log(response.data);
    film.value = response.data;
    // idk if that should be here, but i need only 10 actor names on this page
    film.value.actors = film.value.actors.slice(0, 10);
    //just for testing
    for (let i = 0; i < 10; i++) {
      similarFilms.value.push(film.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
}

onMounted(async () => {
  // window.scroll(0, 0);

  await getFilmById(route.params.id);
});

const submitForm = async () => {
  const formData = {
    id: route.params.id,
    title: titleField.value,
    prod_year: prodyearField.value,
    country: countryField.value,
    director: directorField.value,
  };

  await updateFilmInfo(route.params.id, formData);
};

// const imagePath = ref("");
const imageUrl = ref("");
const file = ref();

const onFileChange = () => {
  file.value = event.target.files[0];
  if (file.value) {
    imageUrl.value = URL.createObjectURL(file.value);
    // imagePath.value = file.value.name;
  }
};

async function updatePoster(id) {
  if (file.value) {
    const formData = new FormData();
    formData.append("poster", file.value);
    try {
      let response = await axiosApiInstance.post(
        `http://${DB_SERVER_ADDRESS}/films/${id}/poster`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  } else {
    imageUrl.value = "select file! :)";
  }
}

async function updateFilmInfo(id, formData) {
  try {
    let response = await axiosApiInstance.put(
      `http://${DB_SERVER_ADDRESS}/films/${id}`,
      formData,
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function toggleEditFilm() {
  editFilm.value = !editFilm.value;
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
</script>

<template>
  <VideoPlayer />
  <div class="upperSection__wrapper">
    <div class="upperSection__grid-main">
      <!-- <Button -->
      <!--   class="upperSection__wrapper__editbtn" -->
      <!--   @click="toggleEditFilm" -->
      <!--   icon="icon-park-outline:edit" -->
      <!--   rounded -->
      <!--   outlined -->
      <!--   color="gray" -->
      <!-- /> -->
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

        <div class="filmMedia__edit" v-if="editFilm">
          <div v-if="imageUrl">{{ imageUrl }}</div>
          <input type="file" @change="onFileChange" accept="image/*" />
          <Button
            label="Обновить постер"
            class="btn__edit"
            @click="updatePoster(route.params.id)"
          />
        </div>
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
        <div class="filmInfo__about" v-if="!editFilm">
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
            {{ film.director_name }}
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
        <form
          @submit.prevent="submitForm"
          v-if="editFilm"
          class="filmInfo__edit"
        >
          <Input name="id" type="text" :placeholder="`${film.id}`" disabled />
          <Input
            name="title"
            type="text"
            v-model:value="titleField"
            :placeholder="film.title"
            label="Название фильма"
          />
          <Input
            name="prod_year"
            type="text"
            v-model:value="prodyearField"
            :placeholder="film.prod_year"
            label="Год производства"
          />
          <Input
            name="country"
            type="text"
            v-model:value="countryField"
            :placeholder="film.country"
            label="Страна производства"
          />
          <Input
            name="director"
            type="text"
            v-model:value="directorField"
            :placeholder="film.director"
            label="Режиссер"
          />
          <Button label="Обновить данные" class="btn__edit" />
        </form>
      </div>
      <div class="filmMisc">
        <FilmRatingStats
          :imdbRatingEnabled="false"
          rateFilmButtonEnabled
          reviewsCountEnabled
          smallRatingEnabled
        />
        <div class="filmMisc__actors">
          <div class="filmMisc__actors__title">В главных ролях</div>
          <span
            class="filmMisc__actors__actor"
            v-for="actor of film.actors"
            @click="$router.push({ name: 'name', params: { id: actor.id } })"
            >{{ actor.name }}</span
          >
          <span class="filmMisc__actors__count">57 актеров</span>
        </div>
        <div class="filmMisc__voiceActors">
          <div class="filmMisc__voiceActors__title">Роли дублировали</div>
          <span class="filmMisc__voiceActors__actor">Владимир Антоник</span>
          <span class="filmMisc__voiceActors__actor">Антон Эльдаров</span>
          <span class="filmMisc__voiceActors__actor">Евгения Ваган</span>
          <span class="filmMisc__voiceActors__actor">Елена Шульман</span>
          <span class="filmMisc__voiceActors__actor">Сергей Чихачёв</span>
          <span class="filmMisc__voiceActors__count">10 актеров</span>
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
        <div class="filmDescription">
          Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся
          не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную
          власть, но был обязан служить злу. Тихая деревня, где живут хоббиты.
          Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу,
          волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо
          нашел много лет назад. Это кольцо принадлежало когда-то темному
          властителю Средиземья Саурону, и оно дает большую власть своему
          обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем.
          Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой
          Горе и уничтожил.
        </div>
        <div class="ratingMain">
          <FilmRatingMain />
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
  }
  &__grid-main {
    @extend .content-width-global;
    display: grid;
    // position: relative;
    height: 100%;
    grid-template-columns: auto auto auto;
    // background-color: #f0f0f0;
    &__editbtn {
      position: absolute;
      max-width: 200px;
      top: 6px;
      right: 6px;
    }
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

.filmDescription {
  display: flex;
  padding: 40px 0px;
  width: 728px;
}

.filmInfo {
  display: flex;
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
  &__edit {
    margin-top: 2rem;
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
  &__voiceActors {
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
  &__poster {
    width: 100%;
    height: 453px;
    // border-radius: 4px;
  }
  &__edit {
    display: inherit;
    flex-direction: inherit;
    gap: inherit;
  }
  &__trailer {
    height: 170px;
  }
}

.btn {
  &__edit {
    max-width: 200px;
  }
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
