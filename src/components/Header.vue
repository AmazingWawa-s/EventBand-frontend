<template>
  <div class="header">
    <div class="header-front">
      <img class="icon" src="../assets/icon_logo_ver2.svg" alt="" />
    </div>
    <div class="header-middle">
      <div class="search-bar">
        <Search />
        <div class="divide"></div>
        <input type="text" placeholder="搜索活动" />
        <div class="divide"></div>
        <ArrowRight />
      </div>
    </div>
    <div v-if="store.isLogin" class="header-back">
      <div class="user-bar"><CircleUserRound />{{ store.userName }}</div>
      <div class="menu-item">
        <Bolt />
      </div>
      <div class="menu-item">
        <MessageSquareMore />
      </div>
      <div class="menu-item" @click="logoff">
        <LogOut />
      </div>
    </div>
    <div v-else>登录</div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: @header-height;
  width: 100%;
  padding: @header-padding;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: @header-border-bottom;

  .header-front {
    height: 100%;
  }

  .icon {
    height: 100%;
  }

  .header-middle {
    width: 50%;
    max-width: 500px;

    .search-bar {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%;
      height: 100%;
      border: 2px solid #333;
      padding: 5px;
      border-radius: 10px;

      input {
        border: none;
        padding: 0;
        border-radius: 0;
      }

      .divide {
        width: 5px;
        border-radius: 10px;
        height: 30px;
        background-color: #ddd;
      }
    }
  }

  .header-back {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    .user-bar {
      flex-shrink: 0;
      font-size: 16px;
      padding: 5px 5px 5px 5px;
      border: 2px solid @theme-black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      color: #333;
      border-radius: 50px;
    }

    .menu-item {
      transition: 300ms;
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 100%;
    }

    .menu-item:hover {
      box-shadow: 0 -2px 0 #333 inset;
    }
  }
}
</style>

<script setup>
import Button from "./Button.vue";
import Avator from "./Avator.vue";
import { useStore } from "../store";
import { LogOut } from "lucide-vue-next";
import { MessageSquareMore } from "lucide-vue-next";
import { Bolt } from "lucide-vue-next";
import { ArrowRight } from "lucide-vue-next";
import axios from "axios";
import { ApiLogoff } from "../api";
import { Search } from "lucide-vue-next";
import { CircleUserRound } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();

const store = useStore();

onMounted(() => {
  store.token = localStorage.getItem("token");
  store.userName = localStorage.getItem("userName");
  if (store.token && store.userName) {
    store.isLogin = true;
    router.push({
      path: "/user",
    });
  }
});

const logoff = () => {
  console.log("退出登录");

  // ApiLogoff(store.token)
  //   .then((res) => {
  //     console.log(res);
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  store.isLogin = false;
  store.userName = null;
  store.token = null;
  router.push({
    path: "/",
  });
  //   .catch((res) => {
  //     console.log(res);
  //   });
};
</script>
