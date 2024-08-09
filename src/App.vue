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

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}
main {
  /* flex: 1; */
  height: calc(100% - 3rem);
  overflow-y: auto;
}

#app {
  height: 100%;
  width: 100%;
  /* display: flex; */
  /* flex-direction: column; */
}

* {
  box-sizing: border-box;
  /* margin: 0; */
  /* padding: 0; */
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>
