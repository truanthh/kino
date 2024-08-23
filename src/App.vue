<script setup>
import { ref, computed, toRef } from "vue";
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

checkUser();

const logout = () => {
  authStore.logout();
  localStorage.removeItem("userTokens");
};

if (!authStore.userInfo.email) {
  authStore.getUserProfileData();
}
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
}

.navbar {
  z-index: 2000;
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  grid-template-rows: minmax(1rem, 3rem);
  // position: sticky;
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
.userinfo {
  margin: auto 20px;
  // background-color: orange;
}
</style>
