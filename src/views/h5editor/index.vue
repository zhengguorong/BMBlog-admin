<template>
  <div class="container">
    <div class="controll-panel" style="position:absolute">
      <el-button type="primary" @click="addPicElement">添加元素</el-button>
      <el-button type="primary" @click="playAnimate">播放动画</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="addPage">添加页面</el-button>
      <el-button type="primary" @click="deploy">发布</el-button>
      <el-input placeholder="图片地址" v-model="element.imgSrc"></el-input>
      <el-input placeholder="动画名" v-model="element.animatedName"></el-input>
      <el-input placeholder="速度" v-model="element.duration"></el-input>
      <el-input placeholder="延迟" v-model="element.delay"></el-input>
      <el-input placeholder="X" v-model="element.left"></el-input>
      <el-input placeholder="Y" v-model="element.top"></el-input>
      <el-input placeholder="宽" v-model="element.width"></el-input>
      <el-input placeholder="高" v-model="element.height"></el-input>
    </div>
    <div style="float:right">页面索引：
      <ul v-for="(page, index) in pages">
        <div v-if="page === editorPage">当前编辑页面</div>
        <div style="width:50px;height:50px;border:1px solid;" @click="setEditorPage(page)">
          页面{{index}}
        </div>

      </ul>
    </div>
    <Page :elements="editorPage.elements"/>
  </div>
</template>

<script>
    import tools from '../../util/tools'
    import Page from './Page'
    export default{
      computed: {
        pages () {
          return this.$store.state.editor.editorTheme.pages
        },
        editorPage () {
          return this.$store.state.editor.editorPage
        },
        element () {
          return this.$store.state.editor.editorElement
        }
      },
      methods: {
        addPicElement () {
          this.$store.dispatch('addElement', this.element)
        },
        playAnimate () {
          this.$store.dispatch('playAnimate')
        },
        save () {
          this.$store.dispatch('saveTheme', tools.vue2json(this.$store.state.editor.editorTheme))
        },
        addPage () {
          this.$store.dispatch('addPage')
        },
        deploy () {
        },
        setEditorPage (page) {
          this.$store.dispatch('setEditorPage', page)
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
