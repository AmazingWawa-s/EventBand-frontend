<template>
  <div class="main-container">
    <div class="login-container">
      <img src="../assets/icon.svg" alt="" />
      <div class="login-frame">
        <div class="login-form">
          <div>
            用户名
            <input type="text" />
          </div>
          <div>
            密码
            <input type="text" />
          </div>
        </div>
        <Button @click="login" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import { useStore } from "../store";
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();
const login = () => {
    store.isLogin=true;
    router.push({
        path:'/user'
    })
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  max-width: 1200px;
  height: 100%;

  .login-container {
    padding: 10px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 20px;

    .login-frame {
      height: 80%;
      width: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
      padding: 20px;
      max-height: 60vw;
      border-radius: 10px;
      border: 1px #000 solid;

      .login-form {
        display: flex;
        height:100%;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
      }
    }
  }
}
</style>
