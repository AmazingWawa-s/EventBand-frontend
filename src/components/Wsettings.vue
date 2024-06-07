<template>
  <div class="w-settings-main-container">
    <div class="form">
      <div>是否公开:</div>
      <div class="form-content">
        <div class="select-box-frame">
          <div class="select-box"><Check :size="20" class="select" /></div>
          <div>是</div>
        </div>
        <div class="select-box-frame">
          <div class="select-box"></div>
          <div>否</div>
        </div>
      </div>
      <div>最大人数:</div>
      <div>不限/10人</div>
      <div>筹备进度:</div>
      <div>筹备中/筹备完毕</div>
      <div>删除活动</div>
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
    height: 100%;

    .form-content {
      gap: 20px;
      display: flex;
    }

    .select-box-frame {
      display: flex;
      cursor: pointer;
      gap: 10px;

      .select-box {
        width: 16px;
        height: 16px;
        background-color: #eee;
        border-radius: 5px;
        border: 2px solid #aaa;
        position: relative;

        .select {
          color: #333;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
        }
      }
    }
  }
}
</style>

<script setup>
import { Check } from "lucide-vue-next";
</script>
