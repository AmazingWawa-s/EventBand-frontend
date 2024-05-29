<template>
  <div class="todolist-main-container">
    <!-- <div @click="() => (tabChange = true)" class="todolist-tab specified">2024/5/16</div>
    <div @click="() => (tabChange = false)" class="todolist-tab general">待办</div>
    <div class="todolist-scroll-frame">
      <div class="todolist-scroll">
        <div :class="{ 'todolist-content specified': true }"></div>
        <div class="todolist-content general">
          <TodoListItem v-for="item in mockMessageList" v-bind="item" :key="item.time" />
        </div>
      </div>
    </div> -->
    <div class="todolist-frame">
      <div class="todolist-header">
        <div class="header-front">
          待办
          <img src="../assets/todo.svg" alt="" />
        </div>
        <img class="todo-word" src="../assets/todo_word.svg" alt="" />
      </div>
      <div class="todolist-content">
        <div class="todolist-add">
          <div
            @click="() => (addTodolist = !addTodolist)"
            :class="{ button: true, 'button-form': addTodolist }"
          >
            新建
          </div>
        </div>
        <div class="todolist-sub-frame">
          <div :class="{ 'todolist-form': true, 'form-close': !addTodolist }">
            <div class="todolist-form-content">
              <textarea class="title"></textarea>
              <div class="type">类型</div>
              <div class="add">添加</div>
            </div>
          </div>
          <div class="todolist-scroll">
            <TodoListItem
              v-for="item in mockMessageList"
              v-bind="item"
              :key="item.time"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.todolist-main-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  border-radius: @user-item-border-radius-sub;
  background-color: #fff;

  .todolist-frame {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    padding-bottom: 10px;
    grid-template-rows: auto 1fr;

    .todolist-sub-frame {
      overflow: hidden;
      position: relative;
      height: 100%;
    }

    .todolist-content {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      overflow: hidden;
      transition: 500ms;
      display: grid;
      border-radius: 0 0 6px 6px;
      grid-template-rows: auto 1fr;

      .todolist-form {
        background-color: #919191;
        border-radius: 0 0 6px 6px;
        transition: 500ms;
        overflow: hidden;
        height: 100%;

        .todolist-form-content {
          overflow: hidden;
          width: 100%;
          height: 100%;
          display: grid;
          padding: 0 10px 10px 10px;
          gap: 5px;
          grid-template-areas:
            "a a a"
            "a a a"
            "b b c";

          .title {
            outline: none;
            border-radius: 3px;
            resize: none;
            grid-area: a;
            width: 100%;
            height: 100%;
            border: none;
            padding: 5px;
            overflow: hidden;
            box-sizing: border-box;
          }

          .type {
            width: 100%;
            height: 100%;
            grid-area: b;
            background-color: #fff;
          }

          .add {
            background-color: #fff;
            grid-area: c;
          }
        }
      }

      .form-close {
        height: 0;
      }

      .todolist-add {
        position: relative;

        .button {
          width: 100%;
          background-color: #919191;
          text-align: center;
          border-radius: 6px 6px 0 0;
          padding: 5px;
          color: #fff;
          cursor: pointer;
        }
      }

      .todolist-scroll {
        position: relative;
        height: 100%;
        width: 100%;
        border: 1px solid #eee;
        background-color: #fff;
        transition: 500ms;
        overflow-y: scroll;
        border-radius: 0 0 6px 6px;
      }

      .todolist-scroll::-webkit-scrollbar {
        // display: none;
      }
    }

    .todolist-header {
      height: 60px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      user-select: none;
      justify-content: space-between;
      position: relative;
      color: @todolist-header-font-color;
      font-size: 36px;
      font-weight: 600;

      .todo-word {
        height: 120px;
        transform: translate(10px, 10px);
      }

      .header-front {
        display: flex;
        align-items: center;

        img {
          rotate: 3deg;
          height: 48px;
        }
      }
    }
  }

  // @media (max-width: 1200px) {

  //   .todolist-content {
  //     grid-area: c;
  //   }

  //   .specified {
  //     border-radius: 0 6px 6px 6px;
  //   }

  //   .general {
  //     border-radius: 6px 0 6px 6px;
  //   }

  //   .todolist-tab {
  //     cursor: pointer;
  //   }
  // }

  .todolist-tab {
    border-radius: 6px 6px 0 0;
    padding: 5px;
    font-size: 24px;
    user-select: none;
  }
}
</style>

<script setup>
import { ref } from "vue";
import TodoListItem from "../components/TodoListItem.vue";

const tabChange = ref(false);
const addTodolist = ref(false);

const mockMessageList = ref([
  {
    time: "2024/5/17 15:49",
    content: "活动“XXXXX”审核中",
    type: "waiting",
    link: "",
  },
  {
    time: "2024/5/17 18:30",
    content: "有新的报销申请",
    type: "link",
    link: "",
  },
  {
    time: "2024/5/17 18:30",
    content: "有新的报销申请",
    type: "link",
    link: "",
  },
  {
    time: "2024/5/17 18:30",
    content: "有新的报销申请",
    type: "link",
    link: "",
  },
  {
    time: "2024/5/17 21:00",
    content: "活动“XXXX”未通过审核",
    type: "error",
    link: "",
  },
  {
    time: "2024/5/17 21:00",
    content: "活动“XXXX”未通过审核",
    type: "error",
    link: "",
  },
]);
</script>
