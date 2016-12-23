<template>
  <ul class="toolbar">
    <li><button class="reset-btn" @click="bold">加粗</li>
  </ul>
</template>

<script>
  export default {
    props: ['content'],
    methods: {
      selection () {
        if (typeof window.getSelection === 'function') {
          let selection = window.getSelection()
          if (selection.anchorNode === selection.focusNode) {
          }
        }
        return ''
      },
      bold () {
        console.log(this.content)
        console.log('该功能还在完善')
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
  }

  .reset-btn {
    float: left;
    line-height: 45px;
    font-size: 1.2em;
    color: #fff;
    padding: 0 10px;
    font-weight: bold;
  }
</style>