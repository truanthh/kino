<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axiosApiInstance from "@/api";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import BaseTable from "@/components/UI/Table/BaseTable.vue";
import TableRow from "@/components/UI/Table/TableRow.vue";
import TableColumn from "@/components/UI/Table/TableColumn.vue";

const authStore = useAuthStore();

const movies = ref([]);

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

async function getAllMovies() {
  try {
    let response = await axiosApiInstance.get(
      `http://192.168.1.119:3000/movies`,
    );
    movies.value = response.data;
  } catch (error) {
  } finally {
  }
}

function setSort() {
  console.log("sorting...");
}

onMounted(async () => {
  await getAllMovies();
});
</script>

<template>
  <base-table :headers :columnsTemplate @headerClick="setSort">
    <table-row
      v-for="movie in movies"
      :key="movie.id"
      :columnsTemplate
      @click="$router.push({ name: 'film', params: { id: movie.id } })"
      class="table_row"
    >
      <table-column>
        {{ movie.id }}
      </table-column>
      <table-column>
        {{ movie.prod_year }}
      </table-column>
      <table-column>
        {{ movie.title }}
      </table-column>
      <table-column>
        {{ movie.country }}
      </table-column>
      <table-column> </table-column>
      <table-column image :srcImage="movie.poster_url" />
    </table-row>
  </base-table>
</template>

<style lang="scss" scoped>
.table_row {
  cursor: pointer;
}
</style>
