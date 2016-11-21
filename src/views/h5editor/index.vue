<template>
    <div class="container">
        <Page/>
    </div>
</template>

<script>
    import Page from './Page'
    import Swiper from '../../libs/js/swiper.min.js'
    import SwiperAnimate from '../../libs/js/swiper.animate.min.js'
    export default{
      components: {
        Page, Swiper, SwiperAnimate
      }
    }
</script>
<style lang="less">
  @import '../../libs/css/animate.min.css';
  @import '../../libs/css/swiper.min.css';
  .container {
    background-color:#ccc
  }

</style>
