<template>
  <div class="m-info-main-container">
    <div>简介</div>
    <div class="info-content">
      无锡市图书馆特别策划“书香四月
      向美而行”2024年读者嘉年华，线上线下集中开展40余场丰富多彩的阅读活动，展现图书馆的多元特色。期间，我馆特别推出“畅游文化
      悦读世界”云间慕课，精选“国图公开课”优质讲座资源，带领市民、读者赏读诗词、品味民俗、探寻历史……一起畅游文化，共享悦读。
    </div>
    <div>地点</div>
    <div>无锡市图书馆</div>
    <div>主办方</div>
    <div>无锡市图书馆</div>
  </div>
</template>

<style lang="less" scoped>
.m-info-main-container {
  position: relative;
  z-index: @z-index-modules;
  padding: @event-detail-padding;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
  gap: @event-detail-gap;

  .info-content {
    overflow-y: scroll;
    font-size: 18px;
  }
}
</style>
