<template>
  <div class="container">
    <div class="control-view">
      <div class="clearfix">
        <p class="tab active">页面</p>
      </div>
      <ul class="list custom-scrollbar">
        <li v-for="(page, index) in pages">
          <div class="views" :class="{ active: page === editorPage }" :style="{ width: 131 + 8 + 'px', height: (131 / canvasWidth) * canvasHeight + 34 + 'px' }" @click="setEditorPage(page)">
            <Page class="view-content" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px', transform: 'scale(' + 131 / canvasWidth +')' }" :elements="page.elements" type="see" />
            <i class="el-icon-document" @click="copyPage(page)"></i>
            <i class="el-icon-delete" @click="delPage(page)"></i>
          </div>
        </li>
      </ul>
      <div class="add el-icon-plus" @click="addPage"></div>
    </div>
    <Page class="canvas" :elements="editorPage.elements" :editorElement="element" :selectedElement="selectedElement" :deleteElement="deleteElement" />
    <div class="control-panel">
      <div class="main-nav">
        <el-tooltip class="item main-btn" effect="dark" content="添加元素" placement="left">
          <span @click="addPicElement">元</span>
        </el-tooltip>
        <el-tooltip class="item main-btn" effect="dark" content="添加文本" placement="left">
          <span @click="addTextElement">文</span>
        </el-tooltip>
        <el-tooltip class="item main-btn" effect="dark" content="播放动画" placement="left">
          <span @click="playAnimate">播</span>
        </el-tooltip>
        <el-tooltip class="item main-btn" effect="dark" content="保存" placement="left">
          <span @click="save">保</span>
        </el-tooltip>
        <el-tooltip class="item main-btn" effect="dark" content="发布" placement="left">
          <span @click="deploy">发</span>
        </el-tooltip>
      </div>
      <div class="wrapper custom-scrollbar">
        <div class="block">
          <el-tag class="block-title">请输入文本</el-tag>
          <el-input placeholder="文本" v-model="element.text"></el-input>
        </div>
        <div class="block">
          <el-tag class="block-title">上传图片</el-tag>
          <PicPicker v-model="picBase64" @style="style"></PicPicker>
        </div>
        <div class="block">
          <el-tag class="block-title">图片地址</el-tag>
          <el-input placeholder="" v-model="element.imgSrc"></el-input>
        </div>
        <div class="block">
          <el-tag class="block-title">图片预览</el-tag>
          <img class="preview" :src="element.imgSrc" v-if="element.type=='pic'" @dblclick="addPicElement(element)" v-for="element in editorPage.elements">
        </div>
        <div class="block">
          <el-tag class="block-title">属性调节</el-tag>
          <div class="clearfix adjust">透明度<el-slider class="adjust-control" v-model="element.opacity"></el-slider></div>
          <div class="clearfix adjust">旋转<el-slider class="adjust-control" v-model="element.transform" :max="360"></el-slider></div>
          <div class="clearfix adjust">动画名
            <el-select class="adjust-control" placeholder="Animate.css" v-model="element.animatedName" clearable>
              <el-option
                v-for="item in animateList"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="clearfix adjust">速度<el-input class="adjust-control" placeholder="填写秒数，省略单位s" v-model="element.duration"></el-input></div>
          <div class="clearfix adjust">延迟<el-input class="adjust-control" placeholder="填写秒数，省略单位s" v-model="element.delay"></el-input></div>
          <div class="clearfix adjust">X偏移<el-input class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.left"></el-input></div>
          <div class="clearfix adjust">Y偏移<el-input class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.top"></el-input></div>
          <div class="clearfix adjust">宽度<el-input class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.width"></el-input></div>
          <div class="clearfix adjust">高度<el-input class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.height"></el-input></div>
        </div>
        <div class="block">
          <el-tag class="block-title">svg元素</el-tag>
          <div class="clearfix">
            <svg class="svg" @click="addIcon('action-redo')">
              <use xlink:href="/static/svg/icon.svg#action-redo"></use>
            </svg>
            <svg class="svg" @click="addIcon('circle-fill')">
              <use xlink:href="/static/svg/icon.svg#circle-fill"></use>
            </svg>
          </div>
        </div>
      </div>        
    </div>
  </div>
</template>

<script>
  import tools from '../../util/tools'
  import Page from '../../components/Page'
  import PicPicker from '../../components/PicturePicker'
  export default {
    data () {
      return {
        canvasWidth: '320',
        canvasHeight: '504',
        animateList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
        picBase64: ''
      }
    },
    watch: {
      picBase64: function () {
        this.$store.dispatch('savePic', { 'imgData': this.picBase64, 'themeId': this.themeId })
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
        this.$store.dispatch('saveTheme', tools.vue2json(this.$store.state.editor.editorTheme)).then(() => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
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
    background-color: #eaedef;
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .canvas {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-75%, -50%);
    border: 2px solid #373f42;
    box-shadow: 0px 2px 30px 5px rgba(0,0,0,0.2);
  }

  .control-panel {
    position: absolute;
    width: 300px;
    height: 100%;
    right: 0;
    top: 0;
    border-left: 1px solid #d6d6d6;
    background-color: #ececec;
    z-index: 100;
    .main-nav {
      position: absolute;
      left: -50px;
      top: 0;
      color: #b2bcba;
      line-height: 50px;
      text-align: center;
      .main-btn {
        cursor: pointer;
        margin-top: 20px;
        display: block;
        width: 50px;
        height: 50px;
        background-color: #fff;
        border: 1px solid #d6d6d6;
        border-radius: 3px 0px 0px 3px;
        &:hover {
          color: #000;
        }
      }
    }
    .wrapper {
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .block {
      margin-bottom: 30px;
      &:last-of-type {
        margin-top: 0;
      }
      &-title {
        margin-bottom: 5px;
      }
    }
    .adjust {
      line-height: 2em;
      &-control {
        float: right;
        width: 70%;
      }
    }
    .preview {
      max-width: 100%;
    }
    .svg {
      float: left;
      width: 50px;
      height: 50px;
      
    }
  }

  .control-view {
    position: absolute;
    left: 0;
    width: 160px;
    height: 100%;
    border-right: 1px solid #d6d6d6;
    z-index: 100;
    .tab {
      width: 50%;
      float: left;
      line-height: 40px;
      text-align: center;
      &.active {
        background-color: #d6d6d6;
      }
    }
    .list {
      background-color: #d6d6d6;
      position: absolute;
      top: 40px;
      bottom: 50px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .view-content {
      transform-origin: left top;
      background-color: #fff;
      overflow: hidden;
      position: relative;
    }
    .views {
      position: relative;
      border-color: transparent;
      border-style: solid;
      border-width: 4px 4px 30px;
      margin: 10px;
      &.active {
        border-color: #18ccc0;
        .el-icon-document, .el-icon-delete {
          display: block;
        }
      }
      .el-icon-document, .el-icon-delete {
        display: none;
        position: absolute;
        bottom: -1.5em;
        color: #fff;
        opacity: 0.5;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
      .el-icon-document {
        right: 2.5em;
      }
      .el-icon-delete {
        right: 0.5em;
      }
    }
    .add {
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 100%;
      left: 0;
      background-color: #373f42;
      cursor: pointer;
      text-align: center;
      line-height: 50px;
      color: #fff;
    }
  }
</style>