<template>
  <div class="m-others-main-container">
    <div class="body"></div>
    <div class="side-bar">
      <div @click="menuSelect = 0" :class="{ item: true, selected: menuSelect == 0 }">
        <Bell />
      </div>
      <div @click="menuSelect = 1" :class="{ item: true, selected: menuSelect == 1 }">
        <PackageCheck />
      </div>
      <div @click="menuSelect = 4" :class="{ item: true, selected: menuSelect == 4 }">
        <Sticker />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-others-main-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;

  .side-bar:hover {
    border-radius: 5px 5px 5px 5px;
    width: 70px;
  }

  .side-bar {
    transition: 300ms;
    width: 60px;
    // background-color: #666;
    border: 2px solid #333;
    border-radius: 5px 5px 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .item {
      transition: 200ms;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2px;
    }

    .selected {
      //   size: 20px;
      color: orange;
    }
  }

  .body {
  }
}
</style>

<script setup>
//经费详情,更新日志,活动反馈,资源管理

import { Bell } from "lucide-vue-next";
import { Sticker } from "lucide-vue-next";
import { Briefcase } from "lucide-vue-next";
import { PackageCheck } from "lucide-vue-next";
import { ref } from "vue";

const menuSelect = ref(0);
</script>
