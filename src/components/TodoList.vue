<template>
  <div class="todolist-main-container">
    <div @click="() => (tabChange = true)" class="todolist-tab specified">
      选定日期的事项
    </div>
    <div @click="() => (tabChange = false)" class="todolist-tab general">通知，待办</div>
    <div :class="{ 'todolist-content specified': true, 'change-z-index': tabChange }">
      选定日期的事项
    </div>
    <div class="todolist-content general">
      <div>通知：活动“xxxx”正在审核中</div>
      <div>通知：活动“xxxx”创建成功</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.todolist-main-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: auto 1fr;
  position: relative;
  overflow: hidden;
  column-gap: 10px;
  padding: 10px;

  .change-z-index {
    z-index: 2;
  }

  .specified {
    background-color: #eee;
  }

  .general {
    z-index: 1;
    background-color: #ddd;
  }

  .todolist-content {
    width: 100%;
    height: 100%;
    border-radius: 0 0 6px 6px;
    padding: 10px;
  }

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "a b"
      "c c";
    column-gap: 0;

    .todolist-content {
      grid-area: c;
    }

    .specified {
      border-radius: 0 6px 6px 6px;
    }

    .general {
      border-radius: 6px 0 6px 6px;
    }

    .todolist-tab {
      cursor: pointer;
    }
  }

  .todolist-tab {
    border-radius: 6px 6px 0 0;
    padding: 5px;
    user-select: none;
  }
}
</style>

<script setup>
import { ref } from "vue";

const tabChange = ref(false);
</script>
