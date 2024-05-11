<template>
  <div class="ecform-main-container">
    <div class="ecform-header">
      <span>公共</span>
      <span>|</span>
      <span>私人</span>
    </div>
    <div class="ecform-body">
      <div class="ecform-name">
        活动名称
        <input type="text" />
      </div>
      <div class="ecform-info">
        活动说明
        <textarea placeholder="活动说明" />
      </div>
      <div class="ecform-time">
        活动时间
        <input type="text" />
      </div>
      <div class="ecform-place">
        活动地点
        <input type="text" />
      </div>
    </div>
    <div class="ecform-bottom">
      <div>创建活动</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ecform-main-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  padding: 0 10px;

  .ecform-header {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }

  .ecform-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      "a d"
      "b d"
      "c d";

    .ecform-name {
      grid-area: a;
    }

    .ecform-time {
      grid-area: b;
    }

    .ecform-place {
      grid-area: c;
    }

    .ecform-info {
      grid-area: d;
      display: grid;
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

  .ecform-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>

<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
</script>
