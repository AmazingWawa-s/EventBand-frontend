<template>
  <div class="application">
    <SystemInform />
    <Header />
    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
.application {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  justify-items: center;
  color: #333333;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

input {
  border: 1.5px solid #666;
  outline: none;
  font-size: 18px;
  height: 32px;
  width: 100%;
  font-family: sans-serif;
  border-radius: 5px 10px 5px 10px;
  color: #333;
  padding: 5px 10px;
}

textarea {
  border: 1.5px solid #666;
  border-radius: 5px 10px 5px 10px;
  color: #333;
  outline: none;
  font-family: sans-serif;
  width: 100%;
  resize: none;
  padding: 5px 10px;
}

.main-view {
  overflow: hidden;
  height: 100%;
  background-color: @theme-bg;
  width: 100%;
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
import { useStore } from "./store";
import SystemInform from "./components/SystemInform.vue";
const store = useStore();
</script>
