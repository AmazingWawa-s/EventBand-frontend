<template>
  <div class="w-budgets-main-container">
    <div class="header">
      <div class="right">
        {{ costlist.budget }}
        <div class="graph">
          <div class="budget bar"></div>
          <div
            :class="{
              cost: costlist.costTotal < costlist.budget,
              bar: true,
              overcost: costlist.costTotal >= costlist.budget,
            }"
            :style="{
              width:
                (costlist.costTotal / costlist.budget < 1
                  ? costlist.costTotal / costlist.budget
                  : 1) *
                  100 +
                '%',
            }"
          >
            {{ costlist.costTotal }}
          </div>
        </div>
      </div>
      <div class="button" @click="costlist.budget += 500">修改预算</div>
    </div>
    <div class="body">
      <div class="body-header">
        <div>记录</div>
        <!-- <div class="add-button">添加<CirclePlus :size="20" /></div> -->
      </div>
      <div class="add-form"></div>
      <div class="list">
        <CostItem
          v-for="item in costlist.record"
          @handleCostItem="
            (passed, remark) => {
              item.passed = passed;
              item.remark = remark;
            }
          "
          v-bind="item"
          :key="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@bar-frame-color: #333;

.w-budgets-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-rows: auto 1fr;

  .header {
    font-family: "Consolas";
    user-select: none;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 3px;
    color: @bar-frame-color;

    .button {
      font-size: 16px;
      border: 2px solid @bar-frame-color;
      border-left: 3px solid @bar-frame-color;
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
    border-right: 3px solid @bar-frame-color;

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
      border: 2px solid @bar-frame-color;
      border-right: none;
      padding: 2px;
      align-items: center;

      .bar {
        grid-area: 1/1/1/1;
        height: 100%;
        display: flex;
        border-radius: 3px 0 0 3px;
        padding: 0 5px;
        align-items: center;
        font-weight: 600;
        justify-content: flex-end;
        transition: 300ms;
      }

      .budget {
        width: 100%;
      }

      .cost {
        color: #fff;
        grid-area: 1/1/1/1;
        border-right: 3px dashed #ff8800;
        background-color: #ffa500;
        background: linear-gradient(
          90deg,
          rgb(255, 183, 0) 0%,
          rgba(255, 165, 0, 1) 100%
        );
      }

      .overcost {
        color: #fff;
        background-color: #ffa500;
        background: linear-gradient(90deg, rgb(255, 115, 0) 0%, rgb(255, 85, 0) 100%);
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
import { inject, ref } from "vue";
import CostItem from "../components/CostItem.vue";
import { CirclePlus } from "lucide-vue-next";
import { TriangleAlert } from "lucide-vue-next";

const costlist = inject("costList");
</script>
