<template>
  <ul class="toolbar">
    <li><button class="icon">加粗</button></li>
    <li><button class="icon">斜体</button></li>
    <li><button class="icon">链接</button></li>
    <li><button class="icon">引用</button></li>
    <li><button class="icon">代码</button></li>
    <li><button class="icon">图片</button></li>
    <li><button class="icon">列表</button></li>
    <li><button class="icon">标题</button></li>
    <li><button class="icon">分割</button></li>
    <li><button class="icon">表格</button></li>
  </ul>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .toolbar {
    width: 100%;
    background-color: #ccc;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .icon {
    float: left;
    height: 100%;
    display: block;
  }
</style>