<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

const searchQuery = ref("");
</script>

<template>
  <div class="search-container">
    <IconifyIcon icon="ic:baseline-search" />
    <input type="text" v-model="searchQuery" placeholder="Поиск..." />
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
}

.search-container input {
  padding: 10px 10px 10px 40px; /* Отступы, слева больше для иконки */
  width: 100%; /* Полное приложение */
  border-radius: 5px; /* Закругления углов */
  border: none;
  background-color: #f1f2f3;
  height: 2rem;
  width: 20rem;
}

.search-container svg {
  position: absolute; /* Позиционируем иконку */
  left: 10px; /* Отступ от левого края */
  top: 50%; /* Вертикальное выравнивание по центру */
  transform: translateY(-50%); /* Центрируем по вертикали */
  color: #aaa; /* Цвет иконки */
  width: 20px; /* Ширина иконки */
  height: 20px; /* Высота иконки */
}

.search-container :focus {
  outline: none;
  background-color: white;
  box-shadow:
    1px 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
}
</style>
