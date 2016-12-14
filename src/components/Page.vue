<template>
  <div :class="[type!=='see'?'canvas':'']">
    <div v-for="element in elements" @click="selectedElement(element)" >
      <PicElement :type="type" v-if="element.type==='pic'"
                  :class="[element.playing?'animated ' + element.animatedName:'']"
                  :element="element"
                  :style="{transform:'rotate('+element.transform+'deg)',opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
                  :showOperate="editorElement == element"
      >
        <img style="width:100%;height:100%;"
             :src="element.imgSrc">
      </PicElement>
      <FontElement v-if="element.type==='text'"
                   :element="element"
                   :style="{transform:'rotate('+element.transform+'deg)',opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
                   :class="[element.playing?'animated ' + element.animatedName:'']"
      ></FontElement>
      <ShapesElement v-if="element.type==='icon'"
                     :iconKey="element.iconKey"
                     :element="element"
                     :style="{transform:'rotate('+element.transform+'deg)',opacity:element.opacity/100,width:element.width+'px',height:element.height+'px',top:element.top+'px',left:element.left + 'px','animation-duration':element.duration + 's','-webkit-animation-duration':element.duration + 's','animation-delay':element.delay + 's','-webkit-animation-delay':element.delay + 's'}"
                     :class="[element.playing?'animated ' + element.animatedName:'']"
      ></ShapesElement>
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
      type: ''
    },
    methods: {
      selectedElement (element) {
        this.$store.dispatch('setEditorElement', element)
      }
    },
    components: {
      PicElement, FontElement, ShapesElement
    }
  }

</script>

<style lang="less" scoped>
  div{
    -webkit-animation-fill-mode:none
  }
  .canvas {
    width: 320px;
    height: 504px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
  }
</style>
