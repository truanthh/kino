<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axiosApiInstance from "@/api";

const authStore = useAuthStore();

const movies = ref([]);

async function getAllMovies() {
  try {
    let response = await axiosApiInstance.get(
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
