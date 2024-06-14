<template>
  <div class="m-schedule-main-container">
    <div class="schedule-header">
      <div class="front">活动安排</div>
      <div class="end" @click="() => (addScheduleButton = !addScheduleButton)">
        <div class="button-frame"><CalendarPlus :size="16" />添加新日程</div>
      </div>
    </div>
    <div class="schedule-body">
      <div :class="{ 'schedule-add-frame': true, 'frame-close': !addScheduleButton }">
        <div class="schedule-form time">
          <div>时间：</div>
          <input v-model="inputTime" type="text" />
        </div>
        <div class="schedule-form title">
          标题：
          <input v-model="inputTitle" type="text" />
        </div>
        <div class="schedule-form detail">
          详情：
          <textarea v-model="inputContent" />
        </div>
        <div class="schedule-form participants">
          人员：
          <input v-model="inputParticipants" type="text" />
        </div>
        <div class="schedule-form button" @click="AddSubEvents">确定</div>
      </div>
      <div v-if="scheduleData.content.length > 0" class="schedule-grid">
        <div class="grid-header">
          <div
            :class="{ 'date-tab': true, 'date-tab-active': index == dateTabSelected }"
            v-for="(data, index) in scheduleData.content"
            @click="() => (dateTabSelected = index)"
            :key="data"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="grid-body">
          <div class="schedule-item">
            <div class="item-header">
              <div class="item-time">
                {{ scheduleData.content[dateTabSelected].event_sub_time }}
              </div>
              <div
                class="item-content"
                :title="scheduleData.content[dateTabSelected].event_sub_title"
              >
                <div>{{ scheduleData.content[dateTabSelected].event_sub_title }}</div>
              </div>
            </div>
            <div class="item-detail">
              {{ scheduleData.content[dateTabSelected].event_sub_content }}
            </div>
            <div class="item-bottom">
              <div class="item-participants-frame">
                <div>参与者:</div>
                <div class="item-participants">
                  <!-- <div v-for="tab in item.participants" :key="tab">
                    {{ tab }}
                  </div> -->
                  {{ scheduleData.content[dateTabSelected].event_sub_participants }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@item-frame-color: rgb(255, 127, 127);
@item-content-color: rgb(255, 127, 127);

.m-schedule-main-container {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  z-index: @z-index-modules;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr;

  .schedule-header {
    font-weight: 600;
    user-select: none;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .end {
      display: flex;
      align-items: center;
      gap: 5px;

      .button-frame {
        border-radius: 5px;
        border: 2px solid #333;
        display: flex;
        gap: 5px;
        padding: 5px;
        font-size: 16px;
        font-weight: 500;
        align-items: center;
        cursor: pointer;
        justify-content: center;
      }
    }
  }

  .schedule-body {
    overflow: hidden;
    height: 100%;
    width: 100%;

    .schedule-add-frame {
      height: 100%;
      transition: 300ms;
      overflow: hidden;
      display: flex;
      font-size: 16px;
      flex-direction: column;
      justify-content: space-between;

      .schedule-form {
        display: flex;
        white-space: nowrap;
        align-items: center;
        gap: 5px;
      }

      .button {
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 10px;
        align-self: end;
        background-color: #eee;
      }
    }

    .frame-close {
      height: 0;
    }

    .schedule-grid {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: auto 1fr;

      .grid-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        user-select: none;
        width: 66px;
        font-family: "impact";
        align-items: flex-end;

        .date-tab {
          border-radius: 5px 0 0 5px;
          padding: 5px;
          flex-shrink: 0;
          color: rgb(250, 164, 164);
          background-color: rgb(255, 227, 215);
          font-size: 24px;
          width: 100%;
          cursor: pointer;
        }

        .date-tab-active {
          font-size: 28px;
          color: @theme-color;
          background-color: rgb(255, 240, 233);
        }
      }

      .grid-body {
        height: 100%;
        width: 100%;
        padding: 10px;
        background-color: rgb(255, 240, 233);
        overflow-y: scroll;
        border-radius: 0 5px 5px 5px;
        gap: 10px;
        display: flex;
        flex-direction: column;

        .schedule-item {
          flex-shrink: 0;
          overflow: hidden;
          border: 2px solid @item-frame-color;
          border-radius: 5px 5px 20px 5px;
          display: grid;
          grid-template-rows: auto 1fr;
          background-color: @item-frame-color;
          box-shadow: 0 2px 5px rgb(229, 129, 129);
          height: 100%;

          .item-header {
            display: grid;
            height: 30px;
            background-color: @item-frame-color;
            grid-template-columns: auto 1fr;
            align-items: center;
            overflow: hidden;
            width: 100%;
          }

          .item-time {
            color: #fff;
            font-weight: 600;
            height: 100%;
            white-space: nowrap;
            padding: 5px;
            position: relative;
          }

          .item-place {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 16px;
            padding-right: 5px;
            height: 100%;
            white-space: nowrap;
          }

          .item-content {
            width: 100%;
            background-color: #fff;
            border-bottom: 2px dashed @item-frame-color;
            padding: 0 5px;
            font-size: 18px;
            overflow: hidden;
            display: flex;
            align-items: center;
            height: 100%;
            div {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .item-bottom {
            padding: 5px;
            background-color: @item-content-color;
            display: flex;
            align-items: center;
            gap: 5px;
            justify-content: space-between;
          }

          .item-detail {
            background-color: @item-content-color;
            padding: 5px;
            font-size: 16px;
            background-color: #fff;
            border-radius: 5px;
          }

          .item-participants-frame {
            display: grid;
            grid-template-columns: auto 1fr;
            font-size: 14px;
            gap: 5px;
            align-items: center;
            color: #fff;
            background-color: rgb(187, 43, 43);
            padding: 10px;
            border-radius: 20px;
            box-shadow: 0 2px 5px rgb(238, 82, 82);

            .item-participants {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 5px;

              div {
                border: 1px solid #333;
                padding: 5px;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script setup>
import { inject, ref } from "vue";
import { CalendarPlus } from "lucide-vue-next";
import { MapPin } from "lucide-vue-next";
import { ApiAddSubEvent } from "../api";

const dateTabSelected = ref(0);

const addScheduleButton = ref(false);

const scheduleData = inject("subevents");
const eventId = inject("eventId");

const inputContent = ref("");
const inputParticipants = ref("");
const inputTime = ref("");
const inputTitle = ref("");

const AddSubEvents = () => {
  if (
    (inputContent.value && inputParticipants.value && inputTime.value, inputTime.value)
  ) {
    const token = localStorage.getItem("token");
    ApiAddSubEvent(
      token,
      eventId.value,
      inputTime.value,
      inputTitle.value,
      inputContent.value,
      inputParticipants.value
    ).then((res) => {
      console.log(res);
      const { addOk } = res.data;
      if (addOk) {
        scheduleData.content.push({
          event_sub_content: inputContent.value,
          event_sub_participants: inputParticipants.value,
          event_sub_time: inputTime.value,
          event_sub_title: inputTitle.value,
        });
        inputTime.value = "";
        inputTitle.value = "";
        inputContent.value = "";
        inputParticipants.value = "";
        addScheduleButton.value = false;
      }
    });
  }
};

// const scheduleData = ref([
//   {
//     date: "4/20",
//     events: [
//       {
//         time1: "9:00",
//         time2: "10:00",
//         content: "穿越书海遇见你——锡图换书大集",
//         place: "一楼大厅",
//         detail: "详情见群通知",
//         participants: ["全体"],
//       },
//       {
//         time1: "9:00",
//         time2: "10:00",
//         content: "穿越书海遇见你——锡图换书大集",
//         place: "一楼大厅",
//         detail: "详情见群通知",
//         participants: ["全体"],
//       },
//       {
//         time1: "9:00",
//         time2: "10:00",
//         content: "穿越书海遇见你——锡图换书大集",
//         place: "一楼大厅",
//         detail: "详情见群通知",
//         participants: ["全体"],
//       },
//       {
//         time1: "9:00",
//         time2: "17:00",
//         content: "翰墨流彩 “签”映书香",
//         place: "二楼接待处",
//         participants: [
//           "小明",
//           "小刚",
//           "小红",
//           "小刚",
//           "小红",
//           "小刚",
//           "小红",
//           "小刚",
//           "小红",
//         ],
//       },
//     ],
//   },
//   {
//     date: "4/21",
//     events: [
//       {
//         time1: "9:00",
//         time2: "10:00",
//         content: "东林文化讲坛:中国古典诗词的理解与欣赏理解与欣赏",
//         place: "一楼展览处",
//         participants: ["全体"],
//       },
//     ],
//   },
//   {
//     date: "4/25",
//     events: [
//       {
//         time1: "9:00",
//         time2: "10:00",
//         content: "吴文化专题讲座:《无锡梅里遗址考古报告》解读",
//         participants: ["全体"],
//       },
//     ],
//   },
// ]);
</script>
