<template>
  <div class="editor">
    <div class="control-view">
      <ul class="list custom-scrollbar">
        <li v-for="(page, index) in pages">
          <div class="view" :class="{ active: page === editorPage }" :style="{ width: 131 + 8 + 'px', height: (131 / canvasWidth) * canvasHeight + 34 + 'px' }" @click="setEditorPage(page)">
            <Page class="content" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px', transform: 'scale(' + 131 / canvasWidth +')' }" :elements="page.elements" type="see" />
            <div class="icons clearfix">
              <i class="icon el-icon-delete" @click="delPage(page)"></i>
              <i class="icon el-icon-document" @click="copyPage(page)"></i>
            </div>
          </div>
        </li>
      </ul>
      <button class="add el-icon-plus" @click="addPage"></button>
    </div>
    <Page class="canvas" :elements="editorPage.elements" :editorElement="element" :selectedElement="selectedElement" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }" />
    <div class="control-panel">
      <div class="funcs">
        <el-tooltip  effect="dark" content="清除元素" placement="left">
          <button class="func" @click="cleanEle">CELE</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="添加背景图" placement="left">
          <button class="func" @click="addBG">BG</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="清除背景图" placement="left">
          <button class="func" @click="cleanBG">CBG</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="添加文本" placement="left">
          <button class="func" @click="addTextElement">WORD</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="播放动画" placement="left">
          <button class="func" @click="playAnimate">PLAY</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="保存" placement="left">
          <button class="func" @click="save">SAVE</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="发布" placement="left">
          <button class="func" @click="deploy">SEND</button>
        </el-tooltip>
      </div>
      <div class="wrapper custom-scrollbar">
        <div class="block">
          <el-tag class="block-title">请输入文本</el-tag>
          <el-input placeholder="文本" v-model="element.text"></el-input>
        </div>
        <div class="clearfix adjust">字体大小<el-input class="adjust-control" placeholder="填写字体大小" v-model="element.fontSize"></el-input></div>
        <div class="clearfix adjust">颜色<el-input class="adjust-control" placeholder="填写颜色编号，省略#" v-model="element.color"></el-input></div>
        <div class="clearfix adjust">字体样式<el-input class="adjust-control" placeholder="填写字体样式" v-model="element.fontFamily"></el-input></div>
        <div class="block">
          <el-tag class="block-title">上传图片</el-tag>
          <div>
            <PicPicker v-model="picBase64" @style="style"></PicPicker>
          </div>
        </div>
        <div class="block">
          <el-tag class="block-title">图片地址</el-tag>
          <el-input placeholder="" v-model="element.imgSrc"></el-input>
        </div>
        <div class="block">
          <el-tag class="block-title">图片列表</el-tag>
          <div class="clearfix">
            <img class="preview" :src="http + element.filePath" @dblclick="addPicElement(element)" v-for="element in picList">
          </div>
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
          <div class="clearfix adjust">动画循环
            <el-select class="adjust-control"  v-model="element.loop" clearable>
              <el-option value="false" label="否"></el-option>
              <el-option value="true" label="是"></el-option>
            </el-select>
          </div>
          <div class="clearfix adjust">速度<el-input class="adjust-control" placeholder="填写秒数，省略单位s" v-model="element.duration"></el-input></div>
          <div class="clearfix adjust">延迟<el-input class="adjust-control" placeholder="填写秒数，省略单位s" v-model="element.delay"></el-input></div>
          <div class="clearfix adjust">X偏移<el-input-number class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.left"></el-input></div>
          <div class="clearfix adjust">Y偏移<el-input-number class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.top"></el-input></div>
          <div class="clearfix adjust">宽度<el-input-number class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.width"></el-input></div>
          <div class="clearfix adjust">高度<el-input-number class="adjust-control" placeholder="填写像素，省略单位px" v-model="element.height"></el-input></div>
          <div class="clearfix adjust">顺序<el-input class="adjust-control" placeholder="填写顺序（z-index）" v-model="element.zindex"></el-input></div>
        </div>
        <div class="block">
          <el-tag class="block-title">svg元素</el-tag>
          <div class="clearfix">
            <svg class="svg" @dblclick="addIcon('action-redo')">
              <use xlink:href="/static/svg/icon.svg#action-redo"></use>
            </svg>
            <svg class="svg" @dblclick="addIcon('circle-fill')"  fill="#000">
              <use xlink:href="/static/svg/icon.svg#circle-fill"  fill="#000"></use>
            </svg>
            <svg class="svg" @dblclick="addIcon('bmLogo')">
              <use xlink:href="/static/svg/icon.svg#bmLogo"  fill="#fff"></use>
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
  import * as appConst from '../../util/appConst'
  export default {
    data () {
      return {
        canvasWidth: '320',
        canvasHeight: '508',
        animateList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
        picBase64: '',
        http: appConst.APP_MALL_API_URL
      }
    },
    watch: {
      picBase64: function () {
        this.$store.dispatch('savePic', {'imgData': this.picBase64, 'themeId': this.themeId, 'width': this.element.width, 'height': this.element.height})
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
        return this.$store.state.editor.editorElement || {}
      },
      picList () {
        return this.$store.state.editor.picList
      }
    },
    methods: {
      getPicList (_id) {
        this.$store.dispatch('getPicListByThemeId', _id)
      },
      addPicElement (ele) {
        // if (ele) {
        let obj = {}
        obj.type = 'pic'
        obj.top = 0
        obj.left = 0
        obj.width = ele.width
        obj.height = ele.height
        obj.imgSrc = ele.filePath
        obj.loop = ele.loop
        this.$store.dispatch('addElement', obj)
        // } else {
        //   this.$store.dispatch('addElement', this.element)
        // }
        this.element.type = 'pic'
      },
      addIcon (iconKey) {
        let obj = {}
        obj.type = 'icon'
        obj.iconKey = iconKey
        obj.top = 0
        obj.left = 0
        obj.width = 100
        obj.height = 100
        this.$store.dispatch('addElement', obj)
      },
      addBG () {
        let obj = {}
        obj.type = 'bg'
        obj.top = 0
        obj.left = 0
        obj.width = this.element.width
        obj.height = this.element.height
        obj.imgSrc = this.element.imgSrc
        obj.zindex = 0
        this.$store.dispatch('addBGElement', obj)
      },
      cleanBG () {
        this.$store.dispatch('cleanBG')
      },
      cleanEle () {
        this.$store.dispatch('cleanEle', this.element)
      },
      addTextElement () {
        this.element.type = 'text'
        this.element.width = 100
        this.element.height = 100
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
      deleteListener (event) {
        if (event.keyCode === 8 && event.target.nodeName !== 'INPUT') {
          this.deleteElement()
        }
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
      Page, PicPicker, appConst
    },
    mounted () {
      let itemId = this.$route.query.itemId
      if (itemId) {
        if (!this.pages) {
          this.$store.dispatch('getPageByThemeId', this.$route.query.itemId)
        }
        this.getPicList(this.$route.query.itemId)
      } else {
        this.$store.dispatch('createTheme')
        this.$store.dispatch('addPage')
        this.$store.dispatch('cleanPicList')
      }
      document.addEventListener('keyup', this.deleteListener)
    },
    destroyed () {
      document.removeEventListener('keyup', this.deleteListener)
    }
  }

</script>

<style lang="less" scoped>
  .editor {
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
    box-sizing: content-box;
  }

  .control-panel {
    position: absolute;
    width: 300px;
    height: 100%;
    right: 0;
    top: 0;
    border-left: 1px solid #d6d6d6;
    background-color: #ececec;
    z-index: 10;
    .funcs {
      position: absolute;
      left: -50px;
      top: 0;
      width: 50px;
      .func {
        color: #b2bcba;
        background: #fff;
        cursor: pointer;
        margin-top: 20px;
        display: block;
        width: 50px;
        height: 50px;
        border: 1px solid #d6d6d6;
        border-radius: 3px 0px 0px 3px;
        user-select: none;
        &:hover {
          color: #000;
        }
      }
    }
    .wrapper {
      height: 100%;
      padding: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .block {
      margin-bottom: 30px;
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
      display: inline-block;
      vertical-align: top;
      margin: 0 1% 1%;
      width: 18%;
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
    z-index: 10;
    .list {
      background-color: #d6d6d6;
      position: absolute;
      top: 0;
      bottom: 50px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .view {
      position: relative;
      border-color: transparent;
      border-style: solid;
      border-width: 4px 4px 30px;
      margin: 10px;
      &.active {
        border-color: #18ccc0;
        .icons {
          display: block;
        }
      }
      .content {
        transform-origin: left top;
        background-color: #fff;
        overflow: hidden;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 10;
        }
      }
      .icons {
        position: absolute;
        bottom: -1.5em;
        right: 0.5em;
        display: none;
        width: 100%;
        color: #fff;
        .icon {
          float: right;
          margin-left: 1em;
          opacity: 0.5;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .add {
      border: none;
      position: absolute;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      width: 100%;
      left: 0;
      background-color: #373f42;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
