<template>
  <div class="select-main-container">
    <div class="select-header">
      人数：
      <div class="select-slide">
        <div
          v-for="(item, i) in scaleList"
          :class="{ 'scale-selected': i == selectScale, 'scale-item': true }"
          @click="() => (selectScale = i)"
          :key="i"
        >
          {{ i == selectScale ? item : "" }}
        </div>
      </div>
    </div>
    <div class="select-body">
      <div class="place-menu">
        <div
          :class="{ 'menu-item': true, 'menu-selected': i == selectMenu }"
          v-for="(item, i) in placeMenu"
          :key="item"
          @click="() => (selectMenu = i)"
        >
          <span class="menu-item-count"></span>
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="select-content">
        <div class="content-item">任意</div>
        <div class="content-item" v-for="item in placeContents[selectMenu]" :key="item">
          {{ item }}
        </div>
        <div class="content-item content-item-selected">605</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.select-main-container {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  display: grid;
  overflow: hidden;
  gap: 5px;
  grid-template-rows: auto 1fr;

  .select-header {
    height: 100%;
    border-radius: 5px;
    height: 32px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    color: #fff;
    background-color: #666;
    padding: 0 5px;

    .select-slide {
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(6, 1fr);
      padding: 5px 0;
      align-items: center;
      justify-items: center;
      position: relative;
    }

    .select-slide::after {
      position: absolute;
      width: 80%;
      height: 3px;
      content: "";
      background-color: #fff;
      z-index: 0;
    }

    .scale-item {
      cursor: pointer;
      position: relative;
      z-index: 1;
      background-color: #fff;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      transition: 200ms;
      display: flex;
      font-size: 14px;
      color: #666;
      align-items: center;
      justify-content: center;
    }

    .scale-selected {
      border-radius: 5px;
      font-weight: 600;
      width: 100%;
      height: 100%;
    }
  }

  .select-body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: #fff;
    // border: 1px solid #ddd;
    padding: 5px;

    .place-menu {
      overflow-y: scroll;
      height: 100%;
      width: 100%;
      flex-direction: column;

      .menu-item {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        border-radius: 16px 0 0 16px;

        .menu-item-count {
          border-radius: 50%;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          background-color: #eee;
          font-size: 10px;
          font-weight: 100;
        }
      }

      .menu-selected {
        background-color: #ddd;
        font-weight: 600;

        .menu-item-count {
          background-color: #fff;
        }
      }
    }

    .place-menu::-webkit-scrollbar {
      display: none;
    }

    .select-content {
      background-color: #ddd;
      height: 100%;
      width: 100%;
      padding: 5px;
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      overflow-y: scroll;
      gap: 5px;

      .content-item {
        cursor: pointer;
        border-radius: 5px;
        background-color: #fff;
        padding: 5px;
        position: relative;
      }

      .content-item-selected {
        background: center/100% no-repeat url("../assets/select.svg") #fff;
      }
    }

    .select-content::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

<script setup>
import { computed, ref } from "vue";

const selectScale = ref(0);

const placeMenu = ref([
  "逸夫楼",
  "机电楼",
  "教职工礼堂",
  "经管楼",
  "操场",
  "体育馆",
  "学活中心",
]);

const placeSelected = ref([]);

const placeContents = ref([
  ["101", "201", "301", "401", "501", "601", "701"],
  ["101", "201", "301", "401"],
  ["教职工礼堂"],
  ["101", "201", "301", "401"],
  ["操场"],
  ["篮球场", "会议室101", "会议室102"],
  ["101", "201", "301", "401"],
]);

const selectMenu = ref(0);

const scaleList = ref(["×", "1~5", "5~10", "10~30", "30~50", "50+"]);

const selectContent = ref([]);
</script>
