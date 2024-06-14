<template>
  <div v-if="!loading" class="chatroom-main-container">
    <div class="chatroom-frame">
      <div class="sidebar">
        <div class="header"></div>
        <div
          v-for="(item, index) in chatlist"
          :key="item"
          @click="chatSelect = index"
          :class="{ 'chatlist-item-frame': true, selected: index == chatSelect }"
        >
          <div class="chatlist-item">
            <div :class="{ count: true, group: item.chr_type == 0 }">
              <UsersRound v-if="item.chr_type == 0" :size="20" /><UserRound
                v-else
                :size="20"
              />
            </div>
            <div class="chatlist-body">
              <div class="title">{{ item.title }}</div>
              <div class="time">
                {{
                  item.chatlist[item.chatlist.length - 1].chr_time
                    .replace("T", " ")
                    .replace(":00", "")
                }}
              </div>
              <div class="latest">
                {{
                  item.chatlist[item.chatlist.length - 1].chr_sender +
                  ": " +
                  item.chatlist[item.chatlist.length - 1].chr_content
                }}
              </div>
            </div>
          </div>
          <div class="options">
            <!-- <BellOff color="orange" :size="20" />
            <Bell color="orange" :size="20" /> -->
            <CircleX class="button" color="orangered" :size="20" />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="title-frame">{{ chatlist[chatSelect].title }}</div>
        <div class="chat-frame">
          <div
            :class="{
              'chat-bubble': true,
              'chat-bubble-self': item.chr_sender == store.userName,
            }"
            v-for="item in chatlist[chatSelect].chatlist"
            :key="item"
          >
            <div class="header">
              <div>{{ item.chr_sender }}</div>
              <div>{{ item.chr_time.replace("T", " ").replace(":00", "") }}</div>
            </div>
            <div class="body">
              {{ item.chr_content }}
            </div>
          </div>
        </div>
        <div class="input-frame">
          <textarea v-model="userInput" />
          <div class="bottom">
            <div class="button" @click="sendMessage">发送<SendHorizontal /></div>
          </div>
        </div>
      </div>
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

