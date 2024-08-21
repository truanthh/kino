<script setup>
import { useAuthStore } from "./stores/auth";
import router from "./router";

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem("userTokens"));
  if (tokens) {
    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
  }
};

const logout = () => {
  authStore.logout();
  localStorage.removeItem("userTokens");
};

checkUser();
</script>

<template>
  <navbar v-bind:logout="logout" />

  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "./styles/global.scss";

#app {
  height: 100%;
  width: 100%;
  /* display: flex; */
  /* flex-direction: column; */
}
</style>
