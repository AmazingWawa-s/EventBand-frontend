<template>
  <div class="search-main-container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { ApiPublicEvents } from "../api";

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
