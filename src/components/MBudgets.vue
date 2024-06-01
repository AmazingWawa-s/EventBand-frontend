<template>
  <div class="m-budgets-main-container">
    <div class="budgets-header">
      经费管理
      <div class="button">
        <div class="count">1</div>
        <div>经费报销</div>
      </div>
    </div>
    <div class="budgets-body">
      <div class="budgets-detail-button"><Search :size="16" />详情</div>
      <div class="budgets-total">
        <span>total:</span>
        <span class="budgets-num">1200</span>
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
  background-color: #fff;
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

    .button {
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;
      border-radius: 5px;
      border: 1px solid #ddd;
      padding: 5px;
      justify-content: center;

      .count {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
      }
    }
  }

  .budgets-body {
    display: grid;
    width: 100%;
    height: 100%;
    overflow: hidden;
    gap: 5px;
    align-items: end;
    grid-template-columns: auto 1fr;

    .budgets-total {
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

    .budgets-detail-button {
      font-size: 16px;
      height: 100%;
      border-radius: 30px 10px 10px 30px;
      background-color: #eee;
      padding: 10px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<script setup>
import { Search } from "lucide-vue-next";
</script>
