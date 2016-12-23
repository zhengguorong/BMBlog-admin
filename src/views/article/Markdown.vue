<template>
  <div class="markdown">
    <template v-if="Object.keys(this.editorArticle).length !== 0">
      <Toolbar class="toolbar" :content="content" />
      <div class="editor clearfix">
        <textarea class="textarea custom-scrollbar" v-model="content"></textarea>
        <div class="markdown-body custom-scrollbar" v-html="markdownHtml"></div>
      </div>
    </template>
    <span v-else class="watermark">Bluemoon Frontend Group</span>
  </div>
</template>

<script>
  import Marked from 'marked'
  import Toolbar from './Toolbar'
  export default {
    data () {
      return {
        saveTimer: null
      }
    },
    computed: {
      editorArticle () {
        return this.$store.state.article.editorArticle
      },
      content: {
        get () {
          return this.editorArticle.markdown
        },
        set (value) {
          this.$store.commit('SET_EDITOR_CONTENT', value)
          this.$store.commit('SET_EDITOR_TITLE', value.match(/^.*/)[0])
          clearTimeout(this.saveTimer)
          this.saveTimer = setTimeout(() => {
            this.save()
          }, 1500)
        }
      },
      markdownHtml () {
        return Marked(this.content || '')
      }
    },
    methods: {
      save () {
        this.$store.dispatch('UPDATE_ARTICLE', { item: this.editorArticle }).catch(() => {
        }).then(() => {
          this.$message({
            message: '笔记已保存',
            type: 'success'
          })
        })
      }
    },
    components: { Toolbar }
  }
</script>

<style src="github-markdown-css/github-markdown.css" scoped></style>
<style lang="less" scoped>
  .markdown {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 45px;
  }

  .toolbar {
    width: 100%;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
  }

  .editor {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    .textarea, .markdown-body {
      float: left;
      width: 48.5%;
      height: 100%;
      padding: 15px;
      margin-left: 1%;
      background-color: #f5f5f5;
      font-size: 1.5em;
      color: #616161;
      box-shadow: 4px 5px 3px #aaa;
      overflow: auto;
    }
    .textarea {
      vertical-align: top;
      resize: none;
      border: none;
      outline: none;
    }
  }

  .watermark {
    display: block;
    height: 100%;
    text-align: center;
    color: #e4e4e4;
    font-size: 4em;
    text-shadow: 0 1px 0 white;
    overflow: hidden;
    white-space: nowrap;
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
</style>
