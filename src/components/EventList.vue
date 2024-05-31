<template>
  <div class="eventlist-main-container">
    <div class="eventlist-frame">
      <div v-for="item in eventList" :key="item" class="eventlist-item-card">
        <div class="title">{{ item.title }}</div>
        <div class="time"><Clock :size="16" />{{ item.time }}</div>
        <div class="place"><MapPinned :size="16" />{{ item.place }}</div>
        <div class="end">
          <div v-if="item.permit == 0" class="tag">
            <UserRoundCog :size="16" />{{ item.ident }}
          </div>
          <div v-else class="tag"><UserRound :size="16" />{{ item.ident }}</div>
          <div v-if="item.state == 0" class="state prep">
            <Hourglass :size="16" />筹备中
          </div>
          <div v-else class="state ready"><CalendarCheck :size="16" />筹备完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.eventlist-main-container {
  width: 100%;
  overflow: hidden;
  user-select: none;
  padding: 10px 5px 10px 10px;
  height: 100%;

  .eventlist-frame {
    height: 100%;
    width: 100%;
    display: grid;
    padding-right: 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    overflow-y: scroll;
    gap: 20px;
  }

  @media (max-width: 1200px) {
    .eventlist-frame {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .eventlist-item-card {
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    min-height: 150px;
    display: grid;
    grid-template-rows: auto 1fr 1fr auto;
    align-items: center;
    justify-items: start;
    font-size: 16px;
    transition: 300ms;
    padding: 5px;
    gap: 5px;
    overflow: hidden;
    border: 2px solid #333;

    .end {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tag {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .title {
      font-size: 18px;
      position: relative;
      width: 100%;
      padding: 5px 0;
      z-index: 2;
      border-bottom: 3px dotted #333;
    }

    .title:after {
      content: "";
      transition: 300ms;
      z-index: 1;
      border-radius: 4px 4px 0 0;
      position: absolute;
      mix-blend-mode: saturation;
      background-color: rgb(255, 230, 172);
      width: 100%;
      height: 100%;
      top: 4px;
      left: 2px;
    }

    .time {
      font-family: "consolas";
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .place {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .state {
      display: flex;
      align-items: center;
      position: relative;
      white-space: nowrap;
      padding: 5px;
      z-index: 2;
      gap: 5px;
      border-radius: 5px;
    }

    .state::after {
      background-color: rgb(255, 209, 172);
      position: absolute;
      z-index: 1;
      content: "";
      mix-blend-mode: saturation;
      transition: 300ms;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      top: 2px;
      left: 4px;
    }

    .ready {
      border: 2px solid #333;
      // background-color: lightgreen;
    }

    .prep {
      border: 2px dotted #333;
    }
  }

  .eventlist-item-card:hover {
    .title:after {
      top: 0;
      left: 0;
    }

    .state:after {
      top: 0;
      left: 0;
    }
  }
}
</style>

<script setup>
import { Hourglass } from "lucide-vue-next";
import { CalendarCheck } from "lucide-vue-next";
import { ref } from "vue";
import { Clock } from "lucide-vue-next";
import { UserRoundCog } from "lucide-vue-next";
import { MapPinned } from "lucide-vue-next";
import { UserRound } from "lucide-vue-next";

const eventList = ref([
  {
    title: "大学生心理健康知识科普活动",
    time: "2024/5/29 ~ 2024/5/30",
    place: "学生活动中心",
    ident: "创建者",
    permit: 0,
    state: 0,
  },
  {
    title: "“一本书一部戏”系列讲座",
    place: "学生活动中心",
    time: "2024/5/23 19:00",
    ident: "参与者",
    permit: 1,
    state: 1,
  },
  {
    title: "2024年读者嘉年华活动",
    place: "学生活动中心",
    time: "2024/5/29 ~ 2024/5/30",
    ident: "参与者",
    permit: 1,
    state: 0,
  },
  {
    title: "“一本书一部戏”系列讲座",
    place: "学生活动中心",
    time: "2024/5/23 19:00",
    ident: "创建者",
    permit: 0,
    state: 1,
  },
  {
    title: "大学生心理健康知识科普活动",
    place: "学生活动中心",
    time: "2024/5/29~2024/5/30",
    ident: "创建者",
    permit: 0,
    state: 0,
  },
  {
    title: "“一本书一部戏”系列讲座",
    place: "学生活动中心",
    time: "2024/5/23 19:00",
    ident: "参与者",
    permit: 1,
    state: 1,
  },
]);
</script>
