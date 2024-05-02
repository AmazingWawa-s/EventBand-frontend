<template>
  <div class="application">
    <Header />
    <router-view />
  </div>
</template>

<style scoped lang="less">
.application{
  width:100vw;
  height: 100vh;
  background-color: #fff8ee;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  justify-items: center;
}
</style>

<script setup>
import Header from './components/Header.vue';
</script>
