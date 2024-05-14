<template>
  <div class="header">
    <div class="header-front">
      <img class="icon" src="../assets/icon_logo_ver2.svg" alt="" />
    </div>
    <div class="header-middle">
      <div class="middle-grid">
        <div
          :class="{
            'middle-grid-scroll': true,
            'notice-scroll': store.notice,
            'trans-1': true,
          }"
        >
          <p class="search-bar"></p>
          <p class="notice">
            <img
              :class="{ 'wobble-hor-top': store.notice }"
              src="../assets/notice.svg"
              alt=""
            />
          </p>
        </div>
      </div>
      <div class="middle-grid">
        <div
          :class="{
            'middle-grid-scroll': true,
            'notice-scroll': store.notice,
            'trans-2': true,
          }"
        >
          <input class="search-bar" type="text" />
          <p class="notice">活动“计通学院春节联欢晚会”审核通过</p>
        </div>
      </div>
      <div class="middle-grid">
        <div
          :class="{
            'middle-grid-scroll': true,
            'notice-scroll': store.notice,
            'trans-3': true,
          }"
        >
          <p class="search-bar">
            <img src="../assets/search.svg" alt="" />
          </p>
          <p class="notice notice-button"><img src="../assets/confirm.svg" alt="" /></p>
        </div>
      </div>
    </div>
    <div class="header-back">
      <div @click="() => (store.notice = store.notice ? '' : '有消息')" class="user-bar">
        <span>{{ store.userName }}</span>
        <span>▼</span>
      </div>
      <!-- <div class="user-menu">
        <p>消息</p>
        <p>设置</p>
      </div> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: @header-height;
  width: 100%;
  padding: @header-padding;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  border-bottom: @header-border-bottom;

  .appear {
    top: 0;
  }

  .header-front {
    height: 100%;
  }

  .header-middle {
    margin: 0 10px;
    flex-grow: 1;
    max-width: 600px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    gap: 5px;
    overflow: hidden;
    position: relative;
    z-index: @z-index-header;

    .middle-grid {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: @header-border-radius;

      .middle-grid-scroll {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 201%;
        display: grid;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        justify-items: center;
        align-items: center;

        img {
          height: 1rem;
          width: 1rem;
          transition: 400ms;
        }

        input {
          outline: none;
          width: 100%;
          height: 100%;
          padding: 0 10px;
          background: none;
          border: none;
        }

        .search-bar {
          padding-top: 1px;
          display: flex;
          align-items: center;
        }

        .notice {
          position: relative;
          box-shadow: @notice-box-shadow;
          width: 100%;
          height: 100%;
          display: flex;
          padding: 10px;
          align-items: center;
          background: linear-gradient(
            0deg,
            rgba(0, 96, 28, 1) 0%,
            rgb(48, 137, 69) 38%,
            rgba(0, 117, 26, 1) 71%
          );
          color: rgb(68, 255, 21);
          text-shadow: 0 0 1em rgb(37, 191, 55);
          font-weight: 600;

          img {
            margin: 0 auto;
            filter: drop-shadow(0 0 2px rgb(37, 191, 55));
          }
        }

        .notice-button {
          cursor: pointer;
        }

        .notice-button:hover {
          img {
            scale: 1.3;
          }
        }

        .notice::after {
          content: "";
          position: absolute;
          z-index: @z-index-header-scanlines;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("../assets/scanlines.png");
          opacity: 0.1;
        }
      }

      .notice-scroll {
        top: -100%;
      }

      .trans-1 {
        transition: 500ms;
      }

      .trans-2 {
        transition: 700ms;
      }

      .trans-3 {
        transition: 900ms;
      }
    }

    .middle-grid::after {
      position: absolute;
      left: 0;
      border-radius: @header-border-radius;
      top: 0;
      right: 0;
      bottom: 0;
      content: "";
      width: 100%;
      height: 100%;
      box-shadow: @middle-grid-box-shadow;
      pointer-events: none;
      z-index: @z-index-header-shadow;
    }
  }

  .icon {
    height: 100%;
  }

  .header-back {
    height: 100%;
    position: relative;

    .user-bar {
      height: 100%;
      font-size: 16px;
      padding: 10px;
      background-color: @theme-black;
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
      border-radius: @header-border-radius;
    }
  }
}

.wobble-hor-top {
  -webkit-animation: wobble-hor-top 1.5s infinite both;
  animation: wobble-hor-top 1.5s infinite both;
}

@-webkit-keyframes wobble-hor-top {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-30px) rotate(6deg);
    transform: translateX(-30px) rotate(6deg);
  }
  30% {
    -webkit-transform: translateX(15px) rotate(-6deg);
    transform: translateX(15px) rotate(-6deg);
  }
  45% {
    -webkit-transform: translateX(-15px) rotate(3.6deg);
    transform: translateX(-15px) rotate(3.6deg);
  }
  60% {
    -webkit-transform: translateX(9px) rotate(-2.4deg);
    transform: translateX(9px) rotate(-2.4deg);
  }
  75% {
    -webkit-transform: translateX(-6px) rotate(1.2deg);
    transform: translateX(-6px) rotate(1.2deg);
  }
}

@keyframes wobble-hor-top {
  0%,
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  15% {
    -webkit-transform: translateX(-10px) rotate(6deg);
    transform: translateX(-10px) rotate(6deg);
  }
  30% {
    -webkit-transform: translateX(5px) rotate(-6deg);
    transform: translateX(5px) rotate(-6deg);
  }
  45% {
    -webkit-transform: translateX(-5px) rotate(3.6deg);
    transform: translateX(-5px) rotate(3.6deg);
  }
  60% {
    -webkit-transform: translateX(3px) rotate(-2.4deg);
    transform: translateX(3px) rotate(-2.4deg);
  }
  75% {
    -webkit-transform: translateX(-2px) rotate(1.2deg);
    transform: translateX(-2px) rotate(1.2deg);
  }
}
</style>

<script setup>
import Button from "./Button.vue";
import Avator from "./Avator.vue";
import { useStore } from "../store";
const store = useStore();
</script>
