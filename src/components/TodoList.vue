<template>
  <div class="todolist-main-container">
    <div class="todaylist-frame">
      <div class="header">
        <Cross class="icon" fill="#333" />
        <Cross class="icon" fill="#333" />
        <Cross class="icon" fill="#333" />
        <div class="header-date">
          <div>{{ checkedDate.year }}</div>
          <div>
            <span class="month">{{
              checkedDate.month < 10 ? "0" + checkedDate.month : checkedDate.month
            }}</span>
            <span class="divide">/</span>
            <span class="date">{{
              checkedDate.date < 10 ? "0" + checkedDate.date : checkedDate.date
            }}</span>
          </div>
        </div>
        <Cross class="icon" fill="#333" />
        <Cross class="icon" fill="#333" />
        <Cross class="icon" fill="#333" />
      </div>
      <div class="body">
        <div class="nothing">暂无安排<Coffee /></div>
      </div>
    </div>
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
            <ClipboardPlus :size="20" />
            新建
          </div>
        </div>
        <div class="todolist-sub-frame">
          <div :class="{ 'todolist-form': true, 'form-close': !addTodolist }">
            <div class="todolist-form-content">
              <textarea class="title"></textarea>
              <div class="type">
                <div></div>
                <Bookmark />
              </div>
              <div class="add"><CirclePlus />添加</div>
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
@todolist-form-color: rgb(255, 241, 195);
@todolist-frame-color: rgb(228, 228, 228);
@todaylist-color: #eee;

.todolist-main-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;

  .todaylist-frame {
    user-select: none;
    height: 100%;
    width: 100%;
    background-color: @todaylist-color;
    // color: #fff;
    border-radius: @user-item-border-radius-sub;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    padding: 10px;
    justify-items: center;
    gap: 10px;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;

      .icon {
        rotate: 45deg;
      }
    }

    .header-date {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 28px;
      font-weight: 600;
      font-family: "consolas";

      .month {
        font-size: 24px;
      }

      .divide {
        font-size: 16px;
        padding: 0 1px;
      }

      .date {
        font-size: 24px;
      }
    }

    .body {
      width: 100%;
      height: 100%;
      font-size: 24px;
      .nothing {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: #fff;
        border-radius: 3px;
        height: 100%;
        font-weight: 600;
        gap: 5px;
        color: #666;
      }
    }
  }

  .todolist-frame {
    height: 100%;
    background-color: @todolist-frame-color;
    width: 100%;
    border-radius: @user-item-border-radius-sub;
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
        background-color: @todolist-form-color;
        border-radius: 0 0 6px 6px;
        transition: 500ms;
        border-top: none;
        overflow: hidden;
        height: 100%;

        .todolist-form-content {
          overflow: hidden;
          width: 100%;
          height: 100%;
          display: grid;
          padding: 0 10px 10px 10px;
          gap: 10px;
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
            padding: 10px;
            overflow: hidden;
            box-sizing: border-box;
          }

          .type {
            width: 100%;
            height: 100%;
            grid-area: b;
            border-radius: 5px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            div {
              width: 5px;
              height: 60%;
              background-color: @todolist-frame-color;
              border-radius: 10px;
            }
          }

          .add {
            background-color: orange;
            color: #fff;
            cursor: pointer;
            font-weight: 600;
            font-size: 24px;
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
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
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: @todolist-form-color;
          border-radius: 6px 6px 0 0;
          padding: 10px;
          color: #333;
          font-weight: 600;
          cursor: pointer;
        }
      }

      .todolist-scroll {
        position: relative;
        height: 100%;
        width: 100%;
        border-top: 3px dotted #666;
        background-color: #fff;
        transition: 500ms;
        overflow-y: scroll;
        border-radius: 0 0 6px 6px;
      }

      .todolist-scroll::-webkit-scrollbar {
        display: none;
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
      color: #666;
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

  .todolist-tab {
    border-radius: 6px 6px 0 0;
    padding: 5px;
    font-size: 24px;
    user-select: none;
  }
}

@media (max-width: 1200px) {
  .todolist-main-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;

    .todaylist-frame {
      grid-template-columns: auto 1fr;
      grid-template-rows: 1fr;
      align-items: center;

      .icon {
        display: none;
      }
    }
  }
}
</style>

<script setup>
import { ref, inject } from "vue";
import TodoListItem from "../components/TodoListItem.vue";
import { ClipboardPlus } from "lucide-vue-next";
import { Coffee } from "lucide-vue-next";
import { Bookmark } from "lucide-vue-next";
import { CirclePlus } from "lucide-vue-next";
import { Cross } from "lucide-vue-next";
const tabChange = ref(false);
const addTodolist = ref(false);
const checkedDate = inject("checkedDate");

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
