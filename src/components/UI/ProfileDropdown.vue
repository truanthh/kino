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
  photoUrl: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="['dropdown', { dropdown_enabled: enabled }]">
    <div class="line_navbar">
      <img :src="photoUrl" class="line_navbar_avatar" />
    </div>
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

<style lang="scss" scoped>
.dropdown {
  display: none;
  position: fixed;
  /* margin-top: calc(72px + 2px); */
  margin-right: 40px;
  height: 600px;
  width: 300px;
  /* background-color: #121212; */
  background-color: #171717;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  top: 0;
  right: 20px;
  transition:
    visbility 0ms,
    opacity 0.1s ease-in;
  &_enabled {
    display: flex;
    z-index: 3000;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.line {
  max-height: 10px;
  margin: auto;
  color: #d9d9d9;
  &_navbar {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 72px;
    &_avatar {
      margin-right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 48px;
      cursor: pointer;
    }
  }
}
</style>
