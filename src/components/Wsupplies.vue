<template>
  <div class="w-supplies-main-container">
    <div class="header">
      <input type="text" />
      <input type="number" min="1" value="1" />
      <div class="button"><PackagePlus /></div>
    </div>
    <div class="body">
      <div v-for="item in supplies" :key="item"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.w-supplies-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;

  .header {
    height: 60px;
    display: grid;
    grid-template-columns: 3fr 1fr auto;
    gap: 5px;
    align-items: center;

    input {
      height: 50px;
      border: 2px dashed #333;
      border-radius: 5px;
      font-family: "Consolas";
    }

    .button {
      width: 50px;
      display: flex;
      cursor: pointer;
      align-items: center;
      position: relative;
      justify-content: center;
      border-radius: 5px;
      height: 50px;
      z-index: 2;
      border: 2px dashed #333;
    }

    .button::after {
      content: "";
      transition: 300ms;
      z-index: 1;
      border-radius: 5px;
      position: absolute;
      mix-blend-mode: saturation;
      background-color: rgb(255, 163, 130);
      width: 100%;
      height: 100%;
      box-shadow: 0 0 5px rgb(255, 163, 130);
      top: 2px;
      left: 2px;
    }

    .button::after:hover {
      top: 0;
      left: 0;
    }
  }

  .body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    border-radius: 5px;
  }
}
</style>

<script setup>
import { PackagePlus } from "lucide-vue-next";
import { ref } from "vue";

const supplies = ref([
  {
    name: "麦克风",
    amount: 9,
    ready: true,
  },
  {
    name: "音箱",
    amount: 2,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
]);
</script>
