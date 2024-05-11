<template>
  <div class="eventdetail-main-container">
    <div class="module-frame schedule">
      <MSchedule />
    </div>
    <div class="module-frame info">基本信息：活动名称，活动地点，简介</div>
    <div class="module-frame participants">
      <MParticipants />
    </div>
    <div class="module-frame budgets">
      <MBudgets />
    </div>
    <div class="module-frame feedback">活动反馈模块</div>
  </div>
</template>

<style lang="less" scoped>
@border-radius-L: 10px;
@padding-L: 10px;
@gap: 10px;

.eventdetail-main-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 1366px;
  padding: @padding-L;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "a a a a b b"
    "a a a a b b"
    "c c c d d d"
    "c c c e e e";
  gap: @gap;

  .module-frame {
    border-radius: @border-radius-L;
    border: 1px solid #eee;
    background-color: #fff;
    width: 100%;
    height: 100%;
  }

  .schedule {
    grid-area: a;
  }

  .info {
    grid-area: b;
  }

  .participants {
    grid-area: c;
  }

  .budgets {
    grid-area: d;
  }

  .feedback {
    grid-area: e;
  }
}
</style>

<script setup>
import MSchedule from "../components/MSchedule.vue";
import MParticipants from "../components/MParticipants.vue";
import MBudgets from "../components/MBudgets.vue"
</script>
