<template>
  <div v-if="!loading" class="user-main-container">
    <div class="grid-calendar grid-item">
      <Calendar />
    </div>
    <div class="grid-tasks grid-item">
      <Todolist />
    </div>
    <div class="grid-item"></div>
    <div class="grid-events grid-item">
      <div class="grid-events-frame">
        <div
          :class="{
            'grid-events-frame-scroll': true,
            'is-slide': isSlide,
          }"
        >
          <div class="grid-events-create">
            <EventCreateForm />
          </div>
          <div class="grid-events-list">
            <EventList :eventlist="eventList" />
          </div>
        </div>
      </div>
      <div @click="isSlide = !isSlide" class="grid-events-create-button">
        <CreateButton />
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

.user-main-container {
  position: relative;
  z-index: @z-index-body;
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
    overflow: hidden;
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
    overflow: hidden;
    gap: @user-gap;
    grid-template-columns: 1fr auto;

    .grid-events-frame {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      border-radius: @user-item-border-radius-sub;

      .grid-events-frame-scroll {
        position: absolute;
        width: 200%;
        height: 100%;
        left: -100%;
        background-color: #fff;
        transition: 500ms;
        display: grid;
        grid-template-columns: 1fr 1fr;

        .grid-events-list {
          overflow: hidden;
        }

        .grid-events-create {
          overflow: hidden;
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
      position: relative;
      user-select: none;
      overflow: hidden;
      cursor: pointer;
      font-weight: 600;
      border-radius: @user-item-border-radius-sub;
      font-size: 30px;
      height: 100%;
      align-self: flex-end;
      width: 200px;
      height: 386px;
    }
  }
}
</style>

<script setup>
import Calendar from "../components/Calendar.vue";
import Todolist from "../components/TodoList.vue";
import EventCreateForm from "../components/EventCreateForm.vue";
import EventList from "../components/EventList.vue";
import CreateButton from "../components/svg/CreateButton.vue";
import { useRouter } from "vue-router";
import { ref, reactive, provide, onMounted } from "vue";
import { ApiLoadUserPage } from "../api";
import Loading from "../components/svg/Loading.vue";
import { useStore } from "../store";

const eventList = ref();
const store = useStore();
const loading = ref(true);

onMounted(() => {
  let token = localStorage.getItem("token");
  console.log(token);
  ApiLoadUserPage(token).then((res) => {
    console.log(res);
    const { eventlist, locationlist } = res.data.data;
    eventList.value = eventlist;
    store.locationList = locationlist;
    loading.value = false;
  });
});

const router = useRouter();
const isSlide = ref(false);

const currentDate = new Date();

const checkedDate = reactive({
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1,
  date: currentDate.getDate(),
});

provide("checkedDate", checkedDate);
</script>
