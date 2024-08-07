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
    <div class="grid__item__header"><h1>THIS IS HOMEPAGE</h1></div>
    <div class="grid__item__input">
      <h2>Sign in</h2>
      <input class="myinput" />
    </div>
    <div class="grid__item__content">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi esse
      dolores nihil adipisci. Provident nisi veritatis rerum, ipsum a tempore
      minima nesciunt saepe eveniet quis voluptates. Quas, pariatur repellat
      nostrum, commodi modi ut doloribus recusandae quos ducimus quod eius quo
      corporis exercitationem dicta quam aperiam voluptates incidunt similique
      sint eveniet ab eum! Recusandae voluptatum quo illum nisi facere sed
      aperiam nobis labore culpa pariatur? Assumenda, libero voluptatum
      voluptatibus et praesentium tempora numquam voluptas, maxime, culpa
      necessitatibus accusantium commodi sint! Ad doloribus quaerat similique
      sint, totam aperiam recusandae vero sequi vel deleniti fugit facere
      dolorem veniam dolore. Velit delectus culpa repellat, labore atque laborum
      nam expedita aut sint vero necessitatibus, molestias fuga esse asperiores,
      minima incidunt temporibus dolore accusamus non in! Enim quo, iusto ipsam
      in perferendis sit voluptates alias quis? Deleniti laboriosam deserunt
      velit officia libero dolorem possimus recusandae minus facere iusto fugiat
      quod mollitia porro, odit ut modi quasi non aliquam! Ratione molestias vel
      hic autem, iste asperiores non esse doloremque eius error ad illum
      doloribus veniam ipsa, tempora molestiae, recusandae maiores culpa eveniet
      aut voluptates. Est amet sapiente voluptatum saepe rem at voluptatem
      beatae quisquam sint earum eum, consequatur accusantium porro provident
      laudantium expedita quibusdam excepturi nesciunt tempora?
    </div>
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
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  padding: 20px;
}
.grid__item {
  border: 1px solid gray;
}
.grid__item__content {
  border: 1px solid gray;
  grid-area: content;
  padding: 20px;
}
.grid__item__header {
  border: 1px solid gray;
  grid-area: header;
  text-align: center;
}
.grid__item__input {
  grid-column-start: 1;
  align-self: start;
  grid-column-end: 4;
  justify-self: center;
  text-align: center;
  grid-area: sidebar;
}
</style>
