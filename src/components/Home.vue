<template>
  <div class="home-main-container">
    <div class="scrollsnap section1">
      <img class="section1-logo" src="../assets/title_ver2.svg" alt="" />
      <div class="section1-msg">立即开始</div>
      <div class="section1-login-frame">
        <div class="login-form">
          <p>
            用户名
            <input v-model="formName" type="text" />
          </p>
          <p>
            密码
            <input v-model="formPassword" type="text" />
          </p>
          <p>{{ formMsg }}</p>
          <Button @click="login">登录</Button>
        </div>
      </div>
    </div>
    <div class="scrollsnap section2"></div>
    <div class="scrollsnap section3"></div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { ApiLogin } from "../api";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const store = useStore();

const formName = ref("");
const formPassword = ref("");
const formMsg = ref("");

const login = () => {
  console.log("login function:");
  if (formName.value && formPassword.value) {
    ApiLogin(formName.value, formPassword.value)
      .then((res) => {
        const { userToken } = res.data;
        console.log(res.data);
        localStorage.setItem("token", userToken);
        store.isLogin = true;
        router.push({
          path: "/user",
        });
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    formMsg.value = "※请输入用户名和密码";
  }
};
</script>

<style lang="less" scoped>
.home-main-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  .scrollsnap {
    max-width: 1366px;
    height: min(56vw, 758px);
    margin: 0 auto;
  }

  .section1 {
    padding: 20px 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "a b" "c b";
    align-items: center;
    gap: 20px;

    .section1-msg {
      grid-area: c;
    }

    .section1-logo {
      grid-area: a;
    }

    .section1-login-frame {
      grid-area: b;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .login-form {
        background-color: #eee;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>
