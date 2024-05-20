<template>
  <div class="loading-main">
    <Loading />
  </div>
</template>

<script setup>
import Loading from "../components/svg/Loading.vue";
</script>

<style lang="less" scoped>
.loading-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
