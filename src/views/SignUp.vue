<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const data = ref("");
const email = ref("");
const password = ref("");

function debug() {
  // console.log(authStore.responseData);
}

async function signUp() {
  const payload = { email: email.value, password: password.value };

  await authStore.auth(payload, "signUp");

  router.push("/movies");
}
</script>

<template>
  <div class="signup__form">
    <div class="myheader">
      <h2>Регистрация</h2>
    </div>
    <input
      class="myinput"
      type="email"
      v-model="email"
      placeholder="Эл. почта"
    />
    <input
      class="myinput"
      type="password"
      v-model="password"
      placeholder="Пароль"
    />
    <button class="mybutton" @click="signUp">Зарегистрироваться</button>
  </div>
</template>

<style scoped>
.myinput {
  width: 20rem;
  height: 2rem;
  border-radius: 4px;
}
.mybutton {
  width: 20rem;
  height: 2rem;
  border-radius: 4px;
}
.myheader {
  text-align: center;
}
.signup__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
  gap: 1rem;
  /* background-color: orange; */
}
</style>
