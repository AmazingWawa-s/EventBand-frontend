<template>
  <div class="w-budgets-main-container">
    <div class="header">
      <div class="right">
        <span>预算:</span>2000
        <div class="graph">
          <div class="budget bar"></div>
          <div class="cost bar">1500</div>
        </div>
      </div>
      <div class="button">修改预算</div>
    </div>
    <div class="body">
      <div class="body-header">
        <div>记录</div>
        <div class="add-button">添加<CirclePlus :size="20" /></div>
      </div>
      <div class="add-form">
        
      </div>
      <div class="list">
        <CostItem v-for="item in costlist" v-bind="item" :key="item" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.w-budgets-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-rows: auto 1fr;

  .header {
    font-family: "Consolas";
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 3px;

    .button {
      font-size: 16px;
      border: 2px solid #333;
      border-left: 3px solid #333;
      height: 100%;
      display: flex;
      padding: 5px;
      align-items: center;
      cursor: pointer;
      border-radius: 0 5px 5px 0;
    }
  }

  .right {
    text-align: end;
    border-right: 3px solid #333;

    span {
      font-size: 18px;
    }

    .graph {
      height: 40px;
      border-radius: 5px 0 0 5px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      position: relative;
      overflow: hidden;
      border: 2px solid #333;
      border-right: none;
      padding: 2px;
      align-items: center;

      .bar {
        grid-area: 1/1/1/1;
        height: 100%;
        display: flex;
        border-radius: 3px 0 0 3px;
        padding: 5px;
        align-items: center;
        color: #666;
        font-weight: 600;
        justify-content: flex-end;
      }

      .budget {
        width: 100%;
      }

      .cost {
        color: #fff;
        grid-area: 1/1/1/1;
        border-right: 3px dashed #ff8800;
        background-color: #ffa500;
        width: 75%;
        background: linear-gradient(
          90deg,
          rgb(255, 183, 0) 0%,
          rgba(255, 165, 0, 1) 100%
        );
      }
    }
  }

  .body {
    overflow: hidden;
    display: grid;
    grid-template-rows: auto auto 1fr;

    .body-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 10px;

      .add-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: orange;
        color: #fff;
        padding: 3px;
        gap: 3px;
        width: 70px;
        border-radius: 50px;
      }
    }

    .add-form {
    }

    .list {
      padding-right: 5px;
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>

<script setup>
import { ref } from "vue";
import CostItem from "../components/CostItem.vue";
import { CirclePlus } from "lucide-vue-next";

const costlist = ref([
  {
    user: "小明",
    cost: 150,
    reason: "买零食",
    passed: "undo",
    remark: "",
  },
  {
    user: "小刚",
    cost: 648,
    reason: "充原神",
    passed: "false",
    remark: "手游充值不在活动报销范围内",
  },
  {
    user: "小李",
    cost: 35,
    reason: "打车路费",
    passed: "true",
    remark: "",
  },
  {
    user: "小李",
    cost: 35,
    reason: "打车路费",
    passed: "true",
    remark: "",
  },
  {
    user: "小李",
    cost: 35,
    reason: "打车路费",
    passed: "true",
    remark: "",
  },
]);
</script>
