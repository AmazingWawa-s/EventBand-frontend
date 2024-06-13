<template>
  <div class="admin-login-form" v-if="!superLogin">
    <div class="admin-form">
      <div class="title">超级管理员登录</div>
      <div class="body">
        <div>用户名</div>
        <input v-model="userName" type="text" />
        <div>密码</div>
        <input v-model="userPassword" type="password" />
      </div>
      <div @click="login" class="button">登录</div>
    </div>
  </div>
  <div v-else class="admin-main-container">
    <div>审核窗口</div>
    <div>审核列表</div>
    <div>地点管理</div>
  </div>
</template>

<style lang="less" scoped>
.admin-main-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  max-width: 1366px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 4fr 2fr 3fr;
}

.admin-login-form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .admin-form {
    width: 400px;
    height: 500px;
    border: 2px solid #333;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .title {
      font-weight: 600;
      font-size: 24px;
    }

    .body {
      display: flex;
      gap: 5px;
      flex-direction: column;
    }

    .button {
      border: 2px solid #333;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { ApiGetexamineevents, ApiSuperlogin } from "../api";

const superLogin = ref(false);
const userName = ref("");
const userPassword = ref("");
const superToken = ref("");
const login = () => {
  ApiSuperlogin(userName.value, userPassword.value).then((res) => {
    console.log(res);
    const { isSuperUser, userNameExist, userPasswordOk, userToken } = res.data;
    if (isSuperUser && userNameExist && userPasswordOk) {
      superLogin.value = true;
      superToken.value = userToken;
      ApiGetexamineevents(superToken.value).then((res) => {
        console.log(res);
      });
    }
  });
};

// onMounted(() => {
//   let token = localStorage.getItem("token");
//   ApiGetexamineevents(token).then((res) => {
//     console.log(res);
//   });
// });
</script>
