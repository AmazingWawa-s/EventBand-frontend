<template>
  <div class="picker-main-container">
    <div class="time-list">5/20 12:40</div>
    <div class="picker-header">
      <div>日期</div>
      <div>时间段</div>
    </div>
    <div class="picker-body">
      <div class="picker-scroll">
        <div class="picker-list" ref="picker1">
          <div
            class="picker-item"
            @wheel="pickerScroll(index)"
            v-for="(item, index) in selectArr"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="picker-scroll"></div>
      <div class="divide"></div>
      <div class="picker-scroll"></div>
      <div class="divide"></div>
      <div class="picker-scroll"></div>
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
    align-items: center;
    height: 100%;
    justify-items: center;
  }

  .picker-body {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    width: 100%;
    overflow: hidden;
    align-items: center;

    .divide {
      width: 5px;
      height: 60%;
      background-color: #ddd;
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

      .picker-item {
        padding: 5px;
        height: 30px;
        text-align: center;
        width: 100%;
        cursor: pointer;
      }
    }
  }

  .picker-scroll::-webkit-scrollbar {
    display: none;
  }
}
</style>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// onMounted(() => {
//   picker1.value.addEventListener("scroll", pickerScroll);
// });

// onUnmounted(() => {
//   picker1.value.removeEventListener("scroll", pickerScroll);
// });

const pickerScroll = (WheelEvent) => {
  console.log(WheelEvent.deltaX);
  //   console.log(picker1.value.style);
  //   picker1.value.style.top = "-30px";
};

const picker1 = ref(null);
const selectArr = ref([
  "",
  "",
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
</script>
