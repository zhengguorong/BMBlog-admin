<template>
  <div class="markdown">
    <template v-if="Object.keys(this.editorArticle).length !== 0">
      <div class="title-bar">
        <input class="input" type="text" v-model="title"><el-button class="btn" type="primary" @click="save">保存</el-button>
      </div>
      <div class="editor clearfix">
        <Toolbar class="toolbar" />
        <textarea class="textarea custom-scrollbar" v-model="content"></textarea>
        <div class="markdown-body custom-scrollbar" v-html="markdownHtml"></div>
      </div>
    </template>
    <span v-else class="watermark">Bluemoon</span>
  </div>
</template>

<script>
  import Marked from 'marked'
  import Toolbar from './Toolbar'
  export default {
    computed: {
      editorArticle () {
        return this.$store.state.article.editorArticle
      },
      title: {
        get () {
          return this.editorArticle.title
        },
        set (value) {
          this.$store.commit('SET_EDITOR_TITLE', value)
        }
      },
      content: {
        get () {
          return this.editorArticle.markdown
        },
        set (value) {
          this.$store.commit('SET_EDITOR_CONTENT', value)
        }
      },
      markdownHtml () {
        return Marked(this.content || '')
      }
    },
    methods: {
      save () {
        this.$store.dispatch('UPDATE_ARTICLE', { item: this.editorArticle })
      }
    },
    components: { Toolbar }
  }
</script>

<style src="github-markdown-css/github-markdown.css" scoped></style>
<style lang="scss" scoped>
  .markdown {
    position: relative;
  }

  .content {
    z-index: 2;
    background-color: #fff;
    height: 100%;
    width: 100%;
  }

  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #666;
    text-shadow: 0 1px 0 #ccc;
    font-size: 4em;
    transform: translate(-50%);
  }

  .title-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  
  .title-bar .input {
    border: none;
    outline: none;
    display: inline-block;
    width: 90%;
    padding: 0 10px;
  }

  .title-bar .btn {
    width: 10%;
    height: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .editor {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    .toolbar {
      position: absolute;
      left: 0;
      top: 60px;
      height: 40px;
      overflow: hidden;
      width: 100%;
    }
    .textarea {
      float: left;
      width: 50%;
      height: 100%;
      border: none;
      outline: none;
      border-right: 1px solid #ccc;
      resize: none;
    }
    .markdown-body {
      float: left;
      width: 50%;
      height: 100%;
      overflow: auto;
    }
  }  
</style>
