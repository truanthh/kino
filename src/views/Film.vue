<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";

const route = useRoute();

const film = ref({});

// const props = defineProps({
//   id: {
//     type: String,
//     required: true,
//   },
// });

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
</script>

<template>
  <div class="wrapper">
    {{ film }}
    <img :src="film.poster_url" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 600px;
  height: 800px;
  background-color: orange;
  margin: 40px auto;
}
</style>
