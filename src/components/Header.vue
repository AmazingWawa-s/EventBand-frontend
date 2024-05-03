<template>
  <div class="header">
    <div class="header-front">
      <img class="icon" src="../assets/EventBand.svg" alt="" />
      &emsp;header
    </div>
    <div v-if="store.isLogin" class="user-bar">
      <Avator />
      <Button>消息</Button>
      <Button>设置</Button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 60px;
  width:100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000;

  .header-front {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .icon {
    height: 100%;
  }
  .user-bar {
    display: flex;
    height:100%;
    align-items: center;
  }
}
</style>

<script setup>
import Button from "./Button.vue";
import Avator from "./Avator.vue";
import { useStore } from '../store';
const store = useStore();
</script>
