<template>
  <div :class="{ 'inform-frame': true, show: store.systemInform }">
    <div class="inform">
      <div class="header">
        <div class="close" @click="closeInform">
          <X />
        </div>
      </div>
      <div class="body">
        <div v-if="store.systemInform.type == 'INVITE'">
          <div>邀请码
            abc
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
        background-color: @theme-color;
      }
    }

    .body {
      width: 100%;
      height: 100%;
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
const store = useStore();

const closeInform = () => {
  store.systemInform = "";
};
</script>
