<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Icon as IconifyIcon } from "@iconify/vue";
import SearchInput from "./SearchInput.vue";
import ProfileDropdown from "@/components/UI/ProfileDropdown.vue";

const isShownUserProfileDropdown = ref(false);

const authStore = useAuthStore();
const userInfo = authStore.userInfo;

// so storeToRefs is just the convenient way of doing that, ok
// const email = computed(() => authStore.userInfo.email);
// const token = computed(() => authstore.userinfo.token);

defineOptions({
  name: "Navbar",
});

const props = defineProps({
  logout: {
    type: Function,
    required: true,
  },
});

// const clickAvatar = () => {
//   isShownUserProfileDropdown.value = !isShownUserProfileDropdown.value;
// };

const showDropdown = () => {
  isShownUserProfileDropdown.value = true;
};

const hideDropdown = () => {
  isShownUserProfileDropdown.value = false;
};

// console.log(userInfo.token);
</script>

<template>
  <ProfileDropdown
    :enabled="isShownUserProfileDropdown"
    :logout
    :email="userInfo.userProfileData.email"
    :photoUrl="userInfo.userProfileData.photoUrl"
    @mouseover="showDropdown"
    @mouseleave="hideDropdown"
  />
  <div class="navbar__container">
    <div class="debug">{{ authStore.isAuth }}</div>

    <!-- 1 -->
    <router-link to="/home" class="navbar__el">
      <b>Главная</b>
    </router-link>

    <!-- 2 -->
    <router-link to="/films" class="navbar__el"> Top250 </router-link>

    <!-- 3 -->
    <SearchInput class="navbar__el" />

    <!-- 4 -->
    <router-link to="/signin" v-if="!authStore.isAuth" class="navbar__el">
      <b>Войти</b>
    </router-link>

    <!-- 5 -->
    <router-link to="/signup" v-if="!authStore.isAuth" class="navbar__el"
      >Регистрация</router-link
    >

    <!-- 6 -->
    <div class="navbar__el" v-if="authStore.isAuth">
      <IconifyIcon
        icon="ic:sharp-bookmark"
        class="iconbookmark"
        :style="{ fontSize: '24px' }"
      />
    </div>

    <!-- 7 -->
    <div
      class="navbar__el"
      v-if="authStore.isAuth"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <img :src="authStore.userProfileAvatarUrl" class="avatar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.debug {
  position: absolute;
  top: 0;
  left: 1000px;
  color: white;
}
.navbar {
  &__container {
    padding: 0 80px;
    z-index: 2000;
    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    position: fixed;
    top: 0;
    left: 0;
    height: 72px;
    width: 100%;
    background-color: #141414;
    gap: 80px;
  }
  &__el {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    color: #a1a1a1;
    // background-color: orange;
  }
}
.debug {
  cursor: pointer;
}
.userinfo {
  margin-right: 40px;
  color: #a1a1a1;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  cursor: pointer;
}
.iconbookmark {
  margin-right: 20px;
}
</style>
