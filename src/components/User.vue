<template>
  <div class="user-main-container">
    <div class="grid-calendar grid-item">
      <Calendar />
    </div>
    <div class="grid-tasks grid-item">
      <Todolist />
    </div>
    <div class="grid-events grid-item">
      <div class="grid-events-frame">
        <div
          :class="{
            'grid-events-frame-scroll': true,
            'is-slide': isSlide,
          }"
        >
          <div class="grid-events-create">
            <div class="grid-events-sub-frame">
              <!-- <div class="grid-events-square2"></div> -->
              <EventCreateForm />
            </div>
          </div>
          <div class="grid-events-list">
            <div class="grid-events-sub-frame">
              <!-- <div class="grid-events-square1"></div> -->
              <EventList />
            </div>
          </div>
        </div>
      </div>
      <div @click="createEvent" class="grid-events-create-button">
        <div class="create-button-group">
          <div class="create-button">
            <span :class="{ 'button-rotate': isSlide }">＋</span>
          </div>
          <p>创建</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-main-container {
  position: relative;
  z-index: @z-index-user;
  width: 100%;
  height: 100%;
  max-width: 1366px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 400px 1fr;
  grid-template-columns: 400px 1fr;
  grid-template-areas:
    "a b"
    "c c";
  gap: @user-gap;
  padding: @user-padding;
  overflow: hidden;

  .grid-item {
    border-radius: @user-item-border-radius;
    border: @user-item-border;
    background-color: @user-item-bgc;
  }

  .grid-calendar {
    height: 100%;
    grid-area: a;
  }

  .grid-tasks {
    grid-area: b;
  }

  .grid-events {
    grid-area: c;
    display: grid;
    gap: @user-gap;
    padding: @user-padding;
    grid-template-columns: 1fr auto;

    .grid-events-frame {
      width: 100%;
      height: 100%;

      position: relative;
      overflow: hidden;
      border-radius: @user-item-border-radius;

      .grid-events-frame-scroll {
        position: absolute;
        width: 200%;
        height: 100%;
        left: -100%;
        transition: 500ms;
        background-color: #ddd;
        display: grid;
        grid-template-columns: 1fr 1fr;

        .grid-events-list {
          border-radius: @user-item-border-radius;
          background-color: #ddd;
        }

        .grid-events-create {
          background-color: #ddd;
          border-radius: @user-item-border-radius;
        }

        .grid-events-sub-frame {
          position: relative;
          height: 100%;
          width: 100%;
          box-shadow: 0 0 0 10px #ddd inset;
          background-color: #eee;
          border-radius: 16px;
          padding: 10px;

          .grid-events-square1 {
            position: absolute;
            background-color: #ddd;
            width: 50px;
            height: 50px;
            border-radius: 0 0 30px 0;
          }

          .grid-events-square2 {
            position: absolute;
            background-color: #ddd;
            width: 50px;
            height: 50px;
            left: calc(100% - 60px);
            border-radius: 0 0 0 30px;
          }
        }
      }

      .is-slide {
        left: 0;
      }
    }

    .grid-events-frame::-webkit-scrollbar {
      display: none;
    }

    .grid-events-create-button {
      user-select: none;
      cursor: pointer;
      font-weight: 600;
      border-radius: @user-item-border-radius-sub;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 200px;
      background-color: @theme-color;
      color: #fff;

      .create-button-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 500ms;
      }

      .create-button {
        margin: 10px;
        border: 3px solid #fff;
        border-radius: @user-create-button-border-radius;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
      }

      .create-button span {
        transition: 500ms;
      }

      .button-rotate {
        rotate: 45deg;
      }
    }

    .grid-events-create-button:hover .create-button-group {
      scale: 1.3;
    }
  }
}
</style>

<script setup>
import Button from "../components/Button.vue";
import Calendar from "../components/Calendar.vue";
import Todolist from "../components/TodoList.vue";
import EventCreateForm from "../components/EventCreateForm.vue";
import EventList from "../components/EventList.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const isSlide = ref(false);

const jumpToEventDetail = () => {
  router.push({
    path: "/eventDetail",
  });
};

const createEvent = () => {
  isSlide.value = !isSlide.value;
};
</script>
