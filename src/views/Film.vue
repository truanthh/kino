<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

const route = useRoute();

const film = ref({});

const titleField = ref("");
const prodyearField = ref("");
const directorField = ref("");
const countryField = ref("");

async function getFilmById(id) {
  console.log(`trying to get film ${id}`);
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

const submitForm = () => {
  const formData = {
    title: titleField.value,
    prod_year: prodyearField.value,
    country: countryField.value,
    director: directorField.value,
  };
  console.log(formData);
};
</script>

<template>
  <div class="wrapper">
    <img :src="film.poster_url" class="film_poster" />
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
        <Button label="Принять изменения" class="btn_edit" />
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
.film_poster {
  width: 300px;
  height: 400px;
}
.btn_edit {
  max-width: 200px;
}
</style>
