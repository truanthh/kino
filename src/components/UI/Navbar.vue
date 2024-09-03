<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Icon as IconifyIcon } from "@iconify/vue";
import SearchInput from "./SearchInput.vue";
import ProfileDropdown from "@/components/UI/ProfileDropdown.vue";

const authStore = useAuthStore();

const isShowedAvatarDropdown = ref(false);

const { userInfo } = storeToRefs(authStore);

// so storeToRefs is just the convenient way of doing that, ok
// const email = computed(() => authStore.userInfo.email);
// const token = computed(() => authStore.userInfo.token);

defineOptions({
  name: "Navbar",
});

const debug = () => {
  console.log(userInfo);
};

const props = defineProps({
  logout: {
    type: Function,
    required: true,
  },
});

// const clickAvatar = () => {
//   isShowedAvatarDropdown.value = !isShowedAvatarDropdown.value;
// };

const showDropdown = () => {
  isShowedAvatarDropdown.value = true;
};

const hideDropdown = () => {
  isShowedAvatarDropdown.value = false;
};
</script>

<template>
  <ProfileDropdown
    :enabled="isShowedAvatarDropdown"
    :logout
    :email="userInfo.userProfileData.email"
    @mouseover="showDropdown"
    @mouseleave="hideDropdown"
  />
  <div class="navbar">
    <router-link to="/home" class="navbar__content">
      <b>Главная</b>
    </router-link>
    <router-link to="/films" class="navbar__content"> Top250 </router-link>
    <router-link to="/videoplayer" class="navbar__content">
      VideoPlayer
    </router-link>

    <SearchInput />

    <div
      class="navbar__content"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <router-link to="/signin" v-if="!userInfo.token" class="navbar__content">
        <b>Войти</b>
      </router-link>
      <IconifyIcon
        icon="ic:sharp-bookmark"
        class="iconbookmark"
        :style="{ fontSize: '24px' }"
        v-if="userInfo.token"
      />
      <img
        v-if="userInfo.token"
        :src="userInfo.userProfileData.photoUrl"
        class="avatar"
      />
      <router-link to="/signup" v-if="!userInfo.token" class="navbar__content"
        >Регистрация</router-link
      >
      <!-- <span @click="debug" class="debug"> debug </span> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  padding: 0 80px;
  z-index: 2000;
  display: grid;
  grid-template-columns: auto auto auto 1fr auto;
  position: fixed;
  top: 0;
  left: 0;
  height: 72px;
  width: 100%;
  // box-sizing: border-box;
  background-color: #141414;
  gap: 80px;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    color: #a1a1a1;
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
