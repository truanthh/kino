<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const userData = ref({});

// userData.value = { ...authStore.userInfo.userProfileData };

watch(
  () => authStore.userInfo.userProfileData,
  (newProfileData) => {
    userData.value = { ...newProfileData };
    userData.value.lastLoginAt = new Date(
      Number(newProfileData.lastLoginAt),
    ).toLocaleString();
  },
  { immediate: true, deep: true },
);

function debug() {
  console.log(userData.value);
}

const picUrl = ref('');

const handleSubmit = async () =>{
  // alert(`your new pic url is ${picUrl.value}!`)
  const payload = { photoUrl: picUrl.value };

  await authStore.updateUserProfile(payload);
}
</script>

<template>
  <div class="wrapper">
    <h1>YOUR PROFILE</h1>
    <!-- <div v-for="item in authStore.userInfo.userProfileData">{{ item }}</div> -->
    <!-- <button @click="debug">debug</button> -->

    <div class="item">
      <h2 class="heading-2">email:</h2>
      <input type="text" :placeholder="userData.email" disabled></input>
    </div>
    <div class="item">
      <h2 class="heading-2">last login:</h2>
      <h2 class="heading-2">
        {{ userData.lastLoginAt }}
      </h2>
    </div>
    <div class="item">
      <h2 class="heading-2">password hash:</h2>
      <h2 class="heading-2">
        {{ userData.passwordHash }}
      </h2>
    </div>
    <div class="item">
      <h2 class="heading-2"> profile avatar:</h2>
      <img :src="userData.photoUrl" class="avatar"></img>
    </div>
    <form>
      <h2 class="heading-2">Enter new profile picture url:</h2>
      <input type="text" v-model="picUrl"> </input>
      <button @click.prevent="handleSubmit"> Submit picture </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.avatar{
  height: 200px;
  width: 200px;
}
input{
  font-weight: bold;
  font-size: 20px;
  padding: 0 10px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: solid 2px gray;
  width: fit-content;
  overflow: hidden;
  background-color: orange;
  margin: 20px auto;
}
.heading-2 {
  font-weight: bold;
}
.item {
  display: flex;
  gap: 20px;
}
</style>
