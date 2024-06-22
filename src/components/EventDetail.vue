<template>
  <div v-if="!loading" class="eventdetail-main-container">
    <div class="schedule">
      <div class="event-title">
        <div class="divide"></div>
        {{ eventData.name }}
      </div>
      <div class="module-frame">
        <MSchedule />
      </div>
    </div>
    <div class="info">
      <div class="module-frame">
        <MInfo />
      </div>
      <div class="module-frame">
        <MCountdown :countdown="countdown" />
      </div>
    </div>
    <div class="module-frame participants">
      <MParticipants :eventId="eventId" />
    </div>
    <div class="module-frame feedback">
      <MOthers />
    </div>
  </div>
  <div class="loading" v-else>
    <div>
      <Loading />
    </div>
  </div>
</template>

<style lang="less" scoped>
.loading {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

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
      display: flex;
      gap: 5px;
      font-size: 1.2rem;

      .divide {
        width: 5px;
        height: 100%;
        border-radius: 10px;
        background-color: #666;
      }
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
import Loading from "../components/svg/Loading.vue";
import { computed, onMounted, provide, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ApiEventDetail } from "../api";
const router = useRouter();

const loading = ref(true);
const filterOn = ref(false);
const participantGroups = reactive({
  content: [
    {
      group_name: "全部",
      group_id: -1,
      group_event_id: -1,
    },
  ],
});
const supplies = reactive({
  content: [],
});
const costList = reactive({
  budget: 0,
  costTotal: 0,
  record: [],
});
const countdown = computed(() => {
  const date2 = new Date();
  const date1 = eventData.event_start_date;
  const date3 = eventData.event_end_date;
  return (
    parseInt((new Date(date1).getTime() - date2.getTime()) / 1000 / 60 / 60 / 24) + 1
  );
});
const eventData = reactive({
  person_max: -1,
  event_type: 0,
  event_ready: 0,
  name: "",
  description: "",
  event_start_date: "",
  user_name: "",
  location: "",
});
const participantList = reactive({
  content: [],
});
const subEvents = reactive({
  content: [],
});

const eventId = ref();

onMounted(() => {
  eventId.value = parseInt(router.currentRoute.value.query.id);
  console.log(router.currentRoute.value.query.id);
  let token = localStorage.getItem("token");
  ApiEventDetail(token, eventId.value).then((res) => {
    console.log(res);
    const {
      costRemarks,
      eventbrief,
      eventdetail,
      groups,
      participants,
      resources,
      subevents,
    } = res.data.data;
    supplies.content = resources;
    costList.record = costRemarks;
    costList.budget = eventdetail.event_budget;
    costList.costTotal = eventdetail.event_cost;
    participantList.content = participants;
    participantGroups.content = participantGroups.content.concat(groups);
    eventData.person_max = eventdetail.event_person_max;
    eventData.event_type = eventbrief.event_type;
    eventData.event_ready = eventbrief.event_ready;
    eventData.description = eventbrief.event_description;
    eventData.event_start_date = eventbrief.event_start_date;
    eventData.name = eventbrief.event_name;
    eventData.user_name = eventbrief.event_creator_name;
    eventData.location = eventbrief.location_firstname + " " + eventbrief.location_name;
    subEvents.content = subevents;
    loading.value = false;
  });
  console.log(participantList);
});

provide("supplies", supplies);
provide("costList", costList);
provide("participants", participantList);
provide("groups", participantGroups);
provide("basicData", eventData);
provide("eventId", eventId);
provide("subevents", subEvents);
</script>
