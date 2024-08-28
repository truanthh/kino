<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import SearchInput from "./SearchInput.vue";

const authStore = useAuthStore();

const { userInfo } = storeToRefs(authStore);

// so storeToRefs is just the convenient way of doing that, ok
// const email = computed(() => authStore.userInfo.email);
// const token = computed(() => authStore.userInfo.token);

defineOptions({
  name: "Navbar",
});

const debug = () => {
  console.log(userInfo);
};

const props = defineProps({
  logout: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="navbar">
    <div class="navbar__content">
      <router-link to="/home"> <b>Главная</b> </router-link>
      <router-link to="/movies"> Movies </router-link>
    </div>
    <div class="navbar__content">
      <!-- <Icon icon="ph:magnifying-glass" style="color: black" /> -->
      <!-- <input type="text" class="searchbar" placeholder="Поиск фильмов..." /> -->
      <SearchInput />
    </div>
    <div class="navbar__content">
      <router-link to="/signin" v-if="!userInfo.token">
        <b>Войти</b>
      </router-link>
      <router-link
        to="/settings/userprofile"
        v-if="userInfo.token"
        class="userinfo"
      >
        <b> Мой профиль </b>
      </router-link>
      <div v-if="userInfo.token" class="userinfo">
        <b>{{ userInfo.userProfileData.email || "" }} </b>
      </div>
      <router-link to="/signin" v-if="userInfo.token" @click.prevent="logout">
        <b>Выйти</b>
      </router-link>
      <router-link to="/signup" v-if="!userInfo.token">Регистрация</router-link>
      <!-- <span @click="debug" class="debug"> debug </span> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  z-index: 2000;
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  grid-template-rows: minmax(1rem, 3rem);
  position: sticky;
  top: 0;
  height: 3rem;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  box-shadow:
    1px 0.5px 0 rgba(60, 64, 67, 0.3),
    0 1px 6px 2px rgba(60, 64, 67, 0.15);
}
.navbar__content {
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  /* background-color: orange; */
}
.debug {
  cursor: pointer;
}
.userinfo {
  margin-right: 40px;
}
</style>
