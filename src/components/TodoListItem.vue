<template>
  <div @click="handleClick" :class="{ inform: true, 'todolist-item': true }">
    <div class="todolist-item-body">
      <div
        class="label"
        :style="{
          backgroundColor:
            message_type == 'error'
              ? 'orangered'
              : message_type == 'waiting'
              ? 'lightblue'
              : 'lightgreen',
        }"
      ></div>
      <div class="todolist-item-content">
        <p>{{ message_time.replace("T", " ") }}</p>
        <div>{{ message_content }}</div>
      </div>
      <AlarmClock v-if="message_type == 'waiting'" class="todolist-item-button" />
      <CircleArrowRight v-else-if="message_type == 'link'" class="todolist-item-button" />
      <MessageCircleWarning
        v-else-if="message_type == 'error'"
        class="todolist-item-button"
      />
    </div>
  </div>
  <div
    v-if="message_detail"
    class="todolist-item-detail"
    :style="{ maxHeight: showDetail ? '100px' : 0 }"
  >
    <div>{{ "备注:" + message_detail }}</div>
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
    margin: 10px;
    padding: 0 10px;
    font-size: 18px;
    color: #666;
    // background-color: #eee;
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
import { useRouter } from "vue-router";
const props = defineProps([
  "message_time",
  "message_content",
  "message_type",
  "message_detail",
  "message_link",
]);

const router = useRouter();
const showDetail = ref(false);

const handleClick = () => {
  if (props.message_link) {
    const query = props.message_link.split("?")[1];
    const url = props.message_link.split("?")[0];
    router.push({
      path: url,
      query: {
        id: query.split("=")[1],
      },
    });
  } else if (props.message_detail) {
    showDetail.value = !showDetail.value;
  }
};
</script>
