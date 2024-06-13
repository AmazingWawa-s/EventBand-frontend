<template>
  <div v-if="countdown > 0" class="m-progress-main-container">
    <div class="bg"><Clock3 :size="136" /></div>
    <div class="ft word">距离活动开始还有</div>
    <div class="ft count">{{ countdown }}</div>
    <div class="ft word">天</div>
  </div>
  <div v-else-if="countdown == 0" class="m-progress-main-container">
    <div class="bg"><FastForward :size="136" /></div>
    <div class="ft word2">活动进行中...</div>
  </div>
  <div v-else class="m-progress-main-container">
    <div class="bg"><Goal :size="108" /></div>
    <div class="ft word2">活动已结束</div>
  </div>
</template>

<style lang="less" scoped>
.m-progress-main-container {
  position: relative;
  z-index: @z-index-modules;
  overflow: hidden;
  width: 100%;
  background-color: @theme-color;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  padding: 10px;

  .bg {
    position: absolute;
    color: #af171c;
    rotate: -15deg;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 10%;
  }

  .ft {
    z-index: 2;
  }

  .word {
    font-size: 20px;
  }

  .word2 {
    font-size: 24px;
  }

  .count {
    font-size: 64px;
    font-weight: 600;
    font-family: "Consolas";
  }
}
</style>

<script setup>
import { Clock3 } from "lucide-vue-next";
import { FastForward } from "lucide-vue-next";
import { Goal } from "lucide-vue-next";
const props = defineProps(["countdown"]);
</script>
