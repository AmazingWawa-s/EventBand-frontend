<template>
  <div class="ecform-main-container">
    <div class="ecform-body">
      <div class="ecform-name ecform-item">
        <text>活动名称</text>
        <input type="text" />
      </div>
      <div class="ecform-info ecform-item">
        <text>活动说明</text>
        <textarea />
      </div>
      <div class="ecform-time ecform-item">
        时间偏好
        <Picker />
      </div>
      <div class="ecform-place">地点偏好</div>
    </div>
    <div class="ecform-bottom ecform-item">
      <div>申请</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ecform-main-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 10px 10px;
  font-size: 16px;
  overflow: hidden;
  color: #666;

  .ecform-item {
    display: grid;
    overflow: hidden;
    grid-template-rows: auto 1fr;
    gap: 5px;
  }

  input {
    border: 1px solid #ddd;
    outline: none;
    font-size: 18px;
    height: 32px;
    width: 100%;
    font-family: sans-serif;
    color: #333;
    padding: 5px 10px;
  }

  textarea {
    border: 1px solid #ddd;
    color: #333;
    outline: none;
    font-family: sans-serif;
    width: 100%;
    padding: 5px 10px;
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
    }

    .ecform-time {
      grid-area: b;
      .time-sub {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
    }

    .ecform-place {
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
    }
  }

  @media (max-width: 1200px) {
    .ecform-body {
      grid-template-columns: 1fr 1fr;
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
    align-items: center;
    justify-content: flex-end;
    div {
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
</script>
