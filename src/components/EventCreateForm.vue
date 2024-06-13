<template>
  <div class="ecform-main-container">
    <div class="ecform-body">
      <div class="ecform-name ecform-item">
        <text>活动名称</text>
        <input v-model="eventName" type="text" />
      </div>
      <div class="ecform-info ecform-item">
        <text>活动说明</text>
        <textarea v-model="eventInfo" />
      </div>
      <div class="ecform-time ecform-item">
        <text>活动时间</text>
        <Picker ref="timePickerRef" />
      </div>
      <div class="ecform-place ecform-item">
        地点偏好
        <Select @addLocationId="(id, cap, flag) => addLocation(id, cap, flag)" />
      </div>
    </div>
    <div class="ecform-bottom ecform-item">
      <div>"※" 标注为必填项</div>
      <div class="form-commit" @click="createEvent">申请</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ecform-main-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 10px;
  font-size: 16px;
  gap: 5px;
  overflow: hidden;
  color: #333;

  .ecform-item {
    display: grid;
    overflow: hidden;
    grid-template-rows: auto 1fr;
    gap: 5px;
  }

  .ecform-body {
    display: grid;
    width: 100%;
    height: 100%;
    overflow: hidden;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3%;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      "a b c"
      "d b c"
      "d b c";

    .ecform-name {
      grid-area: a;

      text:after {
        content: " ※";
        color: @theme-color;
      }
    }

    .ecform-time {
      grid-area: b;
      .time-sub {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      text:after {
        content: " ※";
        color: @theme-color;
      }
    }

    .ecform-place {
      overflow: hidden;
      position: relative;
      grid-area: c;
    }

    .ecform-info {
      grid-area: d;
      display: grid;
      overflow: hidden;
      grid-template-rows: auto 1fr;

      textarea {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: none;
        resize: none;
      }

      text:after {
        content: " ※";
        color: @theme-color;
      }
    }
  }

  @media (max-width: 1200px) {
    .ecform-body {
      grid-template-columns: 3fr 4fr;
      height: 100%;
      width: 100%;
      overflow: hidden;
      gap: 3%;
      grid-template-rows: repeat(6, 1fr);
      grid-template-areas:
        "a d"
        "a d"
        "b c"
        "b c"
        "b c"
        "b c";
    }
  }

  .ecform-bottom {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    color: @theme-color;

    .form-commit {
      background-color: #333;
      color: #fff;
      font-size: 20px;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
    }
  }
}
</style>

<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Picker from "../components/Picker.vue";
import Select from "../components/Select.vue";
import { inject, reactive, ref } from "vue";
import { ApiCreateEvent } from "../api";

const timePickerRef = ref(null);

const eventInfo = ref("");
const eventName = ref("");
const eventPlace = new Map();

const addLocation = (id, cap, flag) => {
  if (flag) {
    eventPlace.set(id, cap);
  } else {
    eventPlace.delete(id);
  }
};

const createEvent = () => {
  let token = localStorage.getItem("token");
  let eventTime = timePickerRef.value.TimeSelected;
  let eventPlaceArray = [];
  eventPlace.forEach((value, key) => {
    eventPlaceArray.push({
      id: key,
      capacity: value,
    });
  });
  console.log(eventPlaceArray);
  if (eventName.value && eventInfo.value) {
    ApiCreateEvent(
      token,
      eventTime.start,
      eventTime.end,
      eventTime.time1,
      eventTime.time2,
      eventName.value,
      eventInfo.value,
      eventPlaceArray,
      30
    ).then((res) => {
      console.log(res);
    });
  }
};
</script>
