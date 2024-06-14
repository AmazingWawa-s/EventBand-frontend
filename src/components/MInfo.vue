<template>
  <div class="m-info-main-container">
    <div class="frame">
      <div class="title">地点</div>
      <div class="divide"></div>
      <div class="row"><MapPinned :size="20" />{{ eventData.location }}</div>
    </div>
    <div class="frame">
      <div class="title">创办者</div>
      <div class="divide"></div>
      <div class="row"><SquareUserRound :size="20" />{{ eventData.user_name }}</div>
    </div>
    <div class="frame info">
      <div class="title brief">简介</div>
      <div class="divide"></div>
      <div class="info-content">{{ eventData.description }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-info-main-container {
  position: relative;
  z-index: @z-index-modules;
  padding: @event-detail-padding;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
  gap: @event-detail-gap;

  .divide {
    width: 5px;
    background-color: #ddd;
    border-radius: 10px;
  }

  .frame {
    height: 100%;
    width: 100%;
    display: grid;
    grid-column: 1/4;
    padding: 5px;
    grid-template-columns: subgrid;
  }

  .info {
    background-color: #eee;
    border-radius: 5px;
  }

  .row {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .title {
    font-weight: 600;
  }

  .brief {
    align-self: start;
  }

  .info-content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>

<script setup>
import { inject } from "vue";
import { MapPinned } from "lucide-vue-next";
import { SquareUserRound } from "lucide-vue-next";
import { Info } from "lucide-vue-next";
const eventData = inject("basicData");
</script>
