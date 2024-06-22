<template>
  <div class="m-budgets-main-container">
    <div class="budgets-header">活动反馈</div>
    <div class="budgets-body">
      <div class="item">
        评价
        <div class="emoji">
          <Angry
            @click="selectedEmoji = 0"
            :class="{ eitem: true, 'selected-a': selectedEmoji == 0 }"
          />
          <Annoyed
            @click="selectedEmoji = 1"
            :class="{ eitem: true, 'selected-b': selectedEmoji == 1 }"
          />
          <Smile
            @click="selectedEmoji = 2"
            :class="{ eitem: true, 'selected-c': selectedEmoji == 2 }"
          />
        </div>
      </div>
      <div class="item">
        反馈
        <textarea v-model="inputReason" type="text" />
      </div>
      <div class="button" @click="requestCost">提交</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-budgets-main-container {
  position: relative;
  z-index: @z-index-modules;
  overflow: hidden;
  width: 100%;
  background-color: rgb(255, 244, 217);
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

    textarea {
      border: 2px dashed rgb(245, 212, 48);
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

      .emoji {
        display: flex;
        background-color: #fff9bc;
        box-shadow: 0 2px 5px #fdf279;
        padding: 5px;
        border-radius: 50px;
        width: 200px;
        justify-content: space-around;
        gap: 5px;

        .eitem {
          color: #aaa;
          cursor: pointer;
        }

        .selected-a {
          color: rgb(211, 54, 22);
        }

        .selected-b {
          color: rgb(246, 156, 0);
        }

        .selected-c {
          color: rgb(21, 156, 68);
        }
      }
    }

    .button {
      justify-self: end;
      background-color: rgb(255, 151, 54);
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
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
import { ApiCommentAdd, ApiCostremarkAdd } from "../api";
import { Angry } from "lucide-vue-next";
import { Smile } from "lucide-vue-next";
import { Annoyed } from "lucide-vue-next";
const inputReason = ref("");
const selectedEmoji = ref(2);
const eventId = inject("eventId");

const requestCost = () => {
  if (inputReason.value) {
    const token = localStorage.getItem("token");
    ApiCommentAdd(token, inputReason.value, eventId.value, new Date().getTime()).then(
      (res) => {
        console.log(res);
        inputReason.value = "";
      }
    );
  }
};
</script>
