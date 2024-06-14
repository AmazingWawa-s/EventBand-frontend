<template>
  <div v-if="costlist.budget == 0" class="w-budgets-not-work">
    <HandCoins class="emoji" :size="150" />
    <div class="budget-bar">
      设置预算以启用经费管理模块：
      <input type="number" v-model="newBudget" />
    </div>
    <div class="button" @click="activateBudget"><PiggyBank />启用</div>
  </div>
  <div v-else class="w-budgets-main-container">
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
              width: costBar * 100 + '%',
            }"
          >
            {{ costlist.costTotal }}
          </div>
        </div>
      </div>
      <div class="button" @click="changeBudget = !changeBudget">修改预算</div>
    </div>
    <div :class="{ 'change-budget': true, 'open-change-budget': changeBudget }">
      <input type="number" v-model="newBudget" />
      <div class="btn" @click="updateBudget">
        <Check />
      </div>
    </div>
    <div class="body">
      <div class="body-header">
        <div>记录</div>
        <!-- <div class="add-button">添加<CirclePlus :size="20" /></div> -->
      </div>
      <div class="list">
        <CostItem
          v-for="item in costlist.record"
          @handleCostItem="
            (passed, remark) => {
              handleCostItemPost(item, passed, remark);
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

.w-budgets-not-work {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25%;
  justify-content: center;
  background-color: #ffead2;
  position: relative;

  .emoji {
    position: absolute;
    top: 100%;
    transform: translate(0%, -90%);
    color: #ffca96;
    left: 0;
    rotate: 0deg;
  }

  .button {
    cursor: pointer;
    padding: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    border-radius: 5px;
    background-color: #ff8800;
    color: #fff;
  }

  .budget-bar {
    display: flex;
    align-items: center;
    color: #666;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    gap: 10px;
    input {
      width: 90px;
      background-color: #ffead2;
      border: 2px dashed #666;
      color: #666;
      border-radius: 5px;
      font-family: "Consolas";
    }
  }
}

.w-budgets-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-rows: auto auto 1fr;

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

  .change-budget {
    display: flex;
    white-space: nowrap;
    align-items: center;
    overflow: hidden;
    gap: 10px;
    max-height: 0;
    padding: 0 5px;

    input {
      border: 1.5px solid #333;
      border-radius: 5px;
    }
    transition: 300ms;

    .btn {
      display: flex;
      background-color: orange;
      color: #fff;
      height: 100%;
      align-items: center;
      padding: 0 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: 300ms;
    }

    .btn:hover {
      background-color: rgb(255, 153, 0);
    }
  }

  .open-change-budget {
    max-height: 200px;
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
import { computed, inject, onMounted, ref } from "vue";
import CostItem from "../components/CostItem.vue";
import { CirclePlus } from "lucide-vue-next";
import { TriangleAlert } from "lucide-vue-next";
import { HandCoins } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import { PiggyBank } from "lucide-vue-next";
import { ApiCostremarkExamine, ApiUpdateBudget } from "../api";

const costlist = inject("costList");
const eventId = inject("eventId");
const changeBudget = ref(false);
const costBar = computed(() => {
  let val = costlist.costTotal / costlist.budget;
  if (val < 0.1) {
    val = 0.1;
  } else if (val > 1) {
    val = 1;
  }
  return val;
});
const newBudget = ref(0);
onMounted(() => {
  newBudget.value = costlist.budget;
});

const updateBudget = () => {
  if (newBudget.value > 0) {
    const token = localStorage.getItem("token");
    ApiUpdateBudget(token, eventId.value, newBudget.value).then((res) => {
      console.log(res);
      const { updateDetailOk } = res.data;
      if (updateDetailOk) {
        costlist.budget = newBudget.value;
        changeBudget.value = false;
      }
    });
  }
};

const activateBudget = () => {
  if (newBudget.value > 0) {
    const token = localStorage.getItem("token");
    ApiUpdateBudget(token, eventId.value, newBudget.value).then((res) => {
      console.log(res);
      const { updateDetailOk } = res.data;
      if (updateDetailOk) {
        costlist.budget = newBudget.value;
      }
    });
  }
};

const handleCostItemPost = (item, passed, remark) => {
  const token = localStorage.getItem("token");
  ApiCostremarkExamine(token, item.cr_id, passed, remark).then((res) => {
    console.log(res);
    item.cr_passed = passed;
    item.cr_remark = remark;
  });
};
</script>
