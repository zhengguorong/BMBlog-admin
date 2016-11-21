<template>
  <div class="canvas">
    <PicElement style="width:50px;height:50px;">
      <img swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay=".3s" class="ani" style="width:100%;height:100%;" src="http://mall.xykjg.com/mall/tmall_lzt/upload/page1/moonnstar.png">
    </PicElement>
  </div>
</template>

<script>
  import PicElement from './PicElement'
  export default {
    components: {
      PicElement
    }
  }
</script>

<style lang="less" scoped>
  .canvas {
    width:320px;
    height:504px;
    background-color:#fff;
    margin:0 auto;
    position: relative;
  }
</style>
