<template>
  <div class="m-progress-main-container">
    <div class="header">筹备进度</div>
    <div class="body"></div>
  </div>
</template>

<style lang="less" scoped>
.m-progress-main-container {
  position: relative;
  z-index: @z-index-modules;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
