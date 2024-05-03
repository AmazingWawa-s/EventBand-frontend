<template>
  <div class="button-main-container">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.button-main-container {
  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>

<script setup></script>
