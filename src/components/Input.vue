<template>
  <div class="input-main-container">
    <input class="input-frame" type="text" />
    <div class="input-msg">{{ formName }}</div>
  </div>
</template>

<style lang="less" scoped>
@theme-color: #c1272d;

.input-main-container {
  position: relative;
  font-size: 16px;

  .input-msg {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1em;
    pointer-events: none;
    padding: 11px;
    transition: 500ms;
    border-radius: 2px;
  }

  input {
    padding: 10px;
    border: 1px solid #333333;
    border-radius: 5px;
    outline: none;
    font-size: 1em;
    color: #333333;
  }

  input:focus ~ div {
    transform: translateX(10px) translateY(-50%);
    font-size: 0.65em;
    background-color: @theme-color;
    padding: 5px;
    color: #fff;
  }

  input:focus {
    border: 1px solid @theme-color;
  }
}
</style>

<script setup>
const props = defineProps(["formName"]);
</script>
