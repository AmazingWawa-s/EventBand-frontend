<template>
  <div class="select-main-container">
    <div class="select-header" @mousewheel="ScaleSelectorScroll">
      人数：
      <div class="select-slide">
        <div
          ref="ScaleSelector"
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
      <div class="place-menu" @mousewheel="PlaceSelectorScroll">
        <div
          :class="{ 'menu-item': true, 'menu-selected': i == selectMenu }"
          v-for="(item, i) in menuList"
          :key="item"
          @click="() => (selectMenu = i)"
        >
          <span class="menu-item-count">{{
            selectCount[i] == 0 ? "" : selectCount[i]
          }}</span>
          <span>{{ item.place }}</span>
        </div>
      </div>
      <div class="select-content">
        <div
          :class="{
            'content-item': true,
            'content-item-selected': item.select,
          }"
          @click="() => (item.select = !item.select)"
          v-for="item in menuList[selectMenu].menu"
          :key="item"
          v-show="item.size & (1 << selectScale)"
        >
          {{ item.name }}
          <CircleCheckBig :size="16" color="green" v-if="item.select" />
          <CircleDashed :size="16" color="#ddd" v-else />
        </div>
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
    background-color: #333;
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
      background-color: #333;
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
      color: #333;
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
          font-size: 12px;
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
      border-radius: 0 5px 10px 0;
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
        display: flex;
        align-items: center;
        gap: 3px;
      }

      .content-item-selected {
        // background: center/100% no-repeat url("../assets/select.svg") #fff;
      }
    }

    .select-content::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { CircleDashed } from "lucide-vue-next";
import { CircleCheckBig } from "lucide-vue-next";
const selectScale = ref(0);

const selectCount = computed(() => {
  let arr = new Array(menuList.value.length);
  for (let i = 0; i < menuList.value.length; i++) {
    let count = 0;
    for (let index in menuList.value[i].menu) {
      if (menuList.value[i].menu[index].select) {
        count++;
      }
    }
    arr[i] = count;
  }
  return arr;
});

const ScaleSelector = ref();

const ScaleSelectorScroll = (e) => {
  console.log(e.wheelDelta);
  if (e.wheelDelta < 0) {
    selectScale.value =
      selectScale.value == scaleList.value.length - 1 ? 0 : selectScale.value + 1;
  } else {
    selectScale.value =
      selectScale.value == 0 ? scaleList.value.length - 1 : selectScale.value - 1;
  }
};

const PlaceSelectorScroll = (e) => {
  if (e.wheelDelta < 0) {
    selectMenu.value =
      selectMenu.value == menuList.value.length - 1
        ? selectMenu.value
        : selectMenu.value + 1;
  } else {
    selectMenu.value = selectMenu.value == 0 ? selectMenu.value : selectMenu.value - 1;
  }
};

const menuList = ref([
  {
    place: "逸夫楼",
    menu: [
      {
        name: "101",
        size: 0b000011,
        select: false,
      },
      {
        name: "201",
        size: 0b000011,
        select: false,
      },
      {
        name: "301",
        size: 0b000011,
        select: false,
      },
    ],
  },
  {
    place: "经管楼",
    menu: [
      {
        name: "101",
        size: 0b000011,
        select: false,
      },
      {
        name: "201",
        size: 0b000011,
        select: false,
      },
      {
        name: "301",
        size: 0b000011,
        select: false,
      },
    ],
  },
  {
    place: "机电楼",
    menu: [
      {
        name: "101",
        size: 0b000011,
        select: false,
      },
      {
        name: "201",
        size: 0b000011,
        select: false,
      },
      {
        name: "301",
        size: 0b000011,
        select: false,
      },
      {
        name: "401",
        size: 0b110000,
        select: false,
      },
      {
        name: "501",
        size: 0b000011,
        select: false,
      },
    ],
  },
  {
    place: "教职工礼堂",
    menu: [
      {
        name: "教职工礼堂",
        size: 0b111001,
        select: false,
      },
    ],
  },
  {
    place: "操场",
    menu: [
      {
        name: "操场",
        size: 0b110001,
        select: false,
      },
    ],
  },
  {
    place: "体育馆",
    menu: [
      {
        name: "篮球场",
        size: 0b111001,
        select: false,
      },
      {
        name: "会议室101",
        size: 0b000111,
        select: false,
      },
      {
        name: "会议室102",
        size: 0b000111,
        select: false,
      },
    ],
  },
  {
    place: "学活中心",
    menu: [
      {
        name: "102",
        size: 0b000111,
        select: false,
      },
    ],
  },
]);

const placeSelected = ref({});

const selectMenu = ref(0);

const scaleList = ref([
  "×", //0b000001 1
  "1~5", //0b000010 2
  "5~10", //0b000100 4
  "10~30", //0b001000 8
  "30~50", //0b010000 16
  "50+", //0b100000 32
]);

const selectContent = ref([]);

const selectPlace = (i) => {};
</script>
