<template>
  <div class="application">
    <Header />
    <router-view />
  </div>
</template>

<style lang="less">
.application {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  justify-items: center;
  color: #333333;
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background-color: #ffffff88;
}

::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 20px;
}
</style>

<script setup>
import Header from "./components/Header.vue";
</script>
