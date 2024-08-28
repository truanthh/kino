<script setup>
import { ref, toRef } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

function debug() {
  console.log(userInfo.userProfileData.value);
}

const lastLoginDate = toRef(() => new Date(Number(userInfo.value.userProfileData.lastLoginAt)).toLocaleString('ru-RU', timeDateOptions));

const timeDateOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit', 
  minute: '2-digit',
  hour12: false // Для формата 24 часа
};

const picUrl = ref('');

const handleSubmit = async () =>{
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
      <input type="text" :placeholder="userInfo.userProfileData.email" disabled></input>
    </div>
    <div class="item">
      <h2 class="heading-2">last login:</h2>
      <h2 class="heading-2">
        {{ lastLoginDate }}
      </h2>
    </div>
    <div class="item">
      <h2 class="heading-2">password hash:</h2>
      <h2 class="heading-2">
        {{ userInfo.userProfileData.passwordHash }}
      </h2>
    </div>
    <div class="item">
      <h2 class="heading-2"> profile avatar:</h2>
      <img :src="userInfo.userProfileData.photoUrl" class="avatar"></img>
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
