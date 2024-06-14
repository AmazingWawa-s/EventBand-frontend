<template>
  <div :class="{ 'inform-frame': true, show: store.systemInform }">
    <div class="inform">
      <div class="header">
        <div class="start">INFORM</div>
        <div class="close" @click="closeInform">
          <X />
        </div>
      </div>
      <div class="body">
        <div class="body-frame invite" v-if="store.systemInform.type == 'INVITE'">
          <Handshake class="emoji" :size="200" />
          <img class="abs" src="../assets/invite_bg.svg" alt="" />
          <div class="invite-code" @click="copyCode">
            <div>{{ code ? code : "生成邀请码" }}</div>
            <div class="divide"></div>
            <Copy v-if="!copy" :size="28" />
            <CopyCheck v-else :size="28" />
          </div>
          <div>{{ copy ? "复制成功" : "点击复制，分享给好友" }}</div>
        </div>
        <div class="body-frame success" v-else-if="store.systemInform.type == 'SUCCESS'">
          <Smile class="emoji" :size="200" />
          <img class="abs" src="../assets/success_bg.svg" alt="" />
          <div class="content">
            {{ store.systemInform.content }}
          </div>
          <div class="button" @click="closeInform">确定</div>
        </div>
        <div class="body-frame failure" v-else-if="store.systemInform.type == 'FAILURE'">
          <Frown class="emoji" :size="200" />
          <div class="content">
            {{ store.systemInform.content }}
          </div>
          <div class="button" @click="closeInform">确定</div>
        </div>
        <div class="body-frame warning" v-else-if="store.systemInform.type == 'WARNING'">
          <TriangleAlert class="emoji" :size="200" />
          <img class="abs" src="../assets/warning_bg.svg" alt="" />
          <div class="content">
            {{ store.systemInform.content }}
          </div>
          <div class="bottom">
            <div class="button" @click="deleteEvent">确定</div>
            <div class="button-flip" @click="closeInform">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.inform-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: brightness(0.6);
  opacity: 0;
  pointer-events: none;
  transition: 300ms;
  user-select: none;
  overflow: hidden;

  .inform {
    width: 600px;
    overflow: hidden;
    height: 370px;
    background-color: #eee;
    box-shadow: 2px 2px 5px #666;
    display: grid;
    grid-template-rows: auto 1fr;
    border-radius: 3px 3px 10px 10px;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px dashed #666;

      .start {
        padding: 0 20px;
        font-weight: 600;
        font-size: 30px;
        font-family: "Consolas";
      }

      .close {
        padding: 10px 20px;
        transition: 300ms;
        cursor: pointer;
      }

      .close:hover {
        color: #fff;
        background-color: rgb(255, 106, 93);
      }
    }

    .body {
      width: 100%;
      height: 100%;

      .body-frame {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: rgb(16, 101, 130);
        gap: 10px;

        .invite-code {
          display: flex;
          align-items: center;
          font-size: 28px;
          font-weight: 600;
          gap: 5px;
          border: 2px solid rgb(88, 176, 206);
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;

          .divide {
            width: 5px;
            height: 100%;
            background-color: rgb(88, 176, 206);
            border-radius: 10px;
          }

          .btn {
            cursor: pointer;
          }
        }
      }

      .invite {
        position: relative;
        background-color: lightblue;
        overflow: hidden;

        .emoji {
          position: absolute;
          top: 100%;
          transform: translate(-60%, -100%);
          color: #82c3d9;
          left: 100%;
          rotate: -15deg;
        }

        .abs {
          width: 120px;
          position: absolute;
          left: 0;
          opacity: 1;
          transform: translate(-20%, -50%);
          top: 50%;
        }
      }

      .success {
        position: relative;
        justify-content: space-around;
        background-color: lightgreen;
        font-weight: 600;
        overflow: hidden;

        .content {
          font-size: 24px;
          color: rgb(0, 85, 31);
          padding: 20px;
        }

        .button {
          background-color: rgb(70, 212, 70);
          padding: 10px 20px;
          border-radius: 10px;
          color: #eee;
          cursor: pointer;
        }

        .emoji {
          position: absolute;
          top: 100%;
          transform: translate(-60%, -100%);
          color: #46d446;
          left: 100%;
          rotate: -15deg;
        }

        .abs {
          width: 140px;
          position: absolute;
          left: 0;
          opacity: 0.5;
          transform: translate(-20%, -50%);
          top: 50%;
        }
      }

      .failure {
        position: relative;
        justify-content: space-around;
        background-color: rgb(255, 215, 151);
        font-weight: 600;
        overflow: hidden;

        .emoji {
          position: absolute;
          top: 100%;
          transform: translate(-60%, -110%);
          color: #c98a33;
          left: 100%;
          rotate: -15deg;
        }
        .content {
          font-size: 24px;
          color: rgb(85, 48, 0);
          padding: 20px;
        }

        .button {
          background-color: rgb(212, 162, 70);
          padding: 10px 20px;
          border-radius: 10px;
          color: #eee;
          cursor: pointer;
        }

        .abs {
          width: 140px;
          position: absolute;
          left: 0;
          opacity: 0.5;
          transform: translate(-20%, -50%);
          top: 50%;
        }
      }

      .warning {
        position: relative;
        justify-content: space-around;
        background-color: rgb(238, 144, 144);
        font-weight: 600;
        overflow: hidden;

        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .content {
          font-size: 24px;
          padding: 20px;
          color: rgb(85, 0, 0);
        }

        .button {
          background-color: rgb(201, 54, 51);
          padding: 10px 20px;
          border-radius: 10px;
          color: #eee;
          cursor: pointer;
        }

        .button-flip {
          background-color: #eee;
          padding: 10px 20px;
          border-radius: 10px;
          color: #666;
          cursor: pointer;
        }

        .emoji {
          position: absolute;
          top: 100%;
          transform: translate(-60%, -110%);
          color: #c93633;
          left: 100%;
          rotate: -15deg;
        }

        .abs {
          width: 140px;
          position: absolute;
          left: 0;
          opacity: 0.5;
          transform: translate(-20%, -50%);
          top: 50%;
        }
      }
    }
  }
}

.show {
  opacity: 1;
  pointer-events: all;
}
</style>

<script setup>
import { useStore } from "../store";
import { X } from "lucide-vue-next";
import { Copy } from "lucide-vue-next";
import { CopyCheck } from "lucide-vue-next";
import { ref } from "vue";
import { TriangleAlert } from "lucide-vue-next";
import { Frown } from "lucide-vue-next";
import { ApiDeleteEvent, ApiInvite } from "../api";
import { Smile } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Handshake } from "lucide-vue-next";
const store = useStore();
const code = ref("");
const copy = ref(false);
const router = useRouter();
const closeInform = () => {
  store.systemInform = "";
};

const requestInviteCode = () => {};

const copyCode = () => {
  let token = localStorage.getItem("token");

  if (!code.value && store.systemInform.data.eventId) {
    ApiInvite(token, store.systemInform.data.eventId).then((res) => {
      console.log(res);
      const { inviteCode } = res.data;
      code.value = inviteCode;
    });
  } else {
    navigator.clipboard.writeText(code.value);
    copy.value = true;
    setTimeout(() => {
      copy.value = false;
    }, 2000);
  }
};

const deleteEvent = () => {
  const token = localStorage.getItem("token");
  ApiDeleteEvent(token, store.systemInform.eventId).then((res) => {
    console.log(res);
    const { removeOk } = res.data;
    if (removeOk) {
      store.systemInform = "";
      router.push({
        path: "/user",
      });
    }
  });
};
</script>
