<template>
  <div class="m-participants-main-container">
    <div class="participants-header">
      <div class="front">成员列表</div>
      <div class="end">筛选</div>
    </div>
    <div class="participants-body">
      <div class="participants-contents">
        <div v-for="i in 4" class="participants-item" :key="i">
          <div>小明</div>
          <div>A组</div>
          <div>联系</div>
          <div>编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-participants-main-container {
  position: relative;
  z-index: @z-index-modules;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;

  .participants-header {
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .participants-body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: #eee;
    border-radius: 6px 0 0 6px;
    font-size: 16px;

    .participants-contents {
      width: 100%;
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      padding: 5px;

      .menu-head {
        font-weight: 600;
      }

      .participants-item {
        width: 100%;
        display: grid;
        grid-column: 1/5;
        grid-template-columns: subgrid;
        justify-items: center;
        padding: 5px;
      }
    }
  }
}

.module-focus {
  z-index: @z-index-module-focus;
}
</style>
