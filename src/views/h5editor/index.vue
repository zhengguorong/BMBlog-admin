<template>
  <div class="container">
    <div class="controll-panel" style="position:absolute">
      <el-button type="primary" @click="addPicElement">添加元素</el-button>
      <el-button type="primary" @click="addTextElement">添加文本</el-button>
      <el-button type="primary" @click="playAnimate">播放动画</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="addPage">添加页面</el-button>
      <el-button type="primary" @click="deploy">发布</el-button>
      <el-input placeholder="文本" v-model="element.text"></el-input>
      <div>
        透明度
        <el-slider v-model="element.opacity" show-input></el-slider>
      </div>
      <div>
        旋转
        <el-slider v-model="element.transform" show-input></el-slider>
      </div>
      <el-input placeholder="图片地址" v-model="element.imgSrc"></el-input>
      <PicPicker v-model="picBase64" @style="style"></PicPicker>
      <img :src="element.imgSrc" v-if="element.type=='pic'" @dblclick="addPicElement(element)" class="img" v-for="element in editorPage.elements">
      <el-input placeholder="动画名" v-model="element.animatedName"></el-input>
      <el-input placeholder="速度" v-model="element.duration"></el-input>
      <el-input placeholder="延迟" v-model="element.delay"></el-input>
      <el-input placeholder="X" v-model="element.left"></el-input>
      <el-input placeholder="Y" v-model="element.top"></el-input>
      <el-input placeholder="宽" v-model="element.width"></el-input>
      <el-input placeholder="高" v-model="element.height"></el-input>
      <svg @click="addIcon('action-redo')">
        <use xlink:href="/static/svg/icon.svg#action-redo"></use>
      </svg>
      <svg @click="addIcon('circle-fill')">
        <use xlink:href="/static/svg/icon.svg#circle-fill"></use>
      </svg>
    </div>

    <div style="float:right">页面索引：
      <ul>
        <li v-for="(page, index) in pages">
          <div v-if="page === editorPage">当前编辑页面</div>
          <div style="width:321px;height:504px;border:1px solid;transform: scale(0.16,0.1);position: relative;transform-origin: top left;"
            @click="setEditorPage(page)">
            <Page :elements="page.elements" type="see" />
            <div style="position: absolute;top: 0;bottom: 0;left: 0;right: 0"></div>
          </div>
          <el-button type="primary" @click="copyPage(page)">复制</el-button>
          <el-button type="primary" @click="delPage(page)">删除</el-button>
        </li>
      </ul>
    </div>
    <Page :elements="editorPage.elements" :editorElement="element" :selectedElement="selectedElement" :deleteElement="deleteElement"/>
  </div>
</template>

<script>
    import tools from '../../util/tools'
    import Page from '../../components/Page'
    import PicPicker from '../../components/PicturePicker'
    export default{
      data () {
        return {
          picBase64: ''
        }
      },
      watch: {
        picBase64: function () {
          this.$store.dispatch('savePic', {'imgData': this.picBase64, 'themeId': this.themeId})
        }
      },
      computed: {
        themeId () {
          return this.$store.state.editor.editorTheme._id
        },
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
        addPicElement (ele) {
          if (ele) {
            this.$store.dispatch('addElement', ele)
          } else {
            this.$store.dispatch('addElement', this.element)
          }
          this.element.type = 'pic'
        },
        addIcon (iconKey) {
          this.element.type = 'icon'
          this.element.iconKey = iconKey
          this.element.top = 0
          this.element.left = 0
          this.$store.dispatch('addElement', this.element)
        },
        addTextElement () {
          this.element.type = 'text'
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
        },
        copyPage (page) {
          this.$store.dispatch('copyPage', page)
        },
        delPage (page) {
          this.$store.dispatch('delPage', page)
        },
        selectedElement (element) {
          this.$store.dispatch('setEditorElement', element)
        },
        deleteElement () {
          this.$store.dispatch('deleteSelectedElement')
        },
        style (val) {
          this.element.width = val.width
          this.element.height = val.height
        }
      },
      components: {
        Page, PicPicker
      },
      mounted () {
        if (!this.pages) {
          this.$store.dispatch('getPageByThemeId', this.$route.query.itemId)
        }
      }
    }

</script>
<style lang="less" scoped>
  .container {
    ul li {
      list-style: none;
      height: 90px;
      width: 90px;
    }
    .img {
      width: 2.95rem;
      height: 2.95rem;
      padding-left: 10px;
    }
  }
</style>