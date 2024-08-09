<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axios from "axios";

const authStore = useAuthStore();

const movies = ref([]);

async function getAllMovies() {
  try {
    let response = await axios.get(
      `http://${DB_SERVER_ADDRESS}/films`,
    );
    movies.value = response.data;
  } catch (error) {
  } finally {
  }
}

onMounted(async () => {
  await getAllMovies();
});
</script>

<template>
  <div v-for="movie in movies">
    {{ movie.title }}
  </div>
</template>

<style scoped></style>
