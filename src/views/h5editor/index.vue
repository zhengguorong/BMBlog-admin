<template>
  <div class="editor">
    <Overview />
    <Page class="canvas" :elements="editorPage.elements" :editorElement="element" :selectedElement="selectedElement" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }" />
    <div class="control-panel">
      <div class="funcs">
        <el-tooltip  effect="dark" content="新建文本" placement="left">
          <button class="func el-icon-edit" @click="togglePanel(1)" :class="{ active: panelState === 1 }"></button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="新建素材" placement="left">
          <button class="func el-icon-picture" @click="togglePanel(2)":class="{ active: panelState === 2 }"></button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="形状元素" placement="left">
          <button class="func el-icon-star-on" @click="togglePanel(3)":class="{ active: panelState === 3 }"></button>
        </el-tooltip>
        <!--<el-tooltip  effect="dark" content="添加背景图" placement="left">
          <button class="func" @click="addBG">BG</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="清除背景图" placement="left">
          <button class="func" @click="cleanBG">CBG</button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="添加文本" placement="left">
          <button class="func" @click="addTextElement">WORD</button>
        </el-tooltip>-->
        <el-tooltip  effect="dark" content="播放动画" placement="left">
          <button class="func el-icon-caret-right" @click="playAnimate"></button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="保存" placement="left">
          <button class="func el-icon-upload" @click="save"></button>
        </el-tooltip>
        <el-tooltip  effect="dark" content="发布" placement="left">
          <button class="func el-icon-message" @click="deploy"></button>
        </el-tooltip>
      </div>
      <div class="wrapper custom-scrollbar">
        <!-- 设置背景 0 -->
        <div class="panel panel-bg" v-show="panelState === 0">
          <div class="clearfix" v-show="panelTabState !== 1">
            <el-button class="btn" type="success" @click="panelTabState = 1">更换背景</el-button>
            <el-button class="btn" type="warning" @click="cleanBG">移除背景</el-button>
          </div>
          <div class="clearfix" v-show="panelTabState === 1">
            <PicPicker class="bgs" v-model="picBase64" @style="style"></PicPicker>
            <div class="bgs" :style="{ backgroundImage: 'url(' + http + element.filePath + ')' }" @click="addBG(element.filePath)" v-for="element in picList"></div>
          </div>
        </div>
        <!-- 添加文字 1 -->
        <div class="panel panel-text" v-show="panelState === 1">
          <div class="btn" @click="addTextElement">插入文本</div>
        </div>
        <!-- 添加元素 2 -->
        <div class="panel panel-element clearfix" v-show="panelState === 2">
          <PicPicker class="ele" v-model="picBase64" @style="style"></PicPicker>
          <div class="ele" :style="{ backgroundImage: 'url(' + http + element.filePath + ')' }" @click="addPicElement(element)" v-for="element in picList"></div>
        </div>
        <!-- 添加形状 3 -->
        <div class="panel panel-shape clearfix" v-show="panelState === 3">
          <svg class="shape" @click="addIcon('action-redo')">
            <use xlink:href="/static/svg/icon.svg#action-redo"></use>
          </svg>
          <svg class="shape" @click="addIcon('circle-fill')"  fill="#000">
            <use xlink:href="/static/svg/icon.svg#circle-fill"  fill="#000"></use>
          </svg>
          <svg class="shape" @click="addIcon('bmLogo')">
            <use xlink:href="/static/svg/icon.svg#bmLogo"  fill="#fff"></use>
          </svg>
        </div>
        <!-- 图层编辑面板 -->
        <div class="panel panel-edit">
          <div class="panel-tab clearfix">
            <div class="tab" :class="{ active: panelTabState === 0 }" @click="function () { panelTabState = 0 }">
              <span v-show="panelState === 11">文本</span>
              <span v-show="panelState === 12">元素</span>
            </div>
            <div class="tab" :class="{ active: panelTabState === 1 }" @click="function () { panelTabState = 1 }">动作</div>
          </div>
          <el-form label-width="5em">
            <div v-show="panelTabState === 0">
              <!-- 文字编辑界面特有控件 -->
              <template v-if="panelState === 11">
                <el-form-item label="文本内容">
                  <el-input v-model="element.text"></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-input type="color" v-model="element.color"></el-input>
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input-number v-model="element.fontSize"></el-input>
                </el-form-item>
                <el-form-item label="字体">
                  <el-input v-model="element.fontFamily"></el-input>
                </el-form-item>
              </template>
              <!-- 通用控件-->
              <el-form-item label="透明度">
                <el-slider v-model="element.opacity"></el-input>
              </el-form-item>
              <el-form-item label="旋转">
                <el-slider v-model="element.transform" :max="359"></el-input>
              </el-form-item>
              <el-form-item label="高">
                <el-input v-model="element.height"><template slot="append">px</template></el-input>
              </el-form-item>
              <el-form-item label="宽">
                <el-input v-model="element.width"><template slot="append">px</template></el-input>
              </el-form-item>
              <el-form-item label="X轴坐标">
                <el-input v-model="element.left"><template slot="append">px</template></el-input>
              </el-form-item>
              <el-form-item label="Y轴坐标">
                <el-input v-model="element.top"><template slot="append">px</template></el-input>
              </el-form-item>
            </div>
            <div v-show="panelTabState === 1">
              <el-form-item label="动画库">
                <el-select placeholder="daneden/animate.css" v-model="element.animatedName" clearable>
                  <el-option v-for="item in animateList" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否循环">
                <el-select v-model="element.loop" placeholder="默认为否">
                  <el-option value="false" label="否"></el-option>
                  <el-option value="true" label="是"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="速度">
                <el-slider v-model="element.duration" :step="0.1" :min="0" :max="10"></el-slider>
              </el-form-item>
              <el-form-item label="延迟">
                <el-slider v-model="element.delay" :step="0.1" :min="0" :max="10"></el-slider>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tools from '../../util/tools'
  import Overview from './overview'
  import Page from '../../components/Page'
  import PicPicker from '../../components/PicturePicker'
  import * as appConst from '../../util/appConst'
  export default {
    data () {
      return {
        panelState: 0,
        panelTabState: 0,
        canvasWidth: this.$store.state.editor.canvasWidth,
        canvasHeight: this.$store.state.editor.canvasHeight,
        animateList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
        picBase64: '',
        http: appConst.APP_MALL_API_URL
      }
    },
    watch: {
      picBase64: function () {
        this.$store.dispatch('savePic', {'imgData': this.picBase64, 'themeId': this.themeId, 'width': this.element.width, 'height': this.element.height})
      },
      element: function () {
        let ele = this.$store.state.editor.editorElement
        let type = ele ? ele.type : 'null'
        this.panelTabState = 0
        switch (type) {
          case 'text':
            this.panelState = 11
            break
          case 'icon':
          case 'pic':
            this.panelState = 12
            break
          default:
            this.panelState = 0
        }
      }
    },
    computed: {
      themeId () {
        return this.$store.state.editor.editorTheme._id
      },
      editorPage () {
        return this.$store.state.editor.editorPage
      },
      element () {
        let ele = this.$store.state.editor.editorElement
        return ele || {}
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
      addBG (src) {
        this.$store.dispatch('addBGElement', { type: 'bg', imgSrc: src })
      },
      cleanBG () {
        this.$store.dispatch('cleanBG')
      },
      cleanEle () {
        this.$store.dispatch('cleanEle', this.element)
      },
      addTextElement () {
        this.$store.dispatch('addElement', {
          type: 'text',
          width: 100,
          height: 100,
          text: '请输入文本'
        })
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
      deploy () {
        this.$store.dispatch('saveTheme', tools.vue2json(this.$store.state.editor.editorTheme))
        let _id = this.$store.state.editor.editorTheme._id
        window.open(appConst.APP_MALL_API_URL + '/perview/' + _id)
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
      style (obj) {
        this.element.width = obj.width
        this.element.height = obj.height
      },
      togglePanel (code) {
        this.panelState = code
      }
    },
    components: {
      Overview, Page, PicPicker, appConst
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
    user-select: none;
  }

  .overview {
    position: absolute;
    left: 0;
    width: 160px;
    height: 100%;
    z-index: 10;
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
        &:hover {
          color: #000;
        }
        &.active {
          border-right: 1px solid #ececec;
          background-color: #ececec;
          color: #000;
        }
      }
    }
    .wrapper {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
    .panel {
      position: absolute;
      left: 0;
      top: 0;
      min-height: 100%;
      width: 100%;
      padding: 10px;
      z-index: 2;
      background-color: #ececec;    
    }
    .panel-bg {
      .btn {
        float: left;
        width: 48%;
        margin-left: 1%;
        margin-right: 1%;
      }
      .bgs {
        float: left;
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin: 5px 5px;
        &:hover {
          border: 2px solid #18ccc0;
          cursor: pointer;
        }
      }
    }
    .panel-text {
      .btn {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 2px solid transparent;
        &:hover {
          cursor: pointer;
          border-color: #04b9c4;
        }
      }
    }
    .panel-element {
      .ele {
        float: left;
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin: 5px 5px;
        &:hover {
          border: 2px solid #18ccc0;
          cursor: pointer;
        }
      }
    }
    .panel-shape {
      .shape {
        float: left;
        width: 80px;
        height: 80px;
        margin: 5px;
      }
    }
    .panel-edit {
      z-index: 1;
    }
    .panel-tab {
      line-height: 40px;
      margin: -10px -10px 10px;
      .tab {
        float: left;
        width: 50%;
        text-align: center;
        cursor: pointer;
        background-color: #d6d6d6;
        &.active {
          background-color: transparent;
        }
      }
    }
  }
</style>
