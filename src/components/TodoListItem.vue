<template>
  <div
    @click="() => (showDetail = !showDetail)"
    :class="{ inform: true, 'todolist-item': true }"
  >
    <div class="todolist-item-body">
      <div
        class="label"
        :style="{
          backgroundColor:
            type == 'error'
              ? 'orangered'
              : type == 'waiting'
              ? 'lightblue'
              : 'lightgreen',
        }"
      ></div>
      <div class="todolist-item-content">
        <p>{{ time }}</p>
        <div>{{ content }}</div>
      </div>
      <AlarmClock v-if="type == 'waiting'" class="todolist-item-button" />
      <CircleArrowRight v-else-if="type == 'link'" class="todolist-item-button" />
      <MessageCircleWarning v-else-if="type == 'error'" class="todolist-item-button" />
    </div>
  </div>
  <div
    v-if="details"
    class="todolist-item-detail"
    :style="{ height: showDetail ? '100px' : 0 }"
  >
    <div>详情</div>
  </div>
</template>

<style lang="less" scoped>
.todolist-item {
  cursor: pointer;
  user-select: none;
  border-top: 1px solid #eee;
  padding: 10px 10px;
  transition: 300ms;

  .todolist-item-body {
    height: 100%;
    width: 100%;
    display: grid;
    gap: 5px;
    grid-template-columns: auto 1fr auto;
    align-items: center;

    .label {
      width: 5px;
      background-color: orange;
      height: 80%;
      border-radius: 10px;
    }

    .todolist-item-content {
      height: 100%;
      display: grid;
      grid-template-rows: auto 1fr;
      align-items: center;
      width: 100%;
      p {
        font-size: 16px;
        color: #555;
      }
    }

    .todolist-item-button {
      margin: 0 10px;
    }
  }
}

.todolist-item-detail {
  overflow: hidden;
  transition: 300ms;

  div {
    margin: 0 0 0 10px;
    // background-color: #eee;
    box-shadow: 1px 0 2px #ddd inset;
    height: 100%;
  }
}

.todolist-item:hover {
  background-color: rgba(96, 96, 96, 0.1);
}
</style>

<script setup>
import { ref } from "vue";
import { AlarmClock } from "lucide-vue-next";
import { CircleArrowRight } from "lucide-vue-next";
import { MessageCircleWarning } from "lucide-vue-next";
const props = defineProps(["time", "content", "type", "details"]);

const showDetail = ref(false);
</script>
