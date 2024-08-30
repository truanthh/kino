<script setup>
import { ref } from "vue";

const props = defineProps({
  enabled: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    default: "",
  },
  logout: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div :class="['wrapper', { enabled: enabled }]">
    <div class="line">
      <b>{{ email }} </b>
    </div>
    <router-link to="/settings/userprofile" class="line">
      <b> Мой профиль </b>
    </router-link>
    <router-link to="/signin" @click.prevent="logout" class="line">
      <b>Выйти</b>
    </router-link>
  </div>
</template>

<style scoped>
.wrapper {
  display: none;
  position: absolute;
  /* margin-top: calc(72px + 2px); */
  /* margin-right: 2px; */
  height: 600px;
  width: 400px;
  background-color: #121212;
  border-radius: 10px;
  top: 0;
  right: 20px;
}

.enabled {
  display: flex;
  z-index: 2000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.line {
  max-height: 10px;
  margin: auto;
  color: #d9d9d9;
}
</style>
