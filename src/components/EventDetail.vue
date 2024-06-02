<template>
  <div class="eventdetail-main-container">
    <div class="schedule">
      <div class="event-title">“书香四月 向美而行”2024年读者嘉年华活动</div>
      <div class="module-frame">
        <MSchedule />
      </div>
    </div>
    <div class="info">
      <div class="module-frame">
        <MInfo />
      </div>
      <div class="module-frame">
        <MProgress />
      </div>
    </div>
    <div class="module-frame participants">
      <MParticipants />
    </div>
    <div class="module-frame feedback">
      <MOthers />
    </div>
  </div>
</template>

<style lang="less" scoped>
.eventdetail-main-container {
  position: relative;
  z-index: @z-index-body;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 1366px;
  padding: @event-detail-padding;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "a a a a b b"
    "a a a a b b"
    "c c c e e e"
    "c c c e e e";
  gap: @event-detail-gap;

  .module-frame {
    border-radius: @user-item-border-radius-sub;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }

  .schedule {
    grid-area: a;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: @event-detail-gap;

    .event-title {
      margin-left: 5px;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }

  .info {
    grid-area: b;
    display: grid;
    width: 100%;
    height: 100%;
    gap: @event-detail-gap;
    overflow: hidden;
    grid-template-rows: 3fr 1fr;
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
import MOthers from "../components/MOthers.vue";
import MInfo from "../components/MInfo.vue";
import MProgress from "../components/MProgress.vue";
import { ref } from "vue";

const filterOn = ref(false);

// const eventData = ref({
//   title: "“书香四月 向美而行”2024年读者嘉年华活动",
//   info: "",
//   place: "无锡市图书馆",
//   org: "无锡市图书馆",
// });
</script>
