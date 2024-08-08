<script setup></script>

<template>
  <!-- <button class="mybutton" @click="processChange">add boom</button> -->
  <div class="grid__container">
    <div class="grid__item__header">
      <h1>THIS IS HOMEPAGE</h1>
      <h2 @click="$router.push('/signup')">Sign Up</h2>
      <h2 @click="$router.push('/signin')">Login</h2>
      <!-- <button class="debug" @click="debug">DEBUG</button> -->
    </div>
  </div>
</template>

<style scoped>
h2 {
  cursor: pointer;
  color: darkblue;
}
</style>
