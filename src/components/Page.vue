<template>
  <div class="canvas">
    <div v-for="element in elements" @click="selectedElement(element)">
      <PicElement :class="[element.playing?'animated ' + element.animatedName:'']"
                  :element="element"
                  :style="{width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
      >
        <img style="width:100%;height:100%;"
             src="http://mall.xykjg.com/mall/tmall_lzt/upload/page1/moonnstar.png">
      </PicElement>
    </div>

  </div>
</template>

<script>
  import PicElement from './PicElement'
  import 'animate.css'
  export default {
    props: {
      elements: {
        type: Array
      }
    },
    methods: {
      selectedElement (element) {
        this.$store.dispatch('setEditorElement', element)
      }
    },
    components: {
      PicElement
    }
  }

</script>

<style lang="less" scoped>
  .canvas {
    width: 320px;
    height: 504px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
  }
</style>
