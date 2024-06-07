<template>
  <div class="m-progress-main-container">
    <div class="word">距离活动开始还有</div>
    <div class="count">12</div>
    <div class="word">天</div>
  </div>
</template>

<style lang="less" scoped>
.m-progress-main-container {
  position: relative;
  z-index: @z-index-modules;
  overflow: hidden;
  width: 100%;
  background-color: @theme-color;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  padding: 10px;

  .word {
    font-size: 20px;
  }

  .count {
    font-size: 64px;
    font-weight: 600;
    font-family: "Consolas";
  }
}
</style>
