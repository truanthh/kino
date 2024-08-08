<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axios from "axios";

const movies = ref([]);

async function getMovies() {
  try {
    const response = await axios.get(
      "https://kino-fd2df-default-rtdb.europe-west1.firebasedatabase.app/",
    );
    movies.value = response.data;
  } catch (error) {
  } finally {
    console.log(response.data);
  }
}

onMounted(async () => {
  await getAllCars();
});
</script>

<template>
  <div>
    {{ movies }}
  </div>
</template>

<style scoped></style>
