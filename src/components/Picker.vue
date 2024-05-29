<template>
  <div class="picker-main-container">
    <div class="time-list">
      {{
        selectArr[picker1] +
        "~" +
        selectArr[picker2 + picker1] +
        " " +
        selectArr3[picker3] +
        "~" +
        selectArr3[picker4]
      }}
    </div>
    <div class="picker-header">
      <div>日期</div>
      <div>时间段</div>
    </div>
    <div class="picker-body">
      <div class="picker-scroll">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker1 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker1 }"
            @click="scrollPicker1(index)"
            v-for="(item, index) in selectArr"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker2 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker2 }"
            @click="() => (picker2 = index)"
            v-for="(item, index) in selectArr2"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker3 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker3 }"
            @click="() => (picker3 = index)"
            v-for="(item, index) in selectArr3"
            :key="item"
            :style="{ 'font-size': 20 - Math.abs(picker3 - index) * 3 + 'px' }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker4 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker4 }"
            @click="() => (picker4 = index)"
            v-for="(item, index) in selectArr3.slice(picker3)"
            :key="item"
            :style="{
              'font-size': 20 - Math.abs(picker4 - index) * 3 + 'px',
            }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.picker-main-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  overflow: hidden;
  grid-template-rows: auto auto 1fr;
  user-select: none;
  gap: 5px;

  .time-list {
    border: 1px solid #ddd;
    padding: 0 5px;
    width: 100%;
    height: 32px;
    font-size: 18px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .picker-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    position: relative;
    align-items: center;
    height: 100%;
    justify-items: center;
  }

  .picker-body {
    height: 100%;
    max-height: 180px;
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    width: 100%;
    overflow: hidden;
    align-items: center;

    .divide {
      width: 5px;
      height: 100%;
      background-color: #eee;
      border-radius: 10px;
    }
  }

  .picker-scroll {
    height: 100%;
    position: relative;
    width: 100%;

    .picker-list {
      position: absolute;
      width: 100%;
      transition: 300ms;

      .picker-item {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        cursor: pointer;
        transition: 300ms;
      }

      .picker-select {
        font-weight: 600;
        font-size: 20px;
      }

      .picker-item:hover {
        background-color: #eee;
      }
    }
  }

  .picker-scroll::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    pointer-events: none;
    box-shadow: 0 10px 11px -10px #ddd inset, 0 -10px 11px -10px #ddd inset;
  }

  .picker-scroll::-webkit-scrollbar {
    display: none;
  }
}
</style>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const picker1 = ref(0);
const picker2 = ref(0);
const picker3 = ref(0);
const picker4 = ref(0);
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

const scrollPicker1 = (index) => {
  let delta = index - picker1.value;
  picker1.value = index;
  picker2.value += delta;
};

const selectArr2 = computed(() => {
  return selectArr.value.slice(picker1.value);
});

const selectArr3 = ref([
  "--",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]);
</script>
