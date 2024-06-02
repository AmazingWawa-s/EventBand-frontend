<template>
  <div class="cost-item-main-container">
    <div class="top">
      <div class="left">
        <div class="info">
          <div class="user"><UserRound :size="16" />{{ user }}</div>
          <div class="reason"><WalletMinimal :size="16" />{{ reason }}</div>
        </div>
        <div class="cost">
          <span>￥</span>
          <span>{{ cost }}</span>
        </div>
      </div>
      <div class="buttons">
        <div v-if="passed == 'undo' || passed == 'true'" class="true button">
          <Check />
        </div>
        <div
          v-if="passed == 'undo' || passed == 'false'"
          class="false button"
          @click="remarkOpen = !remarkOpen"
        >
          <X />
        </div>
      </div>
    </div>
    <div :class="{ bottom: true, isopened: remarkOpen || passed == 'false' }">
      <MessageSquareX :size="16" />
      <input v-if="!remark" type="text" />
      {{ remark }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.cost-item-main-container {
  width: 100%;
  font-size: 16px;
  border: 1.5px solid #666;
  flex-shrink: 0;
  border-radius: 5px;
  padding: 5px;

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
      background-color: #fff;
      grid-template-columns: 3fr 1fr;

      .info {
        height: 100%;
        grid-row: 1/3;
        display: grid;
        grid-template-rows: subgrid;

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
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
      }

      .true {
        background-color: #2cbd00;
      }

      .false {
        background-color: #ff4242;
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
</style>

<script setup>
import { UserRound } from "lucide-vue-next";
import { WalletMinimal } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import { X } from "lucide-vue-next";
import { ref } from "vue";
import { MessageSquareX } from "lucide-vue-next";

const props = defineProps(["user", "cost", "reason", "passed", "remark"]);
const remarkOpen = ref(false);
</script>
