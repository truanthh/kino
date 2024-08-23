<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
</script>

<template>
  <div class="image_skeleton">
    <IconifyIcon icon="clarity:picture-line" class="image_skeleton__icon" />
  </div>
</template>

<style lang="scss" scoped>
.image_skeleton {
  position: relative;
  border: solid 2px #cccccc;
  border-radius: 6px;
  background-color: #f2f2f2;
  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    font-size: 200px;
    color: #cccccc;
  }
}
</style>
