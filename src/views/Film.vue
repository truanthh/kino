<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const route = useRoute();

const film = ref({});
const editFilm = ref(false);

const titleField = ref("");
const prodyearField = ref("");
const directorField = ref("");
const countryField = ref("");

async function getFilmById(id) {
  // console.log(`trying to get film ${id}`);
  try {
    let response = await axiosApiInstance.get(
      `http://192.168.1.119:3000/movies/${id}`,
    );
    // console.log(response.data);
    film.value = response.data;
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

  await updateMovieInfo(route.params.id, formData);
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
        `http://192.168.1.119:3000/movies/${id}/poster`,
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

async function updateMovieInfo(id, formData) {
  try {
    let response = await axiosApiInstance.put(
      `http://192.168.1.119:3000/movies/${id}`,
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
          {{ film.director }}
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
        <span class="film_misc_actors_actor">Кевин Костнер</span>
        <span class="film_misc_actors_actor">Майло Вентимилья</span>
        <span class="film_misc_actors_actor">Аманда Сайфред</span>
        <span class="film_misc_actors_actor">Кэти Бейкер</span>
        <span class="film_misc_actors_actor">Мартин Донован</span>
        <span class="film_misc_actors_actor">Гэри Коул</span>
        <span class="film_misc_actors_actor">МакКинли Белчер III</span>
        <span class="film_misc_actors_actor">Джеки Миннс</span>
        <span class="film_misc_actors_actor">Маркус Хондро</span>
        <span class="film_misc_actors_actor">Йен Лэйк</span>
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
  &_titleAbout {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    margin-top: 6rem;
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
