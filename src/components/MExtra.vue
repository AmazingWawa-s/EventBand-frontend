<template>
  <div class="m-extra-main-container">
    <div class="header">
      <div class="menu-frame"></div>
      <div class="menu-display">
        <div class="display-content">
          <img src="../assets/setting.svg" alt="" />
        </div>
      </div>
      <div class="menu-frame"></div>
    </div>
    <div class="body-frame">
      <div class="body-setting"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@m-extra-bg1: #333;
@m-extra-bg2: #fff;

.m-extra-main-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  padding: 10px;
  grid-template-rows: auto 1fr;
  //   border-radius: 15px 15px 45px 45px;
  background-color: @m-extra-bg1;

  .header {
    display: grid;
    grid-template-columns: 1fr 100px 1fr;
    height: 60px;
    width: 100%;

    .menu-display {
      background-color: @m-extra-bg2;
      height: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;

      .display-content {
        position: absolute;
        overflow: hidden;
        top: -5px;
        z-index: 3;
        color: @m-extra-bg2;
        width: 100%;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-areas: "a";
        height: 100%;

        img {
          height: 48px;
        }
      }
    }

    .menu-display::after {
      content: "";
      background-color: @m-extra-bg1;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 0 0 40px 40px;
    }

    .menu-frame {
      border-radius: 10px 10px 0 0;
      background-color: @m-extra-bg2;
      height: 100%;
      width: 100%;
    }
  }

  .body-frame {
    background-color: @m-extra-bg2;
    border-radius: 0 0 40px 40px;
  }
}
</style>
