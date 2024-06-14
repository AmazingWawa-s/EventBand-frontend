<template>
  <div class="w-settings-main-container">
    <div class="form">
      <div>是否公开:</div>
      <div class="form-content">
        <div @click="tempData.event_type = 1" class="select-box-frame">
          <CircleCheckBig fill="pink" v-if="tempData.event_type == 1" :size="18" />
          <Circle v-else :size="18" />
          <div>是</div>
        </div>
        <div @click="tempData.event_type = 0" class="select-box-frame">
          <Circle v-if="tempData.event_type == 1" :size="18" />
          <CircleCheckBig fill="pink" v-else :size="18" />
          <div>否</div>
        </div>
      </div>
      <div>最大人数:</div>
      <div class="form-content">
        <div @click="tempData.person_max = -1" class="select-box-frame">
          <CircleCheckBig fill="pink" v-if="tempData.person_max == -1" :size="18" />
          <Circle v-else :size="18" />
          <div>不限</div>
        </div>
        <div @click="tempData.person_max = inputValue" class="select-box-frame">
          <Circle v-if="tempData.person_max == -1" :size="18" />
          <CircleCheckBig fill="pink" v-else :size="18" />
          <input
            type="number"
            @input="tempData.person_max = inputValue"
            v-model="inputValue"
          />
        </div>
      </div>
      <div>筹备进度:</div>
      <div class="form-content">
        <div @click="tempData.event_ready = 0" class="select-box-frame">
          <CircleCheckBig fill="pink" v-if="tempData.event_ready == 0" :size="18" />
          <Circle v-else :size="18" />
          <div>筹备中</div>
        </div>
        <div @click="tempData.event_ready = 1" class="select-box-frame">
          <Circle v-if="tempData.event_ready == 0" :size="18" />
          <CircleCheckBig v-else fill="pink" :size="18" />
          <div>筹备完毕</div>
        </div>
      </div>
      <div class="delete">
        <div :class="{ save: true, saved: !isChanged }" @click="updateEvent">
          <div class="content"><Save />保存设置</div>
        </div>
        <div
          class="button"
          v-focus="
            () => {
              console.log('check');
            }
          "
        >
          <div class="content" @click="deleteEvent"><TriangleAlert />删除活动</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.w-settings-main-container {
  padding: 10px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  user-select: none;
  justify-content: center;

  .form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    width: 100%;
    max-width: 340px;
    white-space: nowrap;
    height: 100%;

    .delete {
      grid-column: 1/3;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .save {
        border: 2px solid #333;
        color: #333;
        padding: 2px;
        border-radius: 10px;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        cursor: pointer;

        .content {
          padding: 8px;
          display: flex;
          align-items: center;
        }
      }

      .saved {
        color: #aaa;
        border: 2px solid #aaa;
        pointer-events: none;
      }

      .button {
        border: 2px solid @theme-color;
        color: @theme-color;
        padding: 2px;
        border-radius: 10px;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        cursor: pointer;

        .content {
          background-color: #fff;
          z-index: 2;
          padding: 8px;
          border-radius: 8px;
          width: 100%;
          height: 100%;
          gap: 2px;
          display: flex;
          align-items: center;
        }
      }
    }

    .form-content {
      gap: 20px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .select-box-frame {
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 10px;

      input {
        max-width: 70px;
        border-radius: 5px;
        font-family: "Consolas";
      }

      .select-box {
        width: 16px;
        height: 16px;
        background-color: #eee;
        border-radius: 5px;
        border: 2px solid #aaa;
        position: relative;
      }
    }
  }
}
</style>

<script setup>
import { Check } from "lucide-vue-next";
import { TriangleAlert } from "lucide-vue-next";
import { LoaderCircle } from "lucide-vue-next";
import { Save } from "lucide-vue-next";
import { GripVertical } from "lucide-vue-next";
import { CircleCheckBig } from "lucide-vue-next";
import { Circle } from "lucide-vue-next";
import { computed, inject, reactive, ref } from "vue";
import { ApiUpdateSettings } from "../api";
import { useStore } from "../store";

const eventData = inject("basicData");
const store = useStore();
const eventId = inject("eventId");
const tempData = reactive({
  ...eventData,
});
const inputValue = ref(eventData.person_max == -1 ? 30 : eventData.person_max);
const isChanged = computed(() => {
  return (
    tempData.person_max != eventData.person_max ||
    tempData.event_type != eventData.event_type ||
    tempData.event_ready != eventData.event_ready
  );
});

const updateEvent = () => {
  const token = localStorage.getItem("token");
  ApiUpdateSettings(
    token,
    eventId.value,
    tempData.person_max,
    tempData.event_type,
    tempData.event_ready
  ).then((res) => {
    console.log(res);
    const { updateDetailOk } = res.data;
    if (updateDetailOk) {
      eventData.person_max = tempData.person_max;
      eventData.event_ready = tempData.event_ready;
      eventData.event_type = tempData.event_type;
    }
  });
};

const deleteEvent = () => {
  store.systemInform = {
    type: "WARNING",
    content: "是否删除活动？此操作不可撤销",
    eventId: eventId,
  };
};
</script>
