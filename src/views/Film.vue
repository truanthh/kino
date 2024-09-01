<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

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
</script>

<template>
  <div class="wrapper">
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
      <div class="film_media_trailer">
        <ImageSkeleton class="film_media_trailerSkeleton" />
        <div class="film_media_trailerDesc">Трейлер №2 (дублированный)</div>
        <div class="film_media_trailerDate">17 июня 2019</div>
      </div>
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
      <div class="film_info_title">{{ film.title }}</div>
      <div class="film_info_titleOrig">{{ film.title_orig }}</div>
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
        <div>Режиссер</div>
        <div>
          {{ film.director_name }}
        </div>
        <div>Композитор</div>
        <div>
          {{ film.composer }}
        </div>
        <div>Слоган</div>
        <div>
          {{ film.slogan }}
        </div>
        <div>Жанр</div>
        <div>
          {{ film.genre }}
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
      <form @submit.prevent="submitForm" v-if="editFilm" class="film_info_edit">
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
      <div class="film_misc_rating">
        <div class="film_misc_rating_valueBlock">8.3</div>
        <div class="film_misc_rating_countBlock">158 195 оценок</div>
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
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.27fr 0.6fr 0.2fr;
  width: 100%;
  max-width: 1200px;
  margin: 120px auto;
  min-height: 2000px;
  position: relative;
  // border: solid 2px gray;
  &_editbtn {
    position: absolute;
    max-width: 200px;
    top: 6px;
    right: 6px;
  }
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
  }
  &_edit {
    margin-top: 2rem;
  }
}

.film_misc {
  &_rating {
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
      display: block;
      margin-top: 10px;
      font-size: 14px;
      color: #ff5500;
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
      display: block;
      margin-top: 10px;
      font-size: 14px;
      color: #ff5500;
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
  &_trailer {
    display: flex;
    flex-direction: column;
    &Skeleton {
      width: 100%;
      height: 170px;
    }
    &Desc {
      font-size: 16px;
      // font-weight: bold;
      color: black;
    }
    &Date {
      font-size: 12px;
      color: gray;
    }
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
</style>
