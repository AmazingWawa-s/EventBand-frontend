<template>
  <div class="eventlist-main-container">
    <div class="header">
      <div class="invite-code">
        <TicketPlus />
        <div class="divide"></div>
        <input type="text" v-model="inviteCode" placeholder="输入邀请码" />
        <div class="divide"></div>
        <ArrowRight @click="handleJoin" class="btn" />
      </div>
      <div v-if="codeMsg" class="codemsg">{{ codeMsg }}</div>
    </div>
    <div v-if="!eventlist"></div>
    <div v-else-if="eventlist.length > 0" class="eventlist-frame">
      <div
        v-for="item in eventlist"
        :key="item"
        @click="jumpToDetail(item.event_id, item.eurelation_role)"
        class="eventlist-item-card"
      >
        <div class="title">{{ item.event_name }}</div>
        <div class="time">
          <Clock :size="16" />{{ item.event_start_date + " ~ " + item.event_end_date }}
        </div>
        <div class="place"><MapPinned :size="16" />{{ item.event_location_name }}</div>
        <div class="end">
          <div class="tag">
            <UserRoundCog
              v-if="item.eurelation_user_id == item.event_creator_id"
              :size="16"
            />
            <UserRound v-else :size="16" />
            {{ item.eurelation_role == "creator" ? "创建" : "参与" }}
          </div>
          <div v-if="item.event_ready == 0" class="state prep">
            <Hourglass :size="16" />筹备中
          </div>
          <div v-else class="state ready"><CalendarCheck :size="16" />筹备完成</div>
        </div>
      </div>
    </div>
    <div v-else class="eventlist-empty">
      <div class="msg">未加入任何活动<PackageOpen :size="36" /></div>
      <!-- <div class="btn" @click="jumpToSearch">立即寻找<CircleChevronRight /></div> -->
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
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    gap: 10px;

    .codemsg {
      color: @theme-color;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }

  .invite-code {
    height: 40px;
    display: flex;
    align-items: center;
    justify-self: start;
    justify-content: flex-start;
    border: 2px dashed #333;
    border-radius: 5px;
    gap: 5px;
    padding: 0 5px;

    .divide {
      width: 5px;
      height: 80%;
      border-radius: 10px;
      background-color: orange;
    }

    input {
      border: none;
      height: 100%;
      padding: 0;
    }

    .btn {
      cursor: pointer;
    }
  }

  .eventlist-frame {
    height: 100%;
    width: 100%;
    display: grid;
    padding-right: 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 150px;
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
import { Frown } from "lucide-vue-next";
import { Clock } from "lucide-vue-next";
import { ArrowRight } from "lucide-vue-next";
import { TicketPlus } from "lucide-vue-next";
import { UserRoundCog } from "lucide-vue-next";
import { PackageOpen } from "lucide-vue-next";
import { MapPinned } from "lucide-vue-next";
import { UserRound } from "lucide-vue-next";
import { CircleChevronRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ApiJoinEvent } from "../api";

const props = defineProps(["eventlist"]);

const router = useRouter();

const codeMsg = ref("");

const inviteCode = ref();

const handleJoin = () => {
  let token = localStorage.getItem("token");
  if (inviteCode.value) {
    ApiJoinEvent(token, inviteCode.value).then((res) => {
      console.log(res);
      const { eventId, joinOk } = res.data;
      if (eventId) {
        jumpToDetail(eventId, "participant");
        codeMsg.value = "";
      } else if (joinOk) {
        codeMsg.value = "加入成功，再次点击跳转";
      } else {
        codeMsg.value = "邀请码输入错误";
      }
    });
  }
};

const jumpToDetail = (id, role) => {
  if (role == "creator") {
    router.push({
      path: "/eventDetail",
      query: {
        id: id,
      },
    });
  } else {
    router.push({
      path: "/eventDetail_",
      query: {
        id: id,
      },
    });
  }
};

const jumpToSearch = () => {
  router.push({
    path: "/search",
  });
};
</script>
