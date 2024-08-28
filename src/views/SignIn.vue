<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const router = useRouter();
const authStore = useAuthStore();

const data = ref("");
const email = ref("");
const password = ref("");

function debug() {
  console.log(auth.currentUser);
}

async function signIn() {
  const payload = { email: email.value, password: password.value };

  await authStore.auth(payload, "signIn");
  // router.go(0);
  // window.location.reload();
  // router.push("/movies");
}
</script>

<template>
  <div class="login__form">
    <div class="myheader">
      <h2>Войти</h2>
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
    <button class="mybutton" @click="signIn">Войти</button>
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
.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
  gap: 1rem;
  /* background-color: orange; */
}
</style>
