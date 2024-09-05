<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

const rating = ref(0);
</script>

<template>
  <div class="ratingBar">
    <div class="ratingBar_slot">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="35px"
        height="35px"
        viewBox="0 0 32 32"
      >
        <defs>
          <linearGradient id="grad">
            <stop offset="62%" stop-color="#ff5500" />
            <stop offset="38%" stop-color="#cccccc" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
        />
      </svg>
    </div>
    <div class="ratingBar_slot">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="35px"
        height="35px"
        viewBox="0 0 32 32"
      >
        <defs>
          <linearGradient id="grad">
            <stop offset="62%" stop-color="#ff5500" />
            <stop offset="38%" stop-color="#cccccc" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ratingBar {
  display: flex;
  gap: 5px;
  &_slot {
    display: flex;
    flex-direction: column;
    &_icon {
      font-size: 35px;
      color: #cccccc;
    }
    &_numberText {
      color: #cccccc;
      margin: auto;
    }
  }
}
</style>
