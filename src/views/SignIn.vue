<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const data = ref("");
const email = ref("");
const password = ref("");

function debug() {
  console.log(authStore.responseData);
}

async function signUp() {
  const payload = { email: email.value, password: password.value };

  await authStore.signUp(payload);
}
</script>

<template>
  <div class="grid__container">
    <div class="grid__item__header">
      <h1>THIS IS LOGIN PAGE</h1>
      <!-- <h2 @click="$router.push('/home')">Home</h2> -->
      <h2 @click="$router.push('/signup')">Sign Up</h2>
      <!-- <button class="debug" @click="debug">DEBUG</button> -->
    </div>
    <div class="grid__item__input">
      <h2>Sign in</h2>
      <input
        class="myinput"
        type="email"
        v-model="email"
        placeholder="E-mail"
      />
      <input
        class="myinput"
        type="password"
        v-model="password"
        placeholder="Password"
      />
      <button class="mybutton" @click="signUp">Sign up</button>
    </div>
    <div class="grid__item__content">
      {{ authStore.responseData || authStore.error }}
    </div>
  </div>
</template>

<style scoped>
.debug {
  border: solid 2px gray;
  height: 2rem;
  cursor: pointer;
  display: inline;
}
.mybutton {
  border: solid 2px gray;
  height: 2rem;
  cursor: pointer;
}
.myinput {
  min-width: 0;
  width: 15rem;
  height: 2.5rem;
  font-size: 20px;
  padding: 0px 8px 0px 8px;
}
.grid__container {
  width: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  padding: 20px;
}
.grid__item {
  border: 1px solid gray;
}
.grid__item__content {
  font-size: 1.2rem;
  border: 1px solid gray;
  grid-area: content;
  padding: 20px;
  overflow-wrap: break-word;
  overflow: auto;
}
.grid__item__header {
  border: 1px solid gray;
  grid-area: header;
  text-align: center;
}
.grid__item__input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-column-start: 1;
  align-self: start;
  grid-column-end: 4;
  justify-self: center;
  text-align: center;
  grid-area: sidebar;
}
</style>
