<template>
  <div class="container">
    <div class="controll-panel" style="position:absolute">
      <el-button type="primary" @click="addElement">添加元素</el-button>
      <el-button type="primary" @click="playAnimate">播放动画</el-button>
      <el-input placeholder="动画名" v-model="element.animatedName"></el-input>
      <el-input placeholder="速度" v-model="element.duration"></el-input>
      <el-input placeholder="延迟" v-model="element.delay"></el-input>
      <el-input placeholder="X" v-model="element.left"></el-input>
      <el-input placeholder="Y" v-model="element.top"></el-input>
      <el-input placeholder="宽" v-model="element.width"></el-input>
      <el-input placeholder="高" v-model="element.height"></el-input>
    </div>
    <Page/>
  </div>
</template>

<script>
    import ElementModel from '../../model/Element'
    import Page from './Page'
    export default{
      computed: {
        element () {
          return this.$store.state.editor.curElement
        }
      },
      methods: {
        addElement () {
          this.$store.commit('ADD_PIC_ELEMENT', new ElementModel(this.element))
        },
        playAnimate () {
          this.$store.commit('PLAY_ANIMATE')
        }
      },
      components: {
        Page
      }
    }

</script>
<style lang="less">
  .container {
  }

</style>
