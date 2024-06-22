<template>
  <div class="search-main-container">
    <Eventlist />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ApiPublicEvents } from "../api";
import Eventlist from "../components/EventList.vue";


onMounted(() => {
  let token = localStorage.getItem("token");
  ApiPublicEvents(token)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
});
</script>

<style lang="less" scoped>
.search-main-container {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
