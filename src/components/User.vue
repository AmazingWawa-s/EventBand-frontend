<template>
  <div class="user-main-container">
    <div class="sub-container">
      <div class="grid-calendar grid-item">活动日历</div>
      <div class="grid-tasks grid-item">待办事项</div>
    </div>
    <div class="grid-events grid-item">
      我的活动
      <div class="event-item">
        活动1
        <Button @click="jumpToEventDetail">进入活动详情</Button>
      </div>
      <div class="event-item">
        活动2
        <Button>进入活动详情</Button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-main-container {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-rows: 400px 1fr;
  gap: 10px;
  padding: 10px;
  overflow: hidden;

  .grid-item {
    border-radius: 10px;
    border: 1px solid #000;
    background-color: #eee;
  }

  .sub-container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;

    .grid-calendar {
      width: 400px;
      height: 100%;
    }

    .grid-tasks {
    }
  }

  .grid-events {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    .event-item {
      display: flex;
      margin: 5px 0;
      align-items: center;
      justify-content: space-between;
      border: 1px #000 solid;
    }
  }
}
</style>

<script setup>
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const jumpToEventDetail = () => {
  router.push({
    path: "/eventDetail",
  });
};
</script>
