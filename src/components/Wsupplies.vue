<template>
  <div class="w-supplies-main-container">
    <div class="header">
      <input v-model="supplyName" type="text" />
      <input v-model="amount" type="number" min="1" value="1" />
      <div class="button" @click="addSupply"><PackagePlus /></div>
    </div>
    <div class="body">
      <div class="header">
        <div>物资</div>
        <div class="amount">数量</div>
        <div class="state">状态</div>
        <div class="amount"></div>
      </div>
      <div class="scroll">
        <div class="supply-item" v-for="(item, index) in supplies.content" :key="item">
          <div>{{ item.resource_name }}</div>
          <div class="end">{{ item.resource_num }}</div>
          <div
            class="end"
            :style="{
              cursor: 'pointer',
            }"
            @click="changeState(item)"
          >
            <div class="state-ready" v-if="item.resource_condition == '就绪'">就绪</div>
            <div class="state-no" v-else>缺少</div>
          </div>
          <div class="delete" @click="deleteResource(item, index)">
            <Trash2 :size="18" color="#666" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.w-supplies-main-container {
  user-select: none;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;

  .header {
    height: 60px;
    display: grid;
    grid-template-columns: 3fr 1fr auto;
    gap: 5px;
    overflow: hidden;
    align-items: center;

    input {
      height: 50px;
      border: 2px dashed #333;
      border-radius: 5px;
      font-family: "Consolas";
    }

    .button {
      width: 50px;
      display: flex;
      cursor: pointer;
      align-items: center;
      position: relative;
      justify-content: center;
      border-radius: 5px;
      height: 50px;
      z-index: 2;
      border: 2px dashed #333;
    }

    .button::after {
      content: "";
      transition: 100ms;
      z-index: 1;
      border-radius: 5px;
      position: absolute;
      mix-blend-mode: saturation;
      background-color: rgb(255, 163, 130);
      width: 100%;
      height: 100%;
      box-shadow: 0 0 5px rgb(255, 163, 130);
      top: 2px;
      left: 2px;
    }

    .button:active::after {
      top: 0;
      left: 0;
    }
  }

  .body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 3fr 1fr 1fr auto;
    border-radius: 5px;
    gap: 5px;
    font-size: 18px;
    overflow: hidden;

    .header {
      height: 30px;
      border-bottom: 2px solid #ddd;
      grid-column: 1/5;
      font-weight: 600;
      display: grid;
      grid-template-columns: subgrid;
      padding-right: 5px;

      .amount {
        justify-self: self-end;
      }

      .state {
        justify-self: self-end;
        padding-right: 5px;
      }
    }

    .scroll {
      grid-column: 1/5;
      display: grid;
      grid-template-columns: subgrid;
      grid-auto-rows: 30px;
      gap: 10px;
      padding-right: 5px;
      height: 100%;
      overflow-y: scroll;

      .supply-item {
        height: 30px;
        grid-column: 1/5;
        display: grid;
        grid-template-columns: subgrid;
        align-items: center;
        white-space: nowrap;

        .end {
          justify-self: self-end;
        }

        .state-ready {
          font-size: 16px;
          color: #fff;
          border-radius: 5px;
          background-color: rgb(44, 189, 0);
          padding: 5px;
        }

        .state-no {
          font-size: 16px;
          color: #fff;
          border-radius: 5px;
          background-color: #ff4242;
          padding: 5px;
        }

        .delete {
          align-self: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script setup>
import { PackagePlus } from "lucide-vue-next";
import { inject, ref } from "vue";
import { Check } from "lucide-vue-next";
import { X } from "lucide-vue-next";
import { Trash2 } from "lucide-vue-next";
import { ApiAddResources, ApiDeleteResources, ApiUpdateResources } from "../api";

const supplies = inject("supplies");
const eventId = inject("eventId");
const supplyName = ref("");
const amount = ref(1);
const addSupply = () => {
  if (supplyName.value && amount.value > 0) {
    // supplies.unshift({
    //   resource_name: supplyName.value,
    //   resource_num: amount.value,
    //   resource_condition: "缺少",
    // });
    // supplyName.value = "";
    // amount.value = 1;
    const token = localStorage.getItem("token");

    ApiAddResources(token, eventId.value, supplyName.value, amount.value).then((res) => {
      console.log(res);
      const { createResourceOk, resourceId } = res.data;
      if (createResourceOk) {
        supplies.content.unshift({
          resource_name: supplyName.value,
          resource_num: amount.value,
          resource_condition: "缺少",
          resource_id: resourceId,
        });
        supplyName.value = "";
        amount.value = 1;
      }
    });
  }
};

const deleteResource = (item, index) => {
  const token = localStorage.getItem("token");
  ApiDeleteResources(token, eventId.value, item.resource_id).then((res) => {
    console.log(res);
    const { deleteResourceOk } = res.data;
    if (deleteResourceOk) {
      supplies.content.splice(index, 1);
    }
  });
};

const changeState = (item) => {
  const token = localStorage.getItem("token");
  const condition = item.resource_condition == "缺少" ? "就绪" : "缺少";
  ApiUpdateResources(token, eventId.value, item.resource_id, condition).then((res) => {
    console.log(res);
    const { updateResourceOk } = res.data;
    if (updateResourceOk) {
      item.resource_condition = condition;
    }
  });
};
</script>
