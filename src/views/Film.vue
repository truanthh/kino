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
import RatingStars from "@/components/RatingStars.vue";

const isOpenVideoPlayer = ref(false);

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;

const route = useRoute();

const film = ref({});

// const actors = computed(() => {
//   return film.value.actor_names || [];
// });

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

function openVideoPlayer() {
  isOpenVideoPlayer.value = true;
}

// function closeVideoPlayer(){
//   isOpenVideoPlayer.value = false;
// }
</script>

<template>
  <VideoPlayer
    :openVideoPlayer="isOpenVideoPlayer"
    @closePlayer="isOpenVideoPlayer = false"
  />
  <div class="upperSection_wrapper_borderBottom">
    <div class="upperSection_wrapper">
      <div class="upperSection_gridMain">
        <!-- <Button -->
        <!--   class="wrapper_editbtn" -->
        <!--   @click="toggleEditFilm" -->
        <!--   icon="icon-park-outline:edit" -->
        <!--   rounded -->
        <!--   outlined -->
        <!--   color="gray" -->
        <!-- /> -->
        <div class="film_media">
          <img
            :src="film.poster_url"
            class="film_media_poster"
            v-if="film.poster_url"
          />
          <ImageSkeleton v-if="!film.poster_url" class="film_media_poster" />

          <VideoPreview
            :openVideoPlayer
            thumbnailSrc="@/assets/bla.jpg"
            desc="Трейлер №2 (дублированный)"
            date="17 июня 2019"
          />

          <div class="film_media_edit" v-if="editFilm">
            <div v-if="imageUrl">{{ imageUrl }}</div>
            <input type="file" @change="onFileChange" accept="image/*" />
            <Button
              label="Обновить постер"
              class="btn_edit"
              @click="updatePoster(route.params.id)"
            />
          </div>
        </div>
        <div class="film_info">
          <div class="film_info_title">
            {{ film.title }} ({{ film.prod_year }})
          </div>
          <div class="film_info_titleOrig">
            {{ film.title_orig }} {{ film.age_restriction }}
          </div>
          <div class="btnsContainer">
            <Button
              rounded
              color="lightgray"
              icon="tdesign:bookmark-add"
              label="Буду смотреть"
              class="btnsContainer_bookmark"
            />
            <Button
              rounded
              color="lightgray"
              icon="tabler:dots"
              class="btnsContainer_bookmarkMore"
            />
          </div>
          <div class="film_info_titleAbout">О фильме</div>
          <div class="film_info_about" v-if="!editFilm">
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
            <div class="film_info_about_slogan">«{{ film.slogan }}»</div>
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
            class="film_info_edit"
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
            <Button label="Обновить данные" class="btn_edit" />
          </form>
        </div>
        <div class="film_misc">
          <div class="film_misc_ratingSmall">
            <div class="film_misc_ratingSmall_valueBlock">8.3</div>
            <div class="film_misc_ratingSmall_countBlock">158 195 оценок</div>
          </div>
          <Button
            color="lightgray"
            label="Оценить фильм"
            name="rate"
            rounded
            class="btn_rate"
          />
          <div class="film_misc_reviewCount">19 рецензий</div>
          <div class="film_misc_actors">
            <div class="film_misc_actorsTitle">В главных ролях</div>
            <span
              class="film_misc_actors_actor"
              v-for="actor of film.actors"
              @click="$router.push({ name: 'name', params: { id: actor.id } })"
              >{{ actor.name }}</span
            >
            <span class="film_misc_actors_actorsCount">57 актеров</span>
          </div>
          <div class="film_misc_voiceActors">
            <div class="film_misc_voiceActorsTitle">Роли дублировали</div>
            <span class="film_misc_voiceActors_actor">Владимир Антоник</span>
            <span class="film_misc_voiceActors_actor">Антон Эльдаров</span>
            <span class="film_misc_voiceActors_actor">Евгения Ваган</span>
            <span class="film_misc_voiceActors_actor">Елена Шульман</span>
            <span class="film_misc_voiceActors_actor">Сергей Чихачёв</span>
            <span class="film_misc_voiceActors_actorsCount">10 актеров</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="middleSection_wrapper">
    <div class="middleSection_misc">
      <div class="spoilerItemsBar">
        <a class="spoilerItemsBar_item">Обзор</a>
        <a class="spoilerItemsBar_item">Награды</a>
        <a class="spoilerItemsBar_item">Премьеры</a>
        <a class="spoilerItemsBar_item">Изображения</a>
        <a class="spoilerItemsBar_item">Трейлеры</a>
        <a class="spoilerItemsBar_item">Студии</a>
        <a class="spoilerItemsBar_item">Связи</a>
        <a class="spoilerItemsBar_item">Рецензии</a>
        <a class="spoilerItemsBar_item">Сайты</a>
        <a class="spoilerItemsBar_item">Еще</a>
      </div>
      <div class="desc">
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
        <h2>Рейтинг фильма</h2>
        <RatingStars />
      </div>
    </div>
    <div class="friends"></div>
  </div>
