<template>
  <div class="m-others-main-container">
    <div class="side-bar">
      <div @click="menuSelect = 0" :class="{ item: true, selected: menuSelect == 0 }">
        <PieChart />
        <span class="word">筹备进度</span>
      </div>
      <div @click="menuSelect = 1" :class="{ item: true, selected: menuSelect == 1 }">
        <HandCoins />
        <span class="word">经费详情</span>
      </div>
      <div @click="menuSelect = 2" :class="{ item: true, selected: menuSelect == 2 }">
        <PackageCheck />
        <span class="word">物资管理</span>
      </div>
      <div @click="menuSelect = 3" :class="{ item: true, selected: menuSelect == 3 }">
        <Sticker />
        <span class="word">活动反馈</span>
      </div>
    </div>
    <div class="body">
      <keep-alive>
        <component :is="menuList[menuSelect]" />
      </keep-alive>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-others-main-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;

  .side-bar:hover {
    width: 122px;
  }

  .side-bar {
    transition: 300ms;
    overflow: hidden;
    width: 52px;
    border-radius: 5px 5px 5px 5px;
    border: 2px dashed #eee;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .item {
      width: 120px;
      display: grid;
      justify-items: center;
      align-items: center;
      grid-template-columns: 5fr 7fr;
      cursor: pointer;
      transition: 300ms;
    }

    .word {
      white-space: nowrap;
      justify-self: start;
      font-size: 14px;
    }

    .selected {
      color: orangered;
    }
  }

  .body {
    border-radius: 5px 5px 5px 5px;
    border: 2px dashed #eee;
    background-color: #fff;
  }
}
</style>

<script setup>
//筹备进度，经费详情，物资管理，活动反馈
import { Sticker } from "lucide-vue-next";
import { Briefcase } from "lucide-vue-next";
import { PackageCheck } from "lucide-vue-next";
import { HandCoins } from "lucide-vue-next";
import { PieChart } from "lucide-vue-next";
import { ref } from "vue";
import Wprogress from "../components/Wprogress.vue";
import Wbudgets from "../components/Wbudgets.vue";
import Wsupplies from "../components/Wsupplies.vue";
import Wfeedback from "../components/Wfeedback.vue";

const menuSelect = ref(0);
const menuList = ref([Wprogress, Wbudgets, Wsupplies, Wfeedback]);
</script>
