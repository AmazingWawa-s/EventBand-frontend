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
        <div class="create-button">
          <span :class="{ 'button-rotate': isSlide }">＋</span>
        </div>
        <p>创建</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@padding-L: 10px;
@border-radius-L: 10px;
@gap: 10px;

.user-main-container {
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
  gap: @gap;
  padding: @padding-L;
  overflow: hidden;

  .grid-item {
    border-radius: @border-radius-L;
    border: 1px solid #eee;
    background-color: #fff;
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
    gap: @gap;
    padding: @padding-L;
    grid-template-columns: 1fr auto;

    .grid-events-frame {
      width: 100%;
      height: 100%;

      position: relative;
      overflow: hidden;
      border-radius: @border-radius-L;

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
          border-radius: @border-radius-L;
          background-color: #ddd;
        }

        .grid-events-create {
          background-color: #ddd;
          border-radius: @border-radius-L;
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
      border-radius: @border-radius-L;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 200px;
      background-color: #eee;

      .create-button {
        margin: 10px;
        border: 3px solid #333333;
        border-radius: 5px 10px 5px 10px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        font-weight: 100;
      }

      .create-button span {
        transition: 500ms;
      }

      .button-rotate {
        rotate: 45deg;
      }
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
