<template>
  <div class="m-budgets-main-container">
    <div class="budgets-header">经费报销</div>
    <div class="budgets-body">
      <div class="item">
        费用
        <input v-model="inputCost" type="number" value="0" />
      </div>
      <div class="item">
        理由
        <textarea v-model="inputReason" type="text" />
      </div>
      <div class="button" @click="requestCost">申请</div>
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
    grid-template-rows: 1fr 2fr auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
    gap: 5px;

    input {
      border: 1.5px solid #666;
      border-radius: 5px;
      width: 100px;
      font-family: "Consolas";
    }

    textarea {
      border: 1.5px solid #666;
      border-radius: 5px;
      width: 100%;
      resize: none;
      height: 100%;
    }

    .item {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }

    .button {
      justify-self: end;
      background-color: #eee;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  @media (min-width: 1366px) {
  }
}
</style>

<script setup>
import { Search } from "lucide-vue-next";
import { inject, ref } from "vue";
import { ApiCostremarkAdd } from "../api";
import { useStore } from "../store";

const inputReason = ref("");
const inputCost = ref(0);
const eventId = inject("eventId");
const store = useStore();

const requestCost = () => {
  if (inputReason.value && inputCost.value) {
    const token = localStorage.getItem("token");
    ApiCostremarkAdd(token, eventId.value, inputCost.value, inputReason.value).then(
      (res) => {
        console.log(res);
        const { addCostRemarkOk } = res.data;
        if (addCostRemarkOk) {
          store.systemInform = {
            type: "SUCCESS",
            content: "申请报销成功，请等待批准",
          };
        }
      }
    );
  }
};
</script>
