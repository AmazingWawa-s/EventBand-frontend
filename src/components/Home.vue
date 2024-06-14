<template>
  <div class="home-main-container">
    <div class="scrollsnap section1">
      <img class="section1-logo" src="../assets/title_ver2.svg" alt="" />
      <div class="section1-left-down">
        <img src="../assets/deco.svg" alt="" />
        <div class="section1-msg" @click="flipActive = !flipActive">
          立即开始<ArrowRight :size="36" />
        </div>
        <img src="../assets/deco2.svg" alt="" />
      </div>
      <div class="section1-login-frame">
        <div :class="{ 'flip-frame': true, 'flip-active': flipActive }">
          <div class="front">
            <div class="front-msg1">
              <div class="front-msg1-back"></div>
              <div class="front-msg1-front">日程管理小秘书<NotebookPen /></div>
            </div>
            <div class="calendar-mock">
              <div class="header">
                <Cross fill="#ffd68b" :size="16" />
                <Cross fill="#ffd68b" :size="16" />
              </div>
              <div class="body">
                <div class="item" v-for="i in 25" :key="i">
                  <Check v-show="i % 7 == 0 || i % 11 == 0 || i == 4 || i == 25" />
                </div>
              </div>
            </div>
            <div class="schedule-mock">
              <div class="header">
                <div class="item">
                  <Clock2 />
                </div>
                <div class="item">
                  <Clock3 />
                </div>
                <div class="item">
                  <Clock4 />
                </div>
                <div class="item">
                  <Clock5 />
                </div>
              </div>
              <div class="body">
                <div class="item" v-for="i in 4" :key="i">
                  <div class="divide1"></div>
                  <div class="divide2"></div>
                </div>
              </div>
            </div>
            <div class="front-msg2">
              <div class="front-msg2-back"></div>
              <div class="front-msg2-front">活动组织好帮手<ThumbsUp /></div>
            </div>
          </div>
          <div class="back">
            <div class="login-form">
              <p>
                用户名
                <input v-model="formName" type="text" />
              </p>
              <p>
                密码
                <input v-model="formPassword" type="password" />
              </p>
              <p>{{ formMsg }}</p>
              <div class="form-bottom">
                <div class="button login" @click="login">登录</div>
                <div class="button register" @click="register">注册</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scrollsnap section2">
      <div></div>
      <div class="section3">
        <div class="start">
          <img src="../assets/icon_logo_ver2.svg" alt="" />
          <span>活动帮·Event Band</span>
        </div>
        <div class="end">
          <span class="button">联系我们</span>
          <span>|</span>
          <span class="button">隐私政策</span>
          <span>|</span>
          <span class="button">使用条款</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { ApiLogin, ApiRegister } from "../api";
import { ref } from "vue";
import { Clock2 } from "lucide-vue-next";
import { Clock3 } from "lucide-vue-next";
import { Clock4 } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import { Clock5 } from "lucide-vue-next";
import { NotebookPen } from "lucide-vue-next";
import { Cross } from "lucide-vue-next";
import { ThumbsUp } from "lucide-vue-next";
import { ArrowRight } from "lucide-vue-next";

const router = useRouter();
const store = useStore();
const formPassword = ref("");
const formName = ref("");
const formMsg = ref(" ");

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

