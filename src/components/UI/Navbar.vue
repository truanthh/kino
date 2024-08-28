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
    <router-link to="/home" class="navbar__content">
      <b>Главная</b>
    </router-link>
    <router-link to="/movies" class="navbar__content"> Movies </router-link>
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
        <b>{{ userInfo.userProfileData.email }} </b>
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
  padding: 0 200px;
  z-index: 2000;
  // display: grid;
  // grid-template-columns: 1fr 0.5fr 1fr;
  // grid-template-rows: minmax(1rem, 3rem);
  display: flex;
  justify-content: space-between;
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.debug {
  cursor: pointer;
}
.userinfo {
  margin-right: 40px;
}
</style>
