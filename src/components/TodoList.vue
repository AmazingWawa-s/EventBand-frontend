<template>
  <div class="todolist-main-container">
    <div @click="() => (tabChange = true)" class="todolist-tab specified">
      选定日期的事项
    </div>
    <div @click="() => (tabChange = false)" class="todolist-tab general">待办</div>
    <div :class="{ 'todolist-content specified': true, 'change-z-index': tabChange }">
      选定日期的事项
    </div>
    <div class="todolist-content general">
      <div v-for="i in 2" :key="i" class="todolist-item-inform todolist-item">
        <img src="../assets/message.svg" alt="" />
        <div class="todolist-item-content">
          <p>2024/5/15 8:30</p>
          <div>活动“XXXX”审核中...</div>
        </div>
      </div>
      <div v-for="i in 2" :key="i" class="todolist-item-todo todolist-item">
        <img src="../assets/message.svg" alt="" />
        <div class="todolist-item-content">
          <p>2024/5/15 8:30</p>
          <div>活动“XXXX”审核中...</div>
        </div>
      </div>
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
    border-radius: 0 0 6px 6px;
    padding: 10px;
    overflow-y: scroll;

    .todolist-item-todo {
      border: 2px solid @theme-color;
      background-color: @theme-color;
    }

    .todolist-item-inform {
      border: 2px solid @theme-black;
      background-color: @theme-black;
    }

    .todolist-item {
      height: 60px;
      border-radius: @header-border-radius;
      margin: 0 0 10px 0;
      display: grid;
      align-items: center;
      grid-template-columns: 60px 1fr;
      justify-items: center;

      .todolist-item-content {
        height: 100%;
        border-radius: 3px 8px 3px 8px;
        padding: 0 5px;
        background-color: #fff;
        display: grid;
        grid-template-rows: auto 1fr;
        align-items: center;
        width: 100%;
        p {
          font-size: 16px;
        }
      }
    }
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
