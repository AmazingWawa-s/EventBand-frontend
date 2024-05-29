<template>
  <div class="m-schedule-main-container">
    <div class="schedule-header">
      <div class="front">活动日程表</div>
      <div class="end" @click="() => (addScheduleButton = !addScheduleButton)">
        <div class="button-frame">+ 添加新日程</div>
      </div>
    </div>
    <div class="schedule-body">
      <div
        :class="{ 'schedule-add-frame': true, 'frame-close': !addScheduleButton }"
      ></div>
      <div class="schedule-grid">
        <div class="grid-header">
          <div
            :class="{ 'date-tab': true, 'date-tab-active': index == dateTabSelected }"
            v-for="(data, index) in scheduleData"
            @click="() => (dateTabSelected = index)"
            :key="data"
          >
            {{ data.date }}
          </div>
        </div>
        <div class="grid-body">
          <div
            class="schedule-item"
            v-for="item in scheduleData[dateTabSelected].events"
            :key="item"
          >
            <div class="item-header">
              <div class="item-time">
                {{ item.time1 + " ~ " + item.time2 }}
              </div>
              <div class="item-place">
                <img src="../assets/place.svg" alt="" />
                {{ item.place }}
              </div>
            </div>
            <div class="item-content">
              {{ item.content }}
              <div v-if="item.detail" class="item-detail">{{ item.detail }}</div>
            </div>
            <div class="item-participants">
              参与者：
              <div v-for="tab in item.participants" :key="tab">
                {{ tab }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-schedule-main-container {
  position: relative;
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
    }

    .frame-close {
      height: 0;
    }

    .schedule-grid {
      height: 100%;
      width: 100%;
      gap: 5px;
      display: grid;
      grid-template-rows: auto 1fr;

      .grid-header {
        display: flex;
        gap: 5px;
        user-select: none;
        align-items: flex-end;

        .date-tab {
          border-radius: 5px;
          padding: 5px;
          flex-shrink: 0;
          color: #fff;
          background-color: rgb(159, 159, 159);
          font-size: 14px;
          cursor: pointer;
        }

        .date-tab-active {
          font-size: 18px;
          background-color: @theme-black;
        }
      }

      .grid-body {
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        gap: 10px;
        padding-right: 5px;
        display: flex;
        flex-direction: column;

        .schedule-item {
          flex-shrink: 0;
          overflow: hidden;
          // background-color: rgb(255, 206, 206);
          border: 2px solid @theme-black;
          border-radius: 6px 6px 20px 6px;

          .item-header {
            display: flex;
            height: 30px;
            user-select: none;
            justify-content: space-between;
            align-items: center;

            .item-time {
              color: #fff;
              font-weight: 600;
              background-color: @theme-black;
              height: 100%;
              padding: 5px;
              border-radius: 0 0 5px 0;
              position: relative;
            }

            .item-place {
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 16px;
              padding-right: 5px;
              flex-grow: 1;
              height: 100%;
              white-space: nowrap;
              img {
                height: 80%;
              }
            }
          }

          .item-content {
            padding: 10px;
            border-radius: 5px 0 0 0;
            background-color: #fff;
            border-bottom: 2px dashed #ddd;

            .item-detail {
              padding-top: 10px;
              padding-left: 5px;
              font-size: 16px;
              background-color: #fff;
            }
          }

          .item-participants {
            padding: 5px 10px;
            background-color: #eee;
            font-size: 14px;
            display: flex;
            align-items: center;

            div {
              border: 1px solid #333;
              padding: 5px;
              margin: 0 5px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup>
import { ref } from "vue";

const dateTabSelected = ref(0);

const addScheduleButton = ref(false);

const scheduleData = ref([
  {
    date: "4/20",
    events: [
      {
        time1: "9:00",
        time2: "10:00",
        content: "穿越书海遇见你——锡图换书大集",
        place: "一楼大厅",
        detail: "详情见群通知",
        participants: ["全体"],
      },
      {
        time1: "9:00",
        time2: "17:00",
        content: "翰墨流彩 “签”映书香",
        place: "二楼接待处",
        participants: ["小明", "小刚", "小红"],
      },
      {
        time1: "13:00",
        time2: "17:00",
        content: "穿越书海遇见你——锡图换书大集",
        participants: ["小明"],
      },
    ],
  },
  {
    date: "4/21",
    events: [
      {
        time1: "9:00",
        time2: "10:00",
        content: "东林文化讲坛:中国古典诗词的理解与欣赏",
        place: "一楼展览处",
        participants: [],
      },
    ],
  },
  {
    date: "4/25",
    events: [
      {
        time1: "9:00",
        time2: "10:00",
        content: "吴文化专题讲座:《无锡梅里遗址考古报告》解读",
        participants: [],
      },
    ],
  },
]);
</script>
