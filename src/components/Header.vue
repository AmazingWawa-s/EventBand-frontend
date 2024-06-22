<template>
  <div class="header">
    <div class="header-front">
      <img class="icon" src="../assets/icon_logo_ver2.svg" alt="" />
    </div>
    <div class="header-middle">
      <!-- <div class="search-bar">
        <Search />
        <div class="divide"></div>
        <input type="text" v-model="keyWord" placeholder="搜索活动" />
        <div class="divide"></div>
        <ArrowRight class="button" @click="jumpToSearch" />
      </div> -->
    </div>
    <div v-if="store.isLogin" class="header-back">
      <div class="user-bar" @click="jumpToUser">
        <CircleUserRound />{{ store.userName }}
      </div>
      <!-- <div @click="test" class="menu-item">
        <Bolt />
      </div> -->
      <div class="menu-item" @click="jumpToChatroom">
        <MessageSquareMore />
      </div>
      <div class="menu-item" @click="logoff">
        <LogOut />
      </div>
    </div>
    <div v-else></div>
    <!-- <div class="header-back" v-else>
      <div class="menu-item">登录<LogIn /></div>
    </div> -->
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

      .button {
        cursor: pointer;
      }

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
    padding-right: 5px;

    .user-bar {
      flex-shrink: 0;
      font-size: 16px;
      padding: 5px 5px 5px 5px;
      border: 2px solid @theme-black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      cursor: pointer;
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
import { LogIn } from "lucide-vue-next";
import axios from "axios";
import { ApiLogoff, ApiTest } from "../api";
import { Search } from "lucide-vue-next";
import { CircleUserRound } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const router = useRouter();

const store = useStore();

const keyWord = ref("");

onMounted(() => {
  store.token = localStorage.getItem("token");
  store.userName = localStorage.getItem("userName");
  if (!store.token || !store.userName) {
    store.isLogin = false;
    router.push({
      path: "/",
    });
  } else {
    store.isLogin = true;

    const ws = new WebSocket("wsUrl/ws/notifications" + "/");

    ws.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    });

    ws.addEventListener("open", () => {
      console.log("连接websocket");
      const token = localStorage.getItem("token");
      // const msg = {
      //   content: "login",
      //   userToken: token,
      //   timeStamp: Date.now(),
      // };
      // ws.send(JSON.stringify(msg));
    });

    ws.addEventListener("close", () => {
      const token = localStorage.getItem("token");
      // const msg = {
      //   content: "logoff",
      //   userToken: token,
      //   timeStamp: Date.now(),
      // };
      // ws.send(JSON.stringify(msg));
    });

    ws.addEventListener("error", (res) => {
      console.log(res);
    });
  }
});

const test = () => {
  let token = localStorage.getItem("token");
  ApiTest(token).then((res) => {
    console.log(res);
  });
};

const logoff = () => {
  console.log("退出登录");
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  store.isLogin = false;
  store.userName = null;
  store.token = null;
  router.push({
    path: "/",
  });
};

const jumpToSearch = () => {
  router.push({
    path: "/search",
    query: {
      keyword: keyWord.value,
    },
  });
  keyWord.value = "";
};

const jumpToChatroom = () => {
  router.push({
    path: "/chatroom",
  });
};

const jumpToUser = () => {
  router.push({
    path: "/user",
  });
};
</script>
