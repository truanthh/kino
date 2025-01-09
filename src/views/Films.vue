<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axiosApiInstance from "@/api";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import BaseTable from "@/components/UI/Table/BaseTable.vue";
import TableRow from "@/components/UI/Table/TableRow.vue";
import TableColumn from "@/components/UI/Table/TableColumn.vue";

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;
const authStore = useAuthStore();

const films = ref([]);

const headers = ["ID", "prod_year", "title", "country", "", "poster_url"];
const columnsTemplate = "50px 80px 340px 200px 50px 100px";

// async function getAllMovies() {
//   try {
//     let response = await axiosApiInstance.get(
//       `http://${DB_SERVER_ADDRESS}/films`,
//     );
//     movies.value = response.data;
//   } catch (error) {
//   } finally {
//   }
// }

async function getAllFilms() {
  try {
    let response = await axiosApiInstance.get(
      `http://${DB_SERVER_ADDRESS}/films`,
    );
    films.value = response.data;
  } catch (error) {
  } finally {
  }
}

function setSort() {
  console.log("sorting...");
}

onMounted(async () => {
  await getAllFilms();
});
</script>

<template>
  <base-table :headers :columnsTemplate @headerClick="setSort">
    <table-row
      v-for="film in films"
      :key="film.id"
      :columnsTemplate
      @click="$router.push({ name: 'film', params: { id: film.id } })"
      class="table_row"
    >
      <table-column>
        {{ film.id }}
      </table-column>
      <table-column>
        {{ film.prod_year }}
      </table-column>
      <table-column>
        {{ film.title }}
      </table-column>
      <table-column>
        {{ film.country }}
      </table-column>
      <table-column> </table-column>
      <table-column image :srcImage="film.poster_url" />
    </table-row>
  </base-table>
</template>

<style lang="scss" scoped>
.table_row {
  cursor: pointer;
}
</style>
