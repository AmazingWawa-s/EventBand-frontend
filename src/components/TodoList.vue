<template>
  <div class="todolist-main-container">
    <div class="todolist-specified">
      <div>选定日期的事项</div>
    </div>
    <div class="todolist-general">
      <div class="todolist-general-content">
        通知，待办事项等
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.todolist-main-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 4fr 5fr;
  gap: 5px;
  grid-template-rows: 1fr;
  position: relative;
  overflow: hidden;
  padding: 10px;

  .todolist-specified {
    width: 100%;
    height: 100%;
    background-color: #eee;
    border-radius: 6px;
  }

  .todolist-general {
    width: 100%;
    height: 100%;
    position: relative;

    .todolist-general-content {
      background-color: #eee;
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    .todolist-specified {
      position: absolute;
      left: 0;
    }
  }
}
</style>
