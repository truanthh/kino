<script setup>
import { onMounted, ref } from "vue";

defineOptions({
  name: "Navbar",
});
</script>

<template>
  <div class="navbar">
    <div class="navbar__content">
      <router-link to="/home"> <b>Главная</b> </router-link>
      &nbsp; &nbsp; &nbsp;
      <router-link to="/movies"> Movies </router-link>
    </div>
    <div class="navbar__content">
      <input type="text" class="searchbar" placeholder="Поиск фильмов..." />
    </div>
    <div class="navbar__content">
      <router-link to="/signin"> <b>Войти</b> </router-link>
      &nbsp; &nbsp; &nbsp;
      <router-link to="/signup">Регистрация</router-link>
    </div>
  </div>
</template>

<style scoped>
.navbar__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar {
  height: 2.5rem;
  width: 20rem;
  border: 2px solid #d1d1d1;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  background-color: #f1f3f4;
}
.searchbar:focus {
  outline: none;
  background-color: white;
}
.navbar {
  z-index: 2000;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  position: sticky;
  top: 0;
  height: 3rem;
  width: 100%;
  /* justify-items: center; */
  box-sizing: border-box;
  background-color: #f7f7f7;
  border-bottom: solid 2px gray;
}

.login {
}
</style>
