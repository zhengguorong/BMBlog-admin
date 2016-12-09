<template>
  <div :class="[type!=='see'?'canvas':'']">
    <div>
      <template v-for="element in elements">
        <div @click="selectedElement(element)">
          <PicElement :type="type" v-if="element.type==='pic'" :class="[element.playing?'animated ' + element.animatedName:'']" :element="element"
            :style="{transform:'rotate('+element.transform+'deg)',opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
            :showOperate="editorElement == element">
            <img style="width:100%;height:100%;" :src="element.imgSrc">
          </PicElement>
          <FontElement v-if="element.type==='text'" :element="element" :style="{transform:'rotate('+element.transform+'deg)',opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
            :class="[element.playing?'animated ' + element.animatedName:'']"></FontElement>
        </div>
        <!--<ShapesElement></ShapesElement>-->
      </template>
    </div>

  </div>
</template>

<script>
  import PicElement from './Element/PicElement'
  import FontElement from './Element/FontElement'
  import ShapesElement from './Element/ShapesElement'
  import 'animate.css'
  export default {
    props: {
      elements: {
        type: Array
      },
      editorElement: {
        type: Object
      },
      selectedElement: {
        type: Function
      },
      deleteElement: {
        type: Function
      },
      type: ''
    },
    mounted () {
      window.document.onkeydown = (e) => {
        var keyCode = e.keyCode
        if (keyCode === 8) {
          this.deleteElement()
        }
      }
    },
    destroyed () {
      window.document.onkeydown = (e) => {
        return false
      }
    },
    components: {
      PicElement, FontElement, ShapesElement
    }
  }

</script>

<style lang="less" scoped>
  div {
    -webkit-animation-fill-mode: none
  }
  
  .canvas {
    width: 320px;
    height: 504px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
  }
</style>