<template>
  <div class="m-budgets-main-container">
    <div class="budgets-header">经费管理</div>
    <div class="budgets-body">
      <div class="budgets-total">
        <span>total:</span>
        <span class="budgets-num">1200</span>
        <span class="budgets-num2">/2000</span>
      </div>
      <div class="budgets-graph">
        <div class="budgets-item" v-for="i in 100" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-budgets-main-container {
  position: relative;
  z-index: @z-index-modules;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;

  .budgets-header {
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .budgets-body {
    display: grid;
    overflow: hidden;
    grid-template-rows: auto 1fr;

    .budgets-total {
      margin-bottom: 5px;
      font-family: "consolas";
      text-align: right;

      .budgets-num {
        margin-left: 5px;
        font-size: 1.6em;
      }

      .budgets-num2 {
        font-weight: 600;
        font-size: 1.3em;
      }
    }

    .budgets-graph {
      display: grid;
      gap: 2px;
      grid-template-columns: repeat(20, 1fr);
      grid-template-rows: repeat(5, 1fr);

      .budgets-item {
        background-color: #eee;
        border-radius: 2px;
      }
    }
  }
}
</style>