</template>

<style lang="scss" scoped>
// cuz i need full width border xd
.upperSection_wrapper_borderBottom {
  border-bottom: solid 1px rgba(222, 222, 222, 0.4);
}

.upperSection_wrapper {
  display: flex;
  height: 100%;
  padding: 50px 360px;
  align-items: center;
  justify-content: center;
}

.upperSection_gridMain {
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  height: 100%;
  // min-width: 1100px;
  // background-color: #f0f0f0;
  &_editbtn {
    position: absolute;
    max-width: 200px;
    top: 6px;
    right: 6px;
  }
}

@media screen and (max-width: 1500px) {
  .grid__wrapper {
    padding: 50px 0px;
  }
  .grid__main {
    // min-width: none;
  }
}

.middleSection {
  &_wrapper {
    display: flex;
    height: 100%;
    padding: 50px 360px;
    justify-content: space-between;
  }
  &_misc {
    display: flex;
    flex-direction: column;
    // background-color: orange;
  }
}

.spoilerItemsBar {
  // background-color: #f0f0f0;
  display: flex;
  gap: 14px;
  height: 37px;
  border-bottom: solid 1px rgba(222, 222, 222, 0.4);
  cursor: pointer;
  &_item {
    &:hover {
      color: #ff5500;
    }
  }
}

.ratingMain {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 40px 0px;
  width: 728px;
  // background-color: orange;
}

.desc {
  display: flex;
  padding: 40px 0px;
  width: 728px;
}

.friends {
  display: flex;
  background-color: blue;
  width: 320px;
  height: 1000px;
}

.film_info {
  display: flex;
  flex-direction: column;
  padding: 0rem 3.2rem;
  &_title {
    font-size: 2.5rem;
    font-weight: bold;
    color: black;
    font-family: Tahoma;
  }
  &_titleOrig {
    margin-top: 10px;
    font-size: 18px;
    color: #666666;
  }
  &_titleAbout {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    margin-top: 3rem;
  }
  &_about {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    row-gap: 1rem;
    margin-top: 1.2rem;
    font-size: 0.8rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    &_slogan {
      color: gray;
    }
  }
  &_edit {
    margin-top: 2rem;
  }
}

.film_misc {
  &_ratingSmall {
    display: flex;
    flex-direction: column;
    &_valueBlock {
      font-size: 32px;
      font-weight: bold;
      color: #3bb33b;
    }
    &_countBlock {
      font-size: 14px;
    }
  }
  &_reviewCount {
    font-size: 13px;
  }
  &_actors {
    margin-top: 100px;
    &Title {
      @extend .actorsTitle;
    }
    &_actor {
      margin-top: 2px;
      display: block;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #ff5500;
      }
    }
    &_actorsCount {
      @extend .actorsCount;
    }
  }

  &_voiceActors {
    margin-top: 50px;
    &Title {
      @extend .actorsTitle;
    }
    &_actor {
      margin-top: 2px;
      display: block;
      font-size: 14px;
    }
    &_actorsCount {
      @extend .actorsCount;
    }
  }
}

.film_media {
  display: flex;
  flex-direction: column;
  gap: 40px;
  &_poster {
    width: 100%;
    height: 453px;
    // border-radius: 4px;
  }
  &_edit {
    display: inherit;
    flex-direction: inherit;
    gap: inherit;
  }
}

.btn {
  &_edit {
    max-width: 200px;
  }
  &_rate {
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
  &_bookmark {
    font-weight: bold;
    height: 50px;
    width: 200px;
    &:hover {
      transform: scale(1.05);
    }
  }
  &_bookmarkMore {
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
