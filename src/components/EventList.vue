<template>
  <div class="eventlist-main-container">
    <div class="eventlist-frame">
      <div class="eventlist-item-card">
        <img src="public/mock_images/ei1.jpg" alt="" />
        <div>大学生心理健康知识科普活动</div>
        <div></div>
      </div>
      <div class="eventlist-item-card">
        <img src="/mock_images/ei2.jpg" alt="" />
        <div>大学生心理健康知识科普活动</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.eventlist-main-container {
  position: relative;
  width: 100%;
  user-select: none;
  padding: 10px;
  height: 100%;

  .eventlist-frame {
    height: 100%;
    display: flex;
    padding: 10px;
    overflow-x: scroll;
    align-items: center;
    gap: 20px;
  }

  .eventlist-item-card {
    width: 200px;
    flex-shrink: 0;
    height: 324px;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    display: grid;
    grid-template-rows: 2fr 1fr 2fr;
    font-size: 16px;
    transition: 300ms;
    border: 1px solid #ddd;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .eventlist-item-card:hover {
    box-shadow: 2px 2px 5px rgb(207, 207, 207);
  }
}
</style>

<script setup></script>
