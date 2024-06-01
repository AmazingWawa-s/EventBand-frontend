<template>
  <div class="calendar-main-container">
    <div class="calendar-header">
      <p class="button" @click="changeMonth(-1)">{{ "<" }}</p>
      <p>{{ year + " " }}/{{ " " + month + " " }}</p>
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
          'calendar-selected':
            checkedDate.date == item &&
            checkedDate.month == month &&
            checkedDate.year == year,
          'calendar-past':
            year < currentDate.getFullYear() ||
            (year == currentDate.getFullYear() && month - 1 < currentDate.getMonth()) ||
            (item < currentDate.getDate() && month - 1 == currentDate.getMonth()),
        }"
      >
        <div
          @click="checkDate(item)"
          :class="{ 'calendar-item-sub': item, 'calendar-void': !item }"
        >
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
  font-family: "consolas";
  background-color: #fff;
  height: 100%;
  display: grid;
  border-radius: @user-item-border-radius-sub;
  grid-template-rows: auto 1fr;
  user-select: none;

  .calendar-header {
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      height: 100%;
    }

    .button {
      flex-grow: 1;
      text-align: center;
      font-family: "consolas";
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
      color: #ccc;
    }

    .calendar-item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: #eee;
      border-radius: 10px;
      padding: 5px;
      pointer-events: none;
      transition: 300ms;
      font-weight: 600;
    }

    .calendar-item:hover {
    }

    .calendar-item-sub {
      background-color: #fff;
      pointer-events: all;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .calendar-void {
      background-color: #eee;
    }

    .calendar-selected {
      background-color: #666;
    }
  }
}
</style>

<script setup>
import { computed, ref, inject } from "vue";

const currentDate = new Date();
const year = ref(currentDate.getFullYear());
const month = ref(currentDate.getMonth() + 1);
const calendarArray_previous = ref([]);
const calendarArray_next = ref([]);

const checkedDate = inject("checkedDate");

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

const checkDate = (date) => {
  checkedDate.date = date;
  checkedDate.month = month.value;
  checkedDate.year = year.value;
};
</script>
