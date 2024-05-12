<template>
  <div class="calendar-main-container">
    <div class="calendar-header">
      <p class="button" @click="changeMonth(-1)">{{ "<" }}</p>
      <p>{{ year + " " }}年{{ " " + month + " " }}月</p>
      <p class="button" @click="changeMonth(1)">{{ ">" }}</p>
    </div>
    <div class="calendar-body">
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
        <div
          v-for="(item, index) in calendarArray"
          :key="index"
          :class="{
            'calendar-item': true,
            'calendar-selected': true,
            'calendar-past':
              year < currentDate.getFullYear() ||
              (year == currentDate.getFullYear() && month - 1 < currentDate.getMonth()) ||
              (item < currentDate.getDate() && month - 1 == currentDate.getMonth()),
          }"
        >
          <div :class="{ 'calendar-item-sub': item, 'calendar-void': !item }">
            {{ item }}
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.calendar-main-container {
  width: 100%;
  padding: 10px;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  user-select: none;

  .calendar-header {
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .button {
      cursor: pointer;
    }
  }

  .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    align-items: center;
    justify-items: center;
    gap: 5px;

    .calendar-past {
      color: #aaa;
    }

    .calendar-item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      border-radius: 10px;
      padding: 3px;
    }

    .calendar-item-sub {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .calendar-void {
      background-color: #eee;
    }
  }
}
</style>

<script setup>
import { computed, ref } from "vue";

const currentDate = new Date();
const year = ref(currentDate.getFullYear());
const month = ref(currentDate.getMonth() + 1);
// const calendarArray = ref([...new Array(35)]);
const calendarArray_previous = ref([]);
const calendarArray_next = ref([]);

const calendarArray = computed(() => {
  let firstDay = new Date(year.value, month.value - 1, 1).getDay();
  let lastDate = new Date(year.value, month.value, 0).getDate();
  let arr = [...new Array(42)];
  let count = 1;
  for (let index = 0; index < 42; index++) {
    if (index >= firstDay && count <= lastDate) {
      arr[index] = count++;
    }
  }
  return arr;
});

const changeMonth = (amount) => {
  month.value += amount;
  if (month.value == 0) {
    month.value = 12;
    year.value -= 1;
  } else if (month.value == 13) {
    month.value = 1;
    year.value += 1;
  }
};
</script>
