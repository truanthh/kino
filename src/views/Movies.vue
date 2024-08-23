<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import axiosApiInstance from "@/api";
import ImageSkeleton from "@/components/UI/skeletons/ImageSkeleton.vue";

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
  <!-- <div v-for="movie in movies"> -->
  <!--   {{ movie.name }} -->
  <!-- </div> -->

  <div class="card" v-for="movie of movies" :key="movie.name">
    <image-skeleton />
    <div class="card__movieinfo">
      <div class="card__movieinfo-title">{{ movie.title }}</div>
      <div class="card__movieinfo-about">
        <div class="card__movieinfo-about__key">Год производства:</div>
        <div class="card__movieinfo-about__value">
          {{ movie.prod_year }}
        </div>
        <div class="card__movieinfo-about__key">Режиссер:</div>
        <div class="card__movieinfo-about__value">
          {{ movie.director }}
        </div>
        <div class="card__movieinfo-about__key">Страна:</div>
        <div class="card__movieinfo-about__value">
          {{ movie.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 20px auto;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 50% auto;
  width: 1000px;
  height: 800px;
  // background-color: #f2f2f2;
  border: solid 2px gray;
  border-radius: 10px;
  &_media {
    position: relative;
    height: 35%;
    &_pic {
      // margin: 10px 10px;
      border: solid 2px black;
      border-radius: 6px;
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }
  &__movieinfo {
    padding-left: 30px;
    font-weight: bold;
    &-title {
      // background-color: orange;
      // text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 2rem 0;
      padding-left: 2rem;
    }
    &-about {
      display: grid;
      grid-template-columns: 30% 70%;
      &__key {
        color: gray;
      }
      &__value {
      }
    }
  }
}
</style>
