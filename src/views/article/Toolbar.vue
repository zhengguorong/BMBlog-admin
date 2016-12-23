<template>
  <ul class="toolbar">
    <li><button class="reset-btn" @click="bold">加粗</li>
    <li><button class="reset-btn" @click="italic">斜体</li>
    <li><button class="reset-btn" @click="link">链接</li>
    <li><button class="reset-btn" @click="quote">引用</li>
    <li><button class="reset-btn" @click="code">代码</li>
    <li><button class="reset-btn" @click="image">图片</li>
    <li><button class="reset-btn" @click="list">列表</li>
    <li><button class="reset-btn" @click="header">标题</li>
    <li><button class="reset-btn" @click="line">分割</li>
    <li><button class="reset-btn" @click="table">表格</li>
  </ul>
</template>

<script>
  export default {
    props: ['params'],
    computed: {
      content () {
        return this.params.content
      },
      selectionStart () {
        return this.params.selectionStart
      },
      selectionEnd () {
        return this.params.selectionEnd
      },
      hasSelected () {
        return this.selectionStart && this.selectionEnd
      }
    },
    methods: {
      strJoin (partA, partB, partC) {
        if (this.hasSelected) {
          let str1 = this.content.substring(0, this.selectionStart)
          let str2 = partA + (this.content.substring(this.selectionStart, this.selectionEnd) || partB) + partC
          let str3 = this.content.substring(this.selectionEnd)
          this.$emit('editContent', str1 + str2 + str3)
        } else {
          this.$emit('editContent', this.content + partA + partB + partC)
        }
      },
      bold () {
        this.strJoin('**', 'Bold', '**')
      },
      italic () {
        this.strJoin('*', 'Italic', '*')
      },
      link () {
        this.strJoin('[', 'Link', '](http://www.example.com)')
      },
      quote () {
        this.strJoin('\n\n> ', 'Quote', '\n\n')
      },
      code () {
        this.strJoin('`', 'Code', '`')
      },
      image () {
        this.strJoin('![', 'Image', '](http://www.example.com)')
      },
      list () {
        this.strJoin('\n\n- ', 'List', '\n\n')
      },
      header () {
        this.strJoin('\n\n# ', 'Header', '\n\n')
      },
      line () {
        this.strJoin('\n\n---', '', '')
      },
      table () {
        this.strJoin('\n\n| title | title | title |\n|  ---  |  ---  |  ---  |\n| item  | item  | item  |\n\n', '', '')
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    width: 100%;
    height: 45px;
    background-color: #009688;
    box-shadow: 4px 3px 3px #aaa;
    overflow: hidden;
  }

  .reset-btn {
    float: left;
    line-height: 45px;
    font-size: 1.2em;
    color: #fff;
    padding: 0 10px;
    font-weight: bold;
  }

  .reset-btn:active {
    background-color: #00796B;
  }
</style>