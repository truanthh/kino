<script setup>
import { Icon as IconifyIcon } from "@iconify/vue";

const props = defineProps({
  displayId: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="imageSkeleton__container">
    <div class="imageSkeleton_idText" v-if="displayId">
      <h2>{{ id }}</h2>
    </div>
    <div class="imageSkeleton__iconContainer">
      <IconifyIcon
        icon="clarity:picture-line"
        class="imageSkeleton__icon"
        height="none"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.imageSkeleton {
  &__container {
    width: 100%;
    height: 100%;
    border: solid 2px #cccccc;
    border-radius: 6px;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__iconContainer {
    width: 40%;
    aspect-ratio: 1 / 1;
  }
  &__icon {
    width: 100%;
    height: 100%;
    color: #cccccc;
  }
  &__idText {
  }
}
</style>
