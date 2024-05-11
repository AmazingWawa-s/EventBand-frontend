<template>
  <div class="m-schedule-main-container">
    <div class="schedule-header">
      <div class="front">活动日程表</div>
      <div class="end">缩小/放大</div>
    </div>
    <div class="schedule-body"></div>
  </div>
</template>

<style lang="less" scoped>
.m-schedule-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;

  .schedule-header {
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .schedule-body {
    border-radius: 10px;
    background-color: #eee;
  }
}
</style>
