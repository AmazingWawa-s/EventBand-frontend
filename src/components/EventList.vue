<template>
  <div class="eventlist-main-container">
    <div v-if="!eventlist"></div>
    <div v-else-if="eventlist.length > 0" class="eventlist-frame">
      <div
        v-for="item in eventlist"
        :key="item"
        @click="jumpToDetail(item.event_id)"
        class="eventlist-item-card"
      >
        <div class="title">{{ item.event_name }}</div>
        <div class="time"><Clock :size="16" />{{ item.event_start.split(":")[0] }}</div>
        <div class="place"><MapPinned :size="16" />{{ item.event_location_id }}</div>
        <div class="end">
          <div class="tag">
            <UserRoundCog
              v-if="item.eurelation_user_id == item.event_creator_id"
              :size="16"
            />
            <UserRound v-else :size="16" />
            {{ item.eurelation_role }}
          </div>
          <div v-if="item.state == 0" class="state prep">
            <Hourglass :size="16" />筹备中
          </div>
          <div v-else class="state ready"><CalendarCheck :size="16" />筹备完成</div>
        </div>
      </div>
    </div>
    <div v-else class="eventlist-empty">
      <div class="msg">未加入任何活动<PackageOpen :size="36" /></div>
      <div class="btn">立即寻找<CircleChevronRight /></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.eventlist-empty {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #666;

  .msg {
    font-size: 36px;
    font-weight: 600;
  }

  .btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    border: 2px solid #666;
    padding: 10px;
    border-radius: 5px;
    gap: 5px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

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
    grid-auto-rows: 40%;
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

    .title::after {
      content: "";
      transition: 300ms;
      z-index: 1;
      border-radius: 4px 4px 0 0;
      position: absolute;
      mix-blend-mode: saturation;
      box-shadow: 0 0 3px rgb(255, 230, 172);
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
      box-shadow: 0 0 5px rgb(255, 194, 145);
      position: absolute;
      z-index: 1;
      content: "";
      mix-blend-mode: saturation;
      transition: 300ms;
      border-radius: 4px;
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
import { PackageOpen } from "lucide-vue-next";
import { MapPinned } from "lucide-vue-next";
import { UserRound } from "lucide-vue-next";
import { CircleChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

const props = defineProps(["eventlist"]);

const router = useRouter();

const jumpToDetail = (id) => {
  router.push({
    path: "/eventDetail",
    query: {
      id: id,
    },
  });
};
</script>
