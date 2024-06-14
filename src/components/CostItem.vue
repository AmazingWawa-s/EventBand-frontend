<template>
  <div
    :class="{
      'cost-item-main-container': true,
      rejected: cr_passed == 'false',
      passed: cr_passed == 'true',
    }"
  >
    <div v-show="cr_passed == 'false'" class="sign"></div>
    <div class="top">
      <div class="left">
        <div class="info">
          <div class="user" :title="cr_user_name">
            <UserRound :size="16" />{{ cr_user_name }}
          </div>
          <div class="reason" :title="cr_reason">
            <WalletMinimal :size="16" />{{ cr_reason }}
          </div>
        </div>
        <div class="cost">
          <span>￥</span>
          <span>{{ cr_cost }}</span>
        </div>
      </div>
      <div class="buttons">
        <div
          v-if="cr_passed == 'undo' || cr_passed == 'true'"
          @click="handleConfirm(true)"
          :class="{ button: true, active: confirm == 'true', fixed: cr_passed != 'undo' }"
        >
          <!-- <Check /> -->
          {{ confirm == "true" ? "确认" : "通过" }}
        </div>
        <div
          v-if="cr_passed == 'undo' || cr_passed == 'false'"
          :class="{
            button: true,
            active: confirm == 'false',
            fixed: cr_passed != 'undo',
          }"
          @click="handleConfirm(false)"
        >
          <!-- <X /> -->
          {{ confirm == "false" ? "确认" : "驳回" }}
        </div>
      </div>
    </div>
    <div :class="{ bottom: true, isopened: remarkOpen || cr_passed == 'false' }">
      <MessageSquareX :size="16" />
      <input v-if="!cr_remark" v-model="preRemark" type="text" placeholder="请输入原因" />
      {{ cr_remark }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.cost-item-main-container {
  width: 100%;
  font-size: 16px;
  border: 1.5px solid #333;
  flex-shrink: 0;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  overflow: hidden;

  .sign {
    position: absolute;
    width: 300px;
    height: 30px;
    background-color: #eee;
    top: 30%;
    transform: translateY(-50%);
    rotate: -25deg;
    left: 0;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
  .sign::after {
    pointer-events: none;
    content: "";
    position: absolute;
    width: 300px;
    height: 30px;
    background-color: #eee;
    top: 50%;
    transform: translateY(-50%);
    rotate: -90deg;
    left: -40px;
  }

  .top {
    display: grid;
    grid-template-columns: 1fr 60px;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    height: 53px;

    .left {
      grid-row: 1/3;
      display: grid;
      grid-template-rows: subgrid;
      height: 100%;
      grid-template-columns: 1fr 80px;

      .info {
        height: 100%;
        grid-row: 1/3;
        display: grid;
        grid-template-rows: subgrid;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .user {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .reason {
          display: flex;
          gap: 5px;
          align-items: center;
        }
      }
    }

    .cost {
      grid-row: 1/3;
      font-weight: 600;
      font-size: 20px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .buttons {
      display: grid;
      grid-row: 1/3;
      gap: 5px;

      .button {
        height: 100%;
        width: 100%;
        transition: 150ms;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: #ffe3c4;
        user-select: none;
        color: rgb(255, 136, 0);
        cursor: pointer;
      }

      .active {
        background-color: rgb(255, 136, 0);
        color: #fff;
      }

      .fixed {
        background-color: #fff;
        color: #333;
      }
    }
  }

  .bottom {
    overflow: hidden;
    max-height: 0;
    transition: 300ms;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;

    input {
      height: 28px;
      font-size: 14px;
      border-radius: 5px;
    }
  }

  .isopened {
    max-height: 40px;
    margin-top: 10px;
  }
}

.rejected {
  // opacity: 0.8;
  color: #888;
  border: 1.5px solid #888;

  .button {
    pointer-events: none;
  }
}

.passed {
  .button {
    pointer-events: none;
  }
}
</style>

<script setup>
import { UserRound } from "lucide-vue-next";
import { WalletMinimal } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import { X } from "lucide-vue-next";
import { ref } from "vue";
import { MessageSquareX } from "lucide-vue-next";
const emit = defineEmits(["handleCostItem"]);
const props = defineProps([
  "cr_user_name",
  "cr_cost",
  "cr_reason",
  "cr_passed",
  "cr_remark",
]);
const remarkOpen = ref(false);
const confirm = ref("undo");
const preRemark = ref("");
const handleConfirm = (flag) => {
  if (
    (confirm.value == "true" && flag) ||
    (confirm.value == "false" && !flag && preRemark.value)
  ) {
    // props.passed = confirm.value;
    // props.remark = preRemark.value;
    emit("handleCostItem", confirm.value, preRemark.value);
    preRemark.value = "";
    remarkOpen.value = false;
    confirm.value = "undo";
  } else {
    confirm.value = flag ? "true" : "false";
    remarkOpen.value = !flag;
  }
};
</script>
