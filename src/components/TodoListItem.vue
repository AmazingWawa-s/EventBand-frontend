<template>
  <div :class="{ inform: true, 'todolist-item': true }">
    <div></div>
    <div class="todolist-item-body">
      <div class="todolist-item-content">
        <p>{{ time }}</p>
        <div>{{ content }}</div>
      </div>
      <img
        v-if="type == 'waiting'"
        class="todolist-item-button"
        src="../assets/waiting.svg"
        alt=""
      />
      <img
        v-else-if="type == 'link'"
        class="todolist-item-button"
        src="../assets/jumpTo.svg"
        alt=""
      />
      <img
        v-else-if="type == 'error'"
        class="todolist-item-button"
        src="../assets/more.svg"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.inform {
  // border: 2px solid @theme-black;
  // background-color: @theme-black;
}

.todolist-item {
  cursor: pointer;
  user-select: none;
  display: grid;
  border-top: 1px solid #eee;
  padding: 10px 10px;
  align-items: center;
  // background-color: rgb(255, 255, 255);
  grid-template-columns: 5px 1fr;
  justify-items: center;
  transition: 300ms;

  .todolist-item-body {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;

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
      width: 24px;
      margin: 0 10px;
    }
  }
}

.todolist-item:hover {
  background-color: rgba(96, 96, 96, 0.1);
}
</style>

<script setup>
const props = defineProps(["time", "content", "type"]);
</script>
