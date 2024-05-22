<template>
  <div class="select-main-container">
    <div @click="() => (selectOpen = !selectOpen)" class="select-show">
      <div class="time-list">5/20 12:40</div>
      <div class="select-button">▼</div>
    </div>
    <div :class="{ 'select-window': true, 'select-window-open': selectOpen }">
      <div class="select-title1">日期</div>
      <div class="select-title2">时间段</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.select-main-container {
  width: 100%;
  position: relative;
}

.select-window {
  position: absolute;
  overflow: hidden;
  height: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 2px #666 inset;
  transition: 300ms;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
  align-items: center;
  justify-items: center;
  z-index: @z-index-body+2;
  grid-template-rows: auto 1fr;

  .select-title1 {
    grid-column: 1/3;
    padding-top: 5px;
  }

  .select-title2 {
    padding-top: 5px;
    grid-column: 3/5;
  }

  .select-scroll {
    width: 100%;
    position: relative;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    justify-items: center;
    height: 100%;
    flex-direction: column;
    font-size: 20px;
    padding: 0;
    list-style-type: none;
    align-items: center;
    // background: linear-gradient(
    //   0deg,
    //   rgba(238, 238, 238, 1) 0%,
    //   rgba(221, 221, 221, 0.4) 50%,
    //   rgba(238, 238, 238, 1) 100%
    // );

    .select-item {
      cursor: pointer;
      width: 100%;
      text-align: center;
      user-select: none;
    }
  }

  .select-scroll::-webkit-scrollbar {
    display: none;
  }

  .select-title {
    padding-top: 5px;
  }
}

.select-window-open {
  height: 180px;
}

.select-show {
  display: grid;
  grid-template-columns: 1fr auto;
  margin-top: 5px;
  border: 1px solid #ddd;
  width: 100%;
  cursor: pointer;
  align-items: center;
  height: 32px;
  font-size: 18px;

  .time-list {
    padding: 0 5px;
  }

  .select-button {
    height: 100%;
    display: flex;
    padding: 0 5px;
    align-items: center;
    border-left: 1px solid #ddd;
  }
}

.select-main-container:hover {
  .select-show {
    background-color: #eee;
  }
}
</style>

<script setup>
import { computed, ref } from "vue";

const selectIndex = ref(0);
const selectIndex_2 = ref(0);
const selectDate1 = computed(() => {
  return selectArr.value[selectIndex.value];
});
const selectDate2 = ref("");
const selectTime1 = ref("");
const selectTime2 = ref("");

const changeSelect = (select, index) => {
  if (select + index > 0 && select + index < selectArr.value.length) {
    select += index;
  }
};

const selectArr = ref([
  "--",
  "5/20",
  "5/21",
  "5/22",
  "5/23",
  "5/24",
  "5/25",
  "5/26",
  "5/27",
  "5/28",
  "5/29",
  "5/30",
  "5/31",
]);
const selectOpen = ref(false);
</script>
