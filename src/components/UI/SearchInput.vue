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
  flex: 1;
  padding: 2px 2px 2px 2px;
  /* background-color: orange; */
}

.search-container input {
  padding: 10px 10px 10px 40px;
  width: 100%;
  border-radius: 5px;
  border: none;
  background-color: #f1f2f3;
  height: 2rem;
  width: 100%;
  max-width: 400px;
  overflow: auto;
}

.search-container svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translatey(-50%);
  color: #aaa;
  width: 20px;
  height: 20px;
}

.search-container :focus {
  outline: none;
  background-color: white;
  box-shadow:
    1px 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
}
@media (max-width: 600px) {
  .search-containter {
    min-width: 100px;
  }
}
</style>
