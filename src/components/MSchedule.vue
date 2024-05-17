<template>
  <div class="m-schedule-main-container">
    <div class="schedule-header">
      <div class="front">活动日程表</div>
      <div class="end">筛选/添加</div>
    </div>
    <div class="schedule-body">
      <div class="schedule-grid">
        <div class="schedule-item">
          <p>5/17</p>
          <p>10:10</p>
          <div>
            <p>title</p>
            <p>content</p>
          </div>
        </div>
        <div class="schedule-item">
          <p>5/17</p>
          <p>10:10</p>
          <div>
            <p>title</p>
            <p>content</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-schedule-main-container {
  position: relative;
  overflow: hidden;
  z-index: @z-index-modules;
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
    overflow: scroll;

    .schedule-grid {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 60px 60px 1fr;

      .schedule-item {
        display: grid;
        height: 60px;
        grid-column: 1/4;
        grid-template-columns: subgrid;
        grid-template-rows: 1fr;
      }
    }
  }
}
</style>

<script setup></script>
