<template>
  <div class="m-participants-main-container">
    <div class="participants-header-frame">
      <div class="participants-header">
        <div class="front">成员列表</div>
        <div class="end">
          <div
            :class="{ button: true, 'button-reverse': editActive }"
            @click="
              editActive = !editActive;
              siftButton = siftButton ? false : true;
              itemSelected = null;
            "
          >
            <SquarePen :size="16" />编辑
          </div>
          <div :class="{ button: true }" @click="siftButton = !siftButton">
            <div class="icon">
              <img src="../assets/sift.svg" alt="" />
              |
            </div>
            <div class="condition">{{ condition.group_name }}</div>
          </div>
        </div>
      </div>
      <div :class="{ 'participants-sift': true, 'sift-close': !siftButton }">
        <div
          :class="{ 'sift-item': true, 'sift-enhanced': itemSelected }"
          v-for="(item, index) in dropMenu.content"
          @click="handleSift(item, index)"
          :key="item"
          v-show="!(editActive && item.group_name == '全部')"
        >
          {{ item.group_name }}
        </div>
      </div>
    </div>
    <div class="participants-body">
      <div v-if="participants.content.length > 0" class="participants-contents">
        <div
          v-show="
            condition.group_name == '全部' ||
            condition.group_id == item.eurelation_group_id
          "
          v-for="(item, index) in participants.content"
          class="participants-item"
          :key="item"
        >
          <div>{{ index + 1 }}</div>
          <div>{{ item.user_name }}</div>
          <div
            @click="itemSelected = item"
            :class="{ group: true, 'group-edit': editActive }"
          >
            <RefreshCw
              v-if="editActive"
              :class="{
                change: true,
                rotating: itemSelected == item,
              }"
              :size="18"
            />
            <Users v-else :size="18" />
            {{
              item.eurelation_group_id
                ? dropMenu.content.find(
                    (group) => group.group_id == item.eurelation_group_id
                  ).group_name
                : "未分组"
            }}
          </div>
          <div :class="{ button: true, hidden: editActive }">
            <Mail :size="18" />
          </div>
          <div :class="{ button: true, hidden: !editActive }">
            <CircleX
              @click="deleteParticipants(item.eurelation_user_id, index)"
              color="#c1272d"
              :size="18"
            />
          </div>
        </div>
      </div>
      <div v-else class="participants-none"><PersonStanding />还未加入任何成员</div>
    </div>
    <div class="participants-bottom">
      <div class="bottom-item invite" @click="openInvite">
        <UserRoundPlus :size="20" />邀请
      </div>
      <div class="bottom-item new" @click="jumpToChatRoom">
        <DoorOpen :size="20" />进入聊天室
      </div>
      <div class="setting">
        <input type="text" v-model="newGroup" placeholder="新建分组" />
        <div class="divide"></div>
        <div class="btn" @click="addNewGroup"><Plus /></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@color-enhanced: rgb(255, 149, 0);

