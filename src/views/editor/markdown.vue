<template>
  <div>
    <div class="title">
      <input type="" v-model="editorArticle.title" name="">
      <el-button class="save" type="primary" @click="save">保存</el-button>
    </div>
    <div id="editor">
      <textarea :value="editorArticle.markdown" @input="update"></textarea>
      <div class="markdown-body" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  require('github-markdown-css')
  export default {
    props: {
      editorArticle: {
        type: Object,
        require
      }
    },
    computed: {
      compiledMarkdown () {
        return marked(this.editorArticle.markdown)
      }
    },
    methods: {
      update (e) {
        this.editorArticle.markdown = e.target.value
      },
      save () {
        this.$store.dispatch('addArticle')
      }
    }
  }

</script>

<style>
  .title {
    display:flex;
    border-bottom: 1px solid #ccc
  }
  .title input {
    height: 65px;
    padding-left: 20px;
    color: #242628;
    font-size: 20px;
    font-weight: 700;
    border: 0;
    outline: none;
    flex:3
  }
  #editor {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  textarea, #editor div {
     min-height: calc(100vh);
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

code {
  color: #f66;
}
</style>