const register = () => {
  if (formName.value && formPassword.value) {
    ApiRegister(formName.value, formPassword.value)
      .then((res) => {
        const { userNameExist, register_ok } = res.data;
        if (userNameExist) {
          formMsg.value = "用户名已存在";
        } else {
          login();
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
};
</script>

<style lang="less" scoped>
.home-main-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background: url("../assets/texture.png") center/100% #fff;
  overflow-y: scroll;
  position: relative;

  .scrollsnap {
    height: min(56vw, 758px);
    margin: 0 auto;
  }

  .section1 {
    max-width: 1366px;
    padding: 20px 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "a b" "c b";
    align-items: center;
    gap: 20px;
    justify-items: center;

    .section1-msg {
      grid-area: c;
      font-size: 36px;
      font-weight: 600;
      cursor: pointer;
      border: 3px dashed #333;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      position: relative;
    }

    .section1-left-down {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        height: 60px;
      }
    }

    .section1-msg::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgb(255, 181, 152);
      mix-blend-mode: multiply;
      top: 4px;
      border-radius: 5px;
      left: 4px;
      transition: 100ms;
    }

    .section1-msg:active::after {
      top: 0;
      left: 0;
    }

    .section1-logo {
      grid-area: a;
      max-width: 600px;
    }

    .section1-login-frame {
      grid-area: b;
      height: 100%;
      width: 100%;

      .flip-frame {
        height: 100%;
        width: 100%;
        // max-width: 500px;
        // max-height: 600px;
        border-radius: 10px;
        position: relative;
        transform-style: preserve-3d;
        transition: 300ms;

        .front {
          position: absolute;
          font-size: 24px;
          width: 100%;
          user-select: none;
          height: 100%;
          white-space: nowrap;
          backface-visibility: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          align-items: center;
          justify-items: center;
          gap: 10px;

          .calendar-mock {
            width: 100%;
            height: 90%;
            border-radius: 10px;
            display: grid;
            gap: 5px;
            overflow: hidden;
            grid-template-rows: auto 1fr;
            background-color: rgb(255, 226, 173);
            padding: 7px;

            .header {
              height: 30px;
              border-radius: 3px;
              width: 100%;
              background-color: rgb(255, 186, 57);
              display: flex;
              align-items: center;
              color: #ffd68b;
              justify-content: space-around;
            }

            .body {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-template-rows: repeat(5, 1fr);
              gap: 5px;

              .item {
                background-color: rgb(255, 201, 100);
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgb(255, 233, 193);
              }
            }
          }

          .schedule-mock {
            width: 100%;
            height: 80%;
            background-color: rgb(255, 166, 156);
            border-radius: 10px;
            padding: 7px;
            display: grid;
            grid-template-columns: auto 1fr;
            position: relative;
            gap: 5px;

            .header {
              width: 40px;
              height: 100%;
              border-radius: 3px;
              display: grid;
              gap: 5px;
              align-items: center;
              justify-items: center;
              grid-template-rows: repeat(4, 1fr);
              color: rgb(255, 197, 197);

              .item {
                width: 100%;
                border-radius: 3px;
                height: 100%;
                background-color: rgb(255, 122, 105);
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            .body {
              display: grid;
              gap: 5px;
              align-items: center;
              justify-items: center;
              grid-template-rows: repeat(4, 1fr);

              .item {
                width: 100%;
                height: 100%;
                background-color: rgb(255, 144, 130);
                border-radius: 3px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 0 10px;

                .divide1 {
                  width: 80%;
                  height: 5px;
                  border-radius: 10px;
                  background-color: rgb(255, 197, 197);
                }

                .divide2 {
                  width: 50%;
                  border-radius: 10px;
                  height: 5px;
                  background-color: rgb(255, 197, 197);
                }
              }
            }
          }

          .front-msg1 {
            display: flex;
            color: rgb(255, 186, 57);
            align-items: center;
            font-weight: 600;
            position: relative;

            .front-msg1-front {
              position: relative;
              z-index: 3;
              background-color: #fff;
              display: flex;
              gap: 3px;
              align-items: center;
            }
          }

          @media (min-width: 1366px) {
            .front-msg1-back {
              border-radius: 50%;
              position: absolute;
              width: 200px;
              height: 200px;
              border: 5px dotted rgb(255, 186, 57);
              left: -30%;
            }

            .front-msg2-back {
              content: "";
              border-radius: 50%;
              position: absolute;
              width: 200px;
              height: 200px;
              border: 5px dashed rgb(255, 122, 105);
              left: 30%;
              mix-blend-mode: exclusion;
            }
          }

          .front-msg2 {
            font-weight: 600;
            color: rgb(255, 122, 105);
            gap: 3px;
            position: relative;
            display: flex;
            align-items: center;

            .front-msg2-front {
              position: relative;
              gap: 3px;
              z-index: 3;
              display: flex;
              align-items: center;
              background-color: #fff;
            }
          }
        }

        .back {
          width: 100%;
          position: absolute;
          backface-visibility: hidden;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(180deg);
        }
      }

      .flip-active {
        transform: rotateY(180deg);
      }

      .login-form {
        height: 100%;
        border: 3px solid #333;
        width: 100%;
        max-width: 500px;
        max-height: 600px;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        font-size: 16px;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: relative;
        overflow: hidden;

        p {
          width: 80%;
          color: #666;

          input {
            border: 1.5px solid #666;
            margin-top: 3px;
          }
        }

        .form-bottom {
          display: flex;
          width: 100%;
          justify-content: space-around;

          .button {
            border: 2px solid #333;
            padding: 10px;
            font-size: 24px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
          }

          .login {
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }

  .section2 {
    background-color: #eee;
    border-radius: 60px 60px 0 0;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .section3 {
    border-radius: 60px 60px 0 0;
    background-color: #333;
    height: 120px;
    color: #fff;
    padding: 10px 60px;
    font-size: 18px;
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;

    .start {
      gap: 10px;
      display: flex;
      align-items: center;
    }

    .end {
      gap: 10px;
      display: flex;
      align-items: center;
    }

    img {
      height: 60px;
    }

    .button {
      cursor: pointer;
      padding: 5px;
      transition: 300ms;
    }

    .button:hover {
      box-shadow: 0 2px 0 0 #fff;
    }
  }
}
</style>
