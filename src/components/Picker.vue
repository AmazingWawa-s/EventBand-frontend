<template>
  <div class="picker-main-container">
    <div class="time-list">
      <span>
        {{
          selectArr[picker1] == "--" ? "" : selectArr[picker1] + "~" + selectArr[picker2]
        }}
      </span>
      <span>
        {{
          selectArr[picker3] == "--"
            ? ""
            : selectArr2[picker3] + "~" + selectArr2[picker4]
        }}
      </span>
    </div>
    <div class="picker-header">
      <div>日期</div>
      <div>时间段</div>
    </div>
    <div class="picker-body">
      <div class="picker-scroll" @mousewheel="scrollPicker1Wheel">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker1 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker1 }"
            @click="scrollPicker(1, index)"
            v-for="(item, index) in selectArr"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll" @mousewheel="scrollPicker2Wheel">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker2 * 30 + 15) + `px)` }"
        >
          <div
            :class="{
              'picker-item': true,
              'picker-select': index == picker2,
              'picker-disabled': index < picker1,
            }"
            @click="scrollPicker(2, index)"
            v-for="(item, index) in selectArr"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll" @mousewheel="scrollPicker3Wheel">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker3 * 30 + 15) + `px)` }"
        >
          <div
            :class="{ 'picker-item': true, 'picker-select': index == picker3 }"
            @click="scrollPicker(3, index)"
            v-for="(item, index) in selectArr2"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll" @mousewheel="scrollPicker4Wheel">
        <div
          class="picker-list"
          :style="{ top: `calc(50% - ` + (picker4 * 30 + 15) + `px)` }"
        >
          <div
            :class="{
              'picker-item': true,
              'picker-select': index == picker4,
              'picker-disabled': index < picker3,
            }"
            @click="scrollPicker(4, index)"
            v-for="(item, index) in selectArr2"
            :key="item"
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
    border: 1.5px dashed #666;
    border-radius: 5px 10px 5px 10px;
    padding: 0 5px;
    width: 100%;
    height: 32px;
    font-size: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
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
    border-radius: 5px 10px 5px 10px;
    overflow: hidden;
    align-items: center;

    .divide {
      width: 5px;
      height: 100%;
      background-color: #eee;
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

      .picker-disabled {
        pointer-events: none;
        color: #ddd;
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
    box-shadow: 0 10px 11px -10px #ccc inset, 0 -10px 11px -10px #ccc inset;
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

const selectArr2 = ref([
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
  "23:00",
]);

const scrollPicker = (picker, index) => {
  if (index < 0) {
    return;
  } else if (index >= selectArr.value.length && (picker == 1 || picker == 2)) {
    return;
  } else if (index >= selectArr2.value.length && (picker == 3 || picker == 4)) {
    return;
  } else {
    if (picker == 1) {
      picker1.value = index;
      if (picker2.value < picker1.value) {
        picker2.value = picker1.value;
      }
    } else if (picker == 2) {
      picker2.value = picker1.value > index ? picker1.value : index;
    } else if (picker == 3) {
      picker3.value = index;
      if (picker4.value < picker3.value) {
        picker4.value = picker3.value;
      }
    } else if (picker == 4) {
      picker4.value = picker3.value > index ? picker3.value : index;
    }
  }
};

const scrollPicker1Wheel = (e) => {
  if (e.wheelDelta > 0) {
    scrollPicker(1, picker1.value - 1);
  } else {
    scrollPicker(1, picker1.value + 1);
  }
};

const scrollPicker2Wheel = (e) => {
  if (e.wheelDelta > 0) {
    scrollPicker(2, picker2.value - 1);
  } else {
    scrollPicker(2, picker2.value + 1);
  }
};

const scrollPicker3Wheel = (e) => {
  if (e.wheelDelta > 0) {
    scrollPicker(3, picker3.value - 1);
  } else {
    scrollPicker(3, picker3.value + 1);
  }
};

const scrollPicker4Wheel = (e) => {
  if (e.wheelDelta > 0) {
    scrollPicker(4, picker4.value - 1);
  } else {
    scrollPicker(4, picker4.value + 1);
  }
};
</script>
