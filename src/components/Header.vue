<template>
  <div class="header">
    <div :class="{ 'notice-bar': true, appear: store.notice }">
      <div>通知:</div>
      <div>{{ store.notice }}</div>
      <div @click="() => (store.notice = '')">确定</div>
    </div>
    <div class="header-front">
      <img class="icon" src="../assets/icon_logo.svg" alt="" />
    </div>
    <div class="search-bar">
      <div>搜索</div>
      <input type="text" />
    </div>
    <div class="header-back">
      <div class="user-bar">
        <!-- <div v-if="store.isLogin" class="user-bar"> -->
        <Button @click="() => (store.notice = '有消息')">消息</Button>
        <Button>设置</Button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 60px;
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;

  .notice-bar {
    position: absolute;
    border-radius: 0 0 10px 10px;
    background: #eee;
    width: min(100%, 600px);
    left: 50%;
    transform: translateX(-50%);
    top: -100%;
    height: 100%;
    z-index: 10;
    transition: 500ms;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .appear {
    top: 0;
  }

  .header-front {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .search-bar {
    height: 100%;
    display: flex;
    align-items: center;

    input {
      height: 100%;
      outline: none;
      padding: 0 10px;
    }
  }

  .icon {
    height: 100%;
  }
  .user-bar {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
</style>

<script setup>
import Button from "./Button.vue";
import Avator from "./Avator.vue";
import { useStore } from "../store";
const store = useStore();
</script>
