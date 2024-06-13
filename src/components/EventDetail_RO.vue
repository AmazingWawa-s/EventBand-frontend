<template>
  <div class="eventdetail-main-container">
    <div class="schedule">
      <div class="event-title">{{ eventData.title }}</div>
      <div class="module-frame">
        <MSchedule />
      </div>
    </div>
    <div class="info">
      <div class="module-frame">
        <MInfo />
      </div>
      <div class="module-frame">
        <MCountdown :countdown="1" />
      </div>
    </div>
    <div class="module-frame participants">
      <MParticipants :eventId="eventId" />
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
import MCountdown from "../components/MCountdown.vue";
import { onMounted, provide, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ApiEventDetail } from "../api";
const router = useRouter();
const filterOn = ref(false);
const supplies = reactive([
  {
    name: "麦克风",
    amount: 9,
    ready: true,
  },
  {
    name: "音箱",
    amount: 2,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
  {
    name: "宣传手册",
    amount: 100,
    ready: false,
  },
]);
const costList = reactive({
  budget: 2000,
  costTotal: 1500,
  record: [
    {
      user: "小明",
      cost: 150,
      reason: "玩元神玩元神玩元神玩元神玩元神玩元神玩元神",
      passed: "undo",
      remark: "",
    },
    {
      user: "小明",
      cost: 150,
      reason: "买零食",
      passed: "undo",
      remark: "",
    },
    {
      user: "小刚",
      cost: 648,
      reason: "充原神",
      passed: "false",
      remark: "手游充值不在活动报销范围内",
    },
    {
      user: "小李",
      cost: 35,
      reason: "打车路费",
      passed: "true",
      remark: "",
    },
  ],
});
const eventData = ref({
  title: "“书香四月 向美而行”2024年读者嘉年华活动",
  info:
    "无锡市图书馆特别策划“书香四月 向美而行”2024年读者嘉年华，线上线下集中开展40余场丰富多彩的阅读活动，展现图书馆的多元特色。",
  place: "无锡市图书馆",
});
const eventId = ref();

onMounted(() => {
  eventId.value = parseInt(router.currentRoute.value.query.id);
  console.log(router.currentRoute.value.query.id);
  let token = localStorage.getItem("token");
  ApiEventDetail(token, eventId.value).then((res) => {
    console.log(res);
  });
});

provide("supplies", supplies);
provide("costList", costList);
</script>
