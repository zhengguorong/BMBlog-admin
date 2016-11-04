<template>
<div>
  <div class="title"><input type="" v-model="title" name=""></div>
  <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
  </div>
  </div>
</template>
<style>
  .title {
    width: 100%;
    border-bottom: 1px solid #ccc
  }
  .title input {
    width: 70%;
    height: 65px;
    padding-left: 20px;
    color: #242628;
    font-size: 20px;
    font-weight: 700;
    border: 0
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
<script>
  import marked from 'marked'
  export default {
    data () {
      return {
        input: '# hello',
        title: '无标题文章'
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods: {
      update: function (e) {
        this.input = e.target.value
      }
    }
  }
</script>
