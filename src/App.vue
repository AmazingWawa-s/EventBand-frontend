<template>
  <div class="application">
    <Header />
    <router-view />
  </div>
</template>

<style lang="less">
.application{
  width:100vw;
  height: 100vh;
  background-color: #ffffff;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  justify-items: center;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: #FAC3B588;
}

::-webkit-scrollbar-thumb {
  background-color: #FAC3B5;
  border-radius: 0;
}
</style>

<script setup>
import Header from './components/Header.vue';
</script>
