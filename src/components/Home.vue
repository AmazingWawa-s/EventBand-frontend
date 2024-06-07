<template>
  <div class="home-main-container">
    <div class="scrollsnap section1">
      <img class="section1-logo" src="../assets/title_ver2.svg" alt="" />
      <div class="section1-msg" @click="flipActive = true">立即开始</div>
      <div class="section1-login-frame">
        <div :class="{ 'flip-frame': true, 'flip-active': flipActive }">
          <div class="front"></div>
          <div class="back login-form">
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
            <Button @click="register">注册</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="scrollsnap section2">
      <div></div>
    </div>
    <div class="scrollsnap section3"></div>
    <div class="scrollsnap section4"></div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { ApiLogin } from "../api";
import { ref } from "vue";

const router = useRouter();
const store = useStore();
const formPassword = ref("");
const formName = ref("");
const formMsg = ref("");

const flipActive = ref(false);

const login = () => {
  console.log("login function:");
  if (formName.value && formPassword.value) {
    ApiLogin(formName.value, formPassword.value)
      .then((res) => {
        console.log(res);
        const { userNameExist, userPasswordOk, userToken } = res.data;
        if (!userNameExist) {
          formMsg.value = "用户名不存在";
        } else if (!userPasswordOk) {
          formMsg.value = "密码错误";
        } else {
          localStorage.setItem("token", userToken);
          localStorage.setItem("userName", formName.value);
          store.isLogin = true;
          store.token = userToken;
          store.userName = formName.value;
          router.push({
            path: "/user",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    formMsg.value = "※请输入用户名和密码";
  }
};

const register = () => {};
</script>

<style lang="less" scoped>
.home-main-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;

  .scrollsnap {
    // max-width: 1366px;
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

      .flip-frame {
        height: 100%;
        width: 100%;
        max-width: 500px;
        max-height: 600px;
        border-radius: 10px;
        position: relative;
        transform-style: preserve-3d;
        transition: 300ms;

        .front {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .back {
          background-color: #eee;
          width: 100%;
          position: absolute;
          backface-visibility: hidden;
          height: 100%;
          transform: rotateY(180deg);
        }
      }

      .flip-active {
        transform: rotateY(180deg);
      }

      .login-form {
        background-color: #eee;
        height: 100%;
        width: 100%;
        max-width: 500px;
        max-height: 600px;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }
  }

  .section2 {
    background-color: #eee;
  }
}
</style>
