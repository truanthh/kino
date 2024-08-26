<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const route = useRoute();

const film = ref({});

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
    console.log(response.data);
    film.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log(film.value);
  }
}

onMounted(async () => {
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
</script>

<template>
  <div class="wrapper">
    <div class="film_media">
      <img
        :src="film.poster_url"
        class="film_media_poster"
        v-if="film.poster_url"
      />
      <ImageSkeleton v-if="!film.poster_url" class="film_media_poster" />
      <div v-if="imageUrl">{{ imageUrl }}</div>
      <input type="file" @change="onFileChange" accept="image/*" />
      <Button
        label="Обновить постер"
        class="btn_edit"
        @click="updatePoster(route.params.id)"
      />
    </div>
    <div class="film_about">
      <form @submit.prevent="submitForm">
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
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1000px;
  height: 800px;
  background-color: orange;
  margin: 40px auto;
}
.film_about {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
.film_media {
  display: flex;
  flex-direction: column;
  gap: 40px;
  &_poster {
    width: 300px;
    height: 400px;
  }
}
.btn_edit {
  max-width: 200px;
}
</style>
