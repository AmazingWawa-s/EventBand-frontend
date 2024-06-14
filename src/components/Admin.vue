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
    <div class="window-frame">
      <div class="header">审核窗口</div>
      <div class="content">
        <div class="item-content title">
          <div>活动名称</div>
          <div>活动时间</div>
          <div>地点</div>
          <div>活动描述</div>
          <div>审核</div>
        </div>
        <div
          class="item-content"
          :style="{ 'background-color': index % 2 ? '#ccc' : '#eee' }"
          v-for="(item, index) in ExamineEvents"
          :key="item"
        >
          <div>{{ item.examine_event_name }}</div>
          <div>
            <span>
              {{
                item.examine_event_start_date +
                " " +
                item.examine_event_start_time / 60 +
                ":00"
              }}
            </span>
            <span>{{ " ~ " }}</span>
            <span>
              {{
                item.examine_event_end_date +
                " " +
                item.examine_event_end_time / 60 +
                ":00"
              }}
            </span>
          </div>
          <div>{{ item.location_firstname + item.location_name }}</div>
          <div>{{ item.examine_event_description }}</div>
          <div class="buttons">
            <div class="button" @click="handlePass(item.examine_event_id, index)">
              批准
            </div>
            <div class="button">否决</div>
          </div>
        </div>
      </div>
    </div>
    <div class="window-frame">
      <div class="header">全部活动</div>
      <div class="content">
        <div class="item-content title">
          <div>活动名称</div>
          <div>活动时间</div>
          <div>地点</div>
          <div>是否公开</div>
          <div>描述</div>
        </div>
        <div
          class="item-content"
          :style="{ 'background-color': index % 2 ? '#ccc' : '#eee' }"
          v-for="(item, index) in allEvents"
          :key="item"
        >
          <div>{{ item.event_name }}</div>
          <div>
            <span>
              {{ item.event_start_date + " " + item.event_start_time / 60 + ":00" }}
            </span>
            <span>
              {{ " ~ " }}
            </span>
            <span>
              {{ item.event_end_date + " " + item.event_end_time / 60 + ":00" }}
            </span>
          </div>
          <div>{{ item.location_firstname + " " + item.location_name }}</div>
          <div>{{ item.type ? "公开" : "私有" }}</div>
          <div>{{ item.event_description }}</div>
        </div>
      </div>
    </div>
    <div class="window-frame">
      <!-- <div class="header">地点管理</div> -->
    </div>
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
  grid-template-rows: 4fr 3fr 2fr;
  background-color: #eee;
  gap: 5px;

  .window-frame {
    display: grid;
    grid-template-rows: auto 1fr;
    padding: 5px;
    background-color: #fff;
    overflow: hidden;

    .header {
      font-weight: 600;
    }

    .content {
      font-size: 16px;
      overflow-y: scroll;
      padding: 5px;
      display: grid;
      gap: 3px;
      grid-template-columns: auto auto auto auto auto;
      grid-auto-rows: 30px;

      .item-content {
        display: grid;
        grid-column: 1/6;
        height: 30px;
        align-items: center;
        grid-template-columns: subgrid;

        .buttons {
          display: flex;
          gap: 5px;

          .button {
            border-radius: 5px;
            cursor: pointer;
            background-color: #fff;
            padding: 3px;
          }
        }
      }

      .title {
        font-weight: 600;
        height: 30px;
      }
    }
  }
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
import { ApiAllEvents, ApiExamine, ApiGetexamineevents, ApiSuperlogin } from "../api";

const superLogin = ref(false);
const userName = ref("");
const userPassword = ref("");
const superToken = ref("");
const allEvents = ref([]);
const ExamineEvents = ref([]);

const handlePass = (id, index) => {
  ApiExamine(superToken.value, id, true, "").then((res) => {
    console.log(res);
    const { examineOk } = res.data;
    if (examineOk) {
      ExamineEvents.value.splice(index, 1);
    }
  });
};

const login = () => {
  ApiSuperlogin(userName.value, userPassword.value).then((res) => {
    console.log(res);
    const { isSuperUser, userNameExist, userPasswordOk, userToken } = res.data;
    if (isSuperUser && userNameExist && userPasswordOk) {
      superLogin.value = true;
      superToken.value = userToken;
      ApiGetexamineevents(superToken.value).then((res) => {
        console.log(res);
        ExamineEvents.value = res.data.data;
      });
      ApiAllEvents(superToken.value).then((res) => {
        console.log(res);
        allEvents.value = res.data.data;
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
