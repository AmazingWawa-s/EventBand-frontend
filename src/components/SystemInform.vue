<template>
  <div :class="{ 'inform-frame': true, show: store.systemInform }">
    <div class="inform">
      <div class="header">
        <div class="close" @click="closeInform">
          <X />
        </div>
      </div>
      <div class="body">
        <div class="body-frame" v-if="store.systemInform.type == 'INVITE'">
          <div class="invite-code" @click="copyCode">
            <div>{{ code ? code : "生成邀请码" }}</div>
            <div class="divide"></div>
            <Copy v-if="!copy" :size="28" />
            <CopyCheck v-else :size="28" />
          </div>
          <div>{{ copy ? "复制成功" : "点击复制，分享给好友" }}</div>
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
  overflow: hidden;

  .inform {
    width: 600px;
    overflow: hidden;
    height: 370px;
    background-color: #fff;
    box-shadow: 2px 2px 5px #666;
    display: grid;
    grid-template-rows: auto 1fr;
    border-radius: 5px 10px 5px 10px;

    .header {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .close {
        padding: 10px 20px;
        border-radius: 0 0 0 10px;
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
        gap: 10px;

        .invite-code {
          display: flex;
          align-items: center;
          font-size: 28px;
          gap: 5px;
          border: 2px solid #666;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;

          .divide {
            width: 5px;
            height: 100%;
            background-color: #eee;
            border-radius: 10px;
          }

          .btn {
            cursor: pointer;
          }
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
import { ApiInvite } from "../api";
const store = useStore();
const code = ref("");
const copy = ref(false);
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
</script>
