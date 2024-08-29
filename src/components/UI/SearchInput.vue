<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

const inputIsFocused = ref(false);

function inputFocusTrue(){
  inputIsFocused.value = true;
}

function inputFocusFalse(){
  inputIsFocused.value = false;
}

const searchQuery = ref("");
</script>

<template>
  <div class="search-container">
    <IconifyIcon
      icon="carbon:settings-adjust"
      :class="['search-container_iconsettings', {'input-is-focused': inputIsFocused}]"
    />
    <IconifyIcon
      icon="mingcute:search-line"
      :class="['search-container_iconsearchlens', {'input-is-focused': inputIsFocused}]"
    />
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Фильмы, сериалы, персоны..."
      class="search-container-input"
      @focusin="inputFocusTrue"
      @focusout="inputFocusFalse"
    ></input>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 2px 2px 2px;
  width: 100%;
  max-width: 390px;
  &-input {
    padding: 10px 10px 10px 12px;
    color: #f2f2f2;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    background-color: #373737;
    height: 2.1rem;
    overflow: auto;
    font-family: Tahoma, Arial, Verdana, sans-serif;
    width: 100%;
    min-width: 324px;
    max-width: 390px;
    &:focus {
      outline: none;
      background-color: #f2f2f2;
      color: #595959;
      box-shadow:
        1px 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }
  }
  &_iconsettings {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translatey(-50%);
    color: #b3b3b3;
    width: 20px;
    height: 20px;
  }
  &_iconsearchlens {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translatey(-50%);
    color: #b3b3b3;
    width: 19px;
    height: 19px;
  }
}

.input-is-focused {
  color: #666666;
}
</style>
