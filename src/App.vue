<script setup>
import { ref, computed, toRef, onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import router from "./router";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem("userTokens"));
  if (tokens) {
    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
  }
};

checkUser();

const logout = () => {
  authStore.logout();
  localStorage.removeItem("userTokens");
};

onMounted(async () => {
  try {
    await authStore.getUserProfileData();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <navbar :logout />

  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "./styles/global.scss";

#app {
  height: 100%;
}
</style>
