<template>
  <div class="w-settings-main-container">
    <div class="form">
      <div>是否公开:</div>
      <div class="form-content">
        <div @click="switch1 = true" class="select-box-frame">
          <CircleCheckBig v-if="switch1" :size="18" />
          <Circle v-else :size="18" />
          <div>是</div>
        </div>
        <div @click="switch1 = false" class="select-box-frame">
          <Circle v-if="switch1" :size="18" />
          <CircleCheckBig v-else :size="18" />
          <div>否</div>
        </div>
      </div>
      <div>最大人数:</div>
      <div class="form-content">
        <div @click="switch2 = true" class="select-box-frame">
          <CircleCheckBig v-if="switch2" :size="18" />
          <Circle v-else :size="18" />
          <div>不限</div>
        </div>
        <div @click="switch2 = false" class="select-box-frame">
          <Circle v-if="switch2" :size="18" />
          <CircleCheckBig v-else :size="18" />
          <input type="number" />
        </div>
      </div>
      <div>筹备进度:</div>
      <div class="form-content">
        <div @click="switch3 = true" class="select-box-frame">
          <CircleCheckBig v-if="switch3" :size="18" />
          <Circle v-else :size="18" />
          <div>筹备中</div>
        </div>
        <div @click="switch3 = false" class="select-box-frame">
          <Circle v-if="switch3" :size="18" />
          <CircleCheckBig v-else :size="18" />
          <div>筹备完毕</div>
        </div>
      </div>
      <div class="delete">
        <div class="divide"></div>
        <GripVertical />
        <div class="button">
          <div class="content"><TriangleAlert />删除活动</div>
        </div>
        <GripVertical />
        <div class="divide"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.w-settings-main-container {
  padding: 10px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  user-select: none;
  justify-content: center;

  .form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    width: 100%;
    max-width: 340px;
    white-space: nowrap;
    height: 100%;

    .delete {
      grid-column: 1/3;
      display: flex;
      align-items: center;
      color: @theme-color;
      justify-content: center;

      .button {
        border: 2px solid @theme-color;
        padding: 2px;
        border-radius: 10px;
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        overflow: hidden;
        cursor: pointer;

        .content {
          background-color: #fff;
          z-index: 2;
          padding: 8px;
          border-radius: 8px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }

      .button::after {
        content: "";
        position: absolute;
        z-index: 1;
        background-color: @theme-color;
        width: 100%;
        height: 100%;
        top: 0;
        transition: 2000ms;
        left: -100%;
      }

      .button:active::after {
        left: 0;
      }

      .divide {
        flex-grow: 1;
        height: 3px;
        background-color: @theme-color;
        border-radius: 10px;
      }
    }

    .form-content {
      gap: 20px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .select-box-frame {
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 10px;

      input {
        max-width: 70px;
      }

      .select-box {
        width: 16px;
        height: 16px;
        background-color: #eee;
        border-radius: 5px;
        border: 2px solid #aaa;
        position: relative;
      }
    }
  }
}
</style>

<script setup>
import { Check } from "lucide-vue-next";
import { TriangleAlert } from "lucide-vue-next";
import { LoaderCircle } from "lucide-vue-next";
import { GripVertical } from "lucide-vue-next";
import { CircleCheckBig } from "lucide-vue-next";
import { Circle } from "lucide-vue-next";
import { ref } from "vue";

const switch1 = ref(false);
const switch2 = ref(false);
const switch3 = ref(false);
</script>
