<script setup>
import { ref, onMounted } from "vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  items: {
    Type: Array,
    default: [],
  },
});

const itemsShown = ref([]);
const showButtonMore = ref(true);

let amount = 3;
let stepSize = 5;

function getItems() {
  itemsShown.value = props.items.slice(0, amount);
}

getItems();

function loadMoreItems() {
  let l = props.items.length;

  amount += stepSize;

  while (amount > l) {
    amount--;
  }

  itemsShown.value = props.items.slice(0, amount);

  if (itemsShown.value.length === l) {
    showButtonMore.value = false;
  }
}
</script>

<template>
  <ul class="list">
    <li class="list__item" v-for="(item, id) of itemsShown" :key="id">
      {{ item }}
    </li>
  </ul>
  <Button
    v-if="showButtonMore && items.length > 3"
    rounded
    color="lightgray"
    icon="icon-park-outline:down"
    label="Показать еще"
    class="list__buttonMore"
    @click="loadMoreItems"
  />
</template>

<style lang="scss" scoped>
.list {
  &__item {
    position: relative;
    list-style: none;
    line-height: 20px;
    font-size: 14px;
    color: black;
    padding: 16px 0 16px 24px;
    font-family: Tahoma;
    border-bottom: solid 1px #d3d3d3;
    &::before {
      position: absolute;
      top: 23px;
      left: 0;
      display: block;
      width: 8px;
      height: 8px;
      content: "";
      border-radius: 50%;
      background-color: rgba(31, 31, 31, 0.4);
    }
    &:last-child {
      border-bottom: none;
    }
  }
  &__buttonMore {
    font-weight: bold;
    height: 35px;
    width: 170px;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