.m-participants-main-container {
  position: relative;
  background-color: #fff;
  z-index: @z-index-modules;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  user-select: none;
  overflow: hidden;

  .participants-sift {
    display: flex;
    width: 100%;
    gap: 5px;
    max-height: 500px;
    flex-wrap: wrap;
    overflow: hidden;

    .sift-item {
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ddd;
      padding: 5px;
      cursor: pointer;
      transition: 300ms;
    }

    .sift-enhanced {
      border: 1px solid @color-enhanced;
      color: @color-enhanced;
    }
  }

  .sift-close {
    max-height: 0;
  }

  .participants-header-frame {
    .participants-header {
      margin-bottom: 5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .end {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: space-between;

        .button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          border: 2px solid #333;
          font-size: 16px;
          font-weight: 500;
          border-radius: 5px;
          padding: 5px;
          cursor: pointer;
          transition: 300ms;

          .icon {
            display: flex;
            align-items: center;
          }

          img {
            width: 16px;
          }
        }

        .button-reverse {
          background-color: #333;
          color: #fff;
        }
      }
    }
  }

  .participants-body {
    width: 100%;
    height: 100%;
    font-size: 18px;
    overflow: hidden;

    .participants-none {
      width: 100%;
      height: 100%;
      font-size: 18px;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #aaa;
      justify-content: center;
    }

    .participants-contents {
      width: 100%;
      display: grid;
      padding-right: 5px;
      height: 100%;
      overflow-y: scroll;
      grid-template-columns: auto 4fr 3fr auto auto;
      column-gap: 10px;
      grid-auto-rows: 22px;
      row-gap: 15px;

      .participants-item {
        width: 100%;
        display: grid;
        transition: 300ms;
        border-bottom: 2px dashed #eee;
        padding-bottom: 2px;
        grid-column: 1/6;
        grid-template-columns: subgrid;
        align-items: center;

        .group {
          font-size: 16px;
        }

        div {
          display: flex;
          align-items: center;
          gap: 1px;
          pointer-events: none;
        }

        .button {
          cursor: pointer;
          pointer-events: all;
          max-width: 16px;
          transition: 300ms;
        }

        .change {
          color: #999;
        }

        .group-edit {
          pointer-events: all;
          cursor: pointer;
        }

        .hidden {
          max-width: 0;
        }

        .rotating {
          color: @color-enhanced;
          animation: animation-rotate 2s linear infinite;
        }
      }

      .grid-title {
        font-weight: 600;
      }
    }
  }

  .participants-bottom {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-template-areas: "c a b ";
    gap: 10px;

    .bottom-item {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 10px 5px;
    }

    .invite {
      grid-area: a;
      background-color: #666;
      color: #fff;
    }

    .new {
      grid-area: b;
      background-color: #fff;
      border: 2px solid #666;
      color: #666;
    }

    .setting {
      grid-area: c;
      font-size: 16px;
      display: flex;
      white-space: nowrap;
      gap: 5px;
      align-items: center;
      border: 2px solid #aaa;
      background-color: #eee;
      padding: 5px;
      border-radius: 5px;

      .divide {
        width: 5px;
        height: 80%;
        background-color: #aaa;
        border-radius: 10px;
      }

      input {
        border: 0;
        background-color: #eee;
        padding: 0;
        font-size: 16px;
        height: 28px;
        border-radius: 0;
      }

      .btn {
        cursor: pointer;
      }
    }
  }

  @media (max-width: 1200px) {
    .participants-bottom {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "c c"
        "a b";
    }
  }
}

.module-focus {
  z-index: @z-index-module-focus;
}

@keyframes animation-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup>
import { UserRoundPlus } from "lucide-vue-next";
import { Users } from "lucide-vue-next";
import { SquarePen } from "lucide-vue-next";
import { Mail } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { DoorOpen } from "lucide-vue-next";
import { PersonStanding } from "lucide-vue-next";
import { RefreshCw } from "lucide-vue-next";
import { inject, ref } from "vue";
import { useStore } from "../store";
import { Plus } from "lucide-vue-next";
import { ApiDeleteParticipant, ApiGroupAdd, ApiGroupJoin } from "../api";

const props = defineProps(["eventId"]);

const router = useRouter();
const newGroup = ref("");
const store = useStore();

const jumpToChatRoom = () => {
  router.push({
    path: "/chatRoom",
  });
};

const openInvite = () => {
  store.systemInform = {
    type: "INVITE",
    data: {
      eventId: props.eventId,
    },
  };
};

const addNewGroup = () => {
  const token = localStorage.getItem("token");
  if (newGroup.value) {
    ApiGroupAdd(token, newGroup.value, props.eventId).then((res) => {
      console.log(res);
      const { createGroupOk, groupId } = res.data;
      dropMenu.content.push({
        group_name: newGroup.value,
        group_id: groupId,
      });
      if (createGroupOk) {
        newGroup.value = "";
      }
    });
  }
};

const deleteParticipants = (userId, index) => {
  const token = localStorage.getItem("token");
  ApiDeleteParticipant(token, userId, props.eventId).then((res) => {
    console.log(res);
    const { deleteOk } = res.data;
    if (deleteOk) {
      participants.content.splice(index, 1);
    }
  });
};

const condition = ref({
  group_name: "全部",
  group_id: -1,
  group_event_id: -1,
});

const editActive = ref(false);

const siftButton = ref(false);

const itemSelected = ref(null);

const handleSift = (group, index) => {
  if (!editActive.value) {
    condition.value = group;
    siftButton.value = false;
  } else if (itemSelected.value) {
    itemSelected.value.eurelation_group_id = group.group_id;
    const token = localStorage.getItem("token");
    ApiGroupJoin(
      token,
      props.eventId,
      group.group_id,
      itemSelected.value.eurelation_user_id
    ).then((res) => {
      console.log(res);
    });
    itemSelected.value = null;
  }
};

const dropMenu = inject("groups");

const participants = inject("participants");

// const participants = ref([
//   {
//     name: "小明",
//     group: "参与者",
//     id: "123456",
//   },
//   {
//     name: "小红",
//     group: "参与者",
//     id: "123456",
//   },
//   {
//     name: "小刚",
//     group: "志愿者",
//     id: "123456",
//   },
//   {
//     name: "小兵",
//     group: "志愿者",
//     id: "123456",
//   },
// ]);
</script>