.chatroom-main-container {
  max-width: 1366px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 20px 10px;
  margin: 0 auto;

  .chatroom-frame {
    height: 100%;
    overflow: hidden;
    border: 2px solid #333;
    width: 100%;
    background-color: #fff;
    border-radius: 10px 20px 10px 20px;
    display: grid;
    grid-template-columns: auto 1fr;

    .sidebar {
      width: 250px;
      overflow-y: scroll;
      height: 100%;
      border-right: 2px dashed #ddd;

      .header {
        height: 40px;
      }

      .chatlist-item-frame {
        padding: 2px 0;
        .options {
          grid-column: 1/3;
          overflow: hidden;
          transition: 100ms;
          width: 100%;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 0 5px;
        }

        .chatlist-item {
          user-select: none;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          overflow: hidden;
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: 1fr auto;
          align-items: center;
          padding: 8px;

          .count {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            border-radius: 5px;
            background-color: rgb(144, 238, 143);
            color: rgba(31, 109, 0, 0.75);
            align-items: center;
            font-size: 14px;
          }

          .group {
            background-color: rgb(255, 200, 0);
            color: rgb(104, 81, 0);
          }

          .chatlist-body {
            overflow: hidden;
            padding-left: 10px;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr 1fr;
            gap: 5px;

            .title {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .time {
              font-size: 14px;
              color: #666;
            }

            .latest {
              font-size: 14px;
              color: #666;
              grid-column: 1/3;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }

      .selected {
        border-top: 2px dashed #ddd;
        border-bottom: 2px dashed #ddd;

        .options {
          height: 24px;

          .button {
            cursor: pointer;
          }
        }
      }
    }

    .sidebar::-webkit-scrollbar {
      display: none;
    }

    .body {
      display: grid;
      overflow: hidden;
      grid-template-rows: auto 1fr auto;

      .title-frame {
        padding: 10px;
        font-size: 20px;
      }

      .chat-frame {
        // background-color: #eee;
        border-top: 2px dashed #ddd;
        border-bottom: 2px dashed #ddd;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;

        .chat-bubble {
          display: grid;
          padding: 10px;
          grid-template-rows: auto 1fr;
          align-self: flex-start;
          justify-items: self-start;
          gap: 5px;

          .header {
            display: flex;
            gap: 10px;
            align-items: center;
            font-size: 16px;
            color: #666;
          }

          .body {
            font-size: 18px;
            padding: 10px;
            border-radius: 0 20px 20px 20px;
            border: 2px solid #666;
            background-color: #fff;
            box-shadow: 3px 3px 0 #666;
          }
        }

        .chat-bubble-self {
          align-self: flex-end;
          justify-items: self-end;

          .header {
            display: none;
            align-items: center;
          }

          .body {
            font-size: 18px;
            padding: 10px;
            border-radius: 20px 20px 0 20px;
            background-color: #eee;
          }
        }

        .chat-inform {
          align-self: center;
          border: 2px solid #666;
          display: grid;
          gap: 10px;
          width: 360px;
          box-shadow: 3px 3px 0 #666;
          padding: 10px;
          margin: 10px 0;
          border-radius: 10px;

          .header {
            align-items: center;
            color: #666;
            display: flex;
            font-size: 16px;
            justify-content: space-between;

            div {
              align-items: center;
              display: flex;
            }
          }

          .body {
          }
        }
      }

      .input-frame {
        height: 200px;
        display: grid;
        grid-template-rows: 1fr auto;

        textarea {
          border: none;
        }

        .bottom {
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          user-select: none;

          .button {
            display: flex;
            align-items: center;
            border-radius: 5px;
            font-size: 18px;
            gap: 5px;
            border: 2px dashed #666;
            padding: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { Bell } from "lucide-vue-next";
import { useStore } from "../store";
import { CircleX } from "lucide-vue-next";
import { UserRound } from "lucide-vue-next";
import { Megaphone } from "lucide-vue-next";
import { UsersRound } from "lucide-vue-next";
import { BellOff } from "lucide-vue-next";
import { SendHorizontal } from "lucide-vue-next";
import Loading from "../components/svg/Loading.vue";
import { ApiChatRecord, ApiSendChat } from "../api";
const store = useStore();
const loading = ref(true);

const chatlist = ref([
  // {
  //   title: "2024读者嘉年华活动",
  //   chatlist: [
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "inform",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "AmazingWawa",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:30",
  //       user: "管理员",
  //       content: "请成员不要在群聊内发送无关信息",
  //       type: "inform",
  //     },
  //   ],
  // },
  // {
  //   title: "活动2",
  //   chatlist: [
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "小刚",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //   ],
  // },
  // {
  //   title: "活动3",
  //   chatlist: [
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "小刚",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //   ],
  // },
  // {
  //   title: "活动4",
  //   chatlist: [
  //     {
  //       date: "24/6/1",
  //       time: "10:24",
  //       user: "小明",
  //       content: "大家好",
  //       type: "normal",
  //     },
  //     {
  //       date: "24/6/1",
  //       time: "10:26",
  //       user: "小刚",
  //       content: "塞扣泥塔塔开",
  //       type: "normal",
  //     },
  //   ],
  // },
]);

const chatSelect = ref(0);
const userInput = ref("");

onMounted(() => {
  const token = localStorage.getItem("token");
  ApiChatRecord(token).then((res) => {
    console.log(res);
    chatlist.value = res.data.data;
    loading.value = false;
    console.log(chatlist.value);
  });
});

const ws = new WebSocket("wsUrl/ws/notifications" + "/");

ws.addEventListener("message", (e) => {
  const data = JSON.parse(e.data);
  console.log(data);
});

ws.addEventListener("open", () => {
  console.log("连接websocket");
  const token = localStorage.getItem("token");
  // const msg = {
  //   content: "login",
  //   userToken: token,
  //   timestamp: Date.now(),
  // };
  // ws.send(JSON.stringify(msg));
});

ws.addEventListener("close", () => {
  const token = localStorage.getItem("token");
  // const msg = {
  //   content: "logoff",
  //   userToken: token,
  //   timestamp: Date.now(),
  // };
  // ws.send(JSON.stringify(msg));
});

ws.addEventListener("error", (res) => {
  console.log(res);
});

const sendMessage = () => {
  const { chr_type, title_id } = chatlist.value[chatSelect.value];
  if (userInput.value) {
    const token = localStorage.getItem("token");
    const time = new Date().getTime();
    console.log(time);
    if (chr_type == 0) {
      // ApiSendChat(token, userInput.value, chr_type, time, null, title_id).then((res) => {
      //   console.log(res);
      // });
      const data = {
        userToken: token,
        content: userInput.value,
        chatType: chr_type,
        timestamp: time,
        receiverId: null,
        eventId: title_id,
      };
      ws.send(JSON.stringify(data));
      chatlist.value[chatSelect.value].chatlist.push({
        chr_content: userInput.value,
        chatType: chr_type,
        chr_sender: store.userName,
        chr_time: "aaa",
      });
    } else {
      const data = {
        userToken: token,
        chr_content: userInput.value,
        chatType: chr_type,
        timestamp: time,
        receiverId: title_id,
        eventId: null,
      };
      ws.send(JSON.stringify(data));
      chatlist.value[chatSelect.value].chatlist.push({
        content: userInput.value,
        chatType: chr_type,
        chr_sender: store.userName,
        chr_time: "aaa",
      });
      // ApiSendChat(token, userInput.value, chr_type, time, title_id, null).then((res) => {
      //   console.log(res);
      // });
    }
    userInput.value = "";
  }
};
</script>
