<template>
  <div class="m-participants-main-container">
    <div class="participants-header">
      <div class="front">成员列表</div>
      <div class="end">
        <div class="icon">
          <img src="../assets/sift.svg" alt="" />
          |
        </div>
        <div class="condition">{{ condition }}</div>
        <div class="drop-menu">
          <div @click="() => (condition = item)" v-for="item in dropMenu" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="participants-body">
      <div class="participants-contents">
        <div class="participants-item grid-title">
          <div class="">成员</div>
          <div>分组</div>
          <div></div>
          <div></div>
        </div>
        <div v-for="item in participants" class="participants-item" :key="item">
          <div class="">{{ item.name }}</div>
          <div>{{ item.group }}</div>
          <div class="contact">
            <img src="../assets/message.svg" alt="" />
          </div>
          <div class="edit">
            <img src="../assets/edit.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="participants-bottom">参与方式：自由参加/报名参加</div>
  </div>
</template>

<style lang="less" scoped>
.m-participants-main-container {
  position: relative;
  z-index: @z-index-modules;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  user-select: none;
  overflow: hidden;

  .participants-header {
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .end {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      border: 2px solid #333;
      font-size: 16px;
      font-weight: 500;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;

      .icon {
        display: flex;
        align-items: center;
      }

      img {
        width: 16px;
      }

      .drop-menu {
        position: absolute;
        top: 100%;
        overflow: hidden;
        height: 0;
        border: 2px #333 solid;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        div {
          padding: 5px;
        }

        div:hover {
        }
      }
    }
  }

  .participants-body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-size: 18px;
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;

    .participants-contents {
      width: 100%;
      display: grid;
      grid-template-columns: 3fr 2fr auto auto;
      column-gap: 5px;
      row-gap: 10px;

      .menu-head {
        font-weight: 600;
      }

      .participants-item {
        width: 100%;
        display: grid;
        grid-column: 1/5;
        grid-template-columns: subgrid;
        align-items: center;

        img {
          width: 18px;
          cursor: pointer;
        }
      }

      .grid-title {
        font-weight: 600;
      }
    }
  }

  .participants-bottom {
    margin-top: 10px;
    font-size: 16px;
  }
}

.module-focus {
  z-index: @z-index-module-focus;
}
</style>

<script setup>
import { ref } from "vue";

const condition = ref("全部");

const dropMenu = ref(["全部", "参与者", "管理员", "志愿者", "活动负责人"]);

const participants = ref([
  {
    name: "小明",
    group: "参与者",
    id: "123456",
  },
  {
    name: "小红",
    group: "参与者",
    id: "123456",
  },
  {
    name: "小刚",
    group: "志愿者",
    id: "123456",
  },
  {
    name: "小兵",
    group: "志愿者",
    id: "123456",
  },
]);
</script>
