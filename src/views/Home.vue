<script setup>
import { ref, onMounted } from "vue";
const data = ref("");

function onInput(event) {
  data.value = event.target.value;
  console.log(data.value);
}

const updateText = debounce((event) => onInput(event));

function debounce(func, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
</script>

<template>
  <!-- <button class="mybutton" @click="processChange">add boom</button> -->
  <div class="grid__container">
    <!-- <div class="grid__item">item1</div> -->
    <div class="grid__item"><h1>THIS IS HOMEPAGE</h1></div>
    <div class="grid__item">
      <input
        class="myinput"
        :value="data"
        @input="(event) => updateText(event)"
      />
    </div>
    <div class="grid__item">item3</div>
    <div class="grid__item">item4</div>
    <div class="grid__item">item5</div>
    <div class="grid__item">item6</div>
  </div>
</template>

<style scoped>
.mybutton {
  border: solid 2px gray;
  margin-bottom: 20px;
}
.myinput {
  min-width: 0;
  width: 10rem;
  height: 2.5rem;
  font-size: 20px;
  padding: 0px 8px 0px 8px;
}
.grid__container {
  width: 100%;
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: 150px 150px 150px;
  grid-auto-rows: minmax(50px, auto);
  column-gap: 20px;
  justify-content: start;
  /* background-color: orange; */
}
.grid__item {
  border: 1px solid gray;
  width: 50%;
  /* width: 10rem; */
  /* box-sizing: border-box; */
  /* justify-content: end; */
  /* align-items: center; */
}
</style>
