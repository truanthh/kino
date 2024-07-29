<script setup>
import { ref } from "vue";

const data = ref("heyyo");

// function debounce(func, delay) {
//   let timeoutID;
//
//   return function (...args) {
//     if (timeoutID) {
//       clearTimeout(timeoutID);
//     }
//
//     timeoutID = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }
</script>

<template>
  <div>
    <input class="myinput" v-model="data" />
    <h1>{{ data }}</h1>
  </div>
</template>

<style scoped>
.myinput {
  width: 200px;
  height: 40px;
  font-size: 20px;
  padding: 0px 8px 0px 8px;
}
</style>
