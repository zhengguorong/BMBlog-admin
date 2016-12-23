<template>
  <div class="eidtor">
    <List class="list" />
    <div class="markdown-wrapper">
      <Markdown class="markdown" />
    </div>
  </div>
</template>

<script>
  import List from './List'
  import Markdown from './Markdown'
  export default {
    created () {
      this.$store.dispatch('GET_ARTICLE_LIST')
    },
    components: {
      List, Markdown
    }
  }
</script>
<style scoped>
  .eidtor {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    overflow: hidden;
    background-color: #e0e0e0;
  }
  
  .list {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 220px;
    overflow: auto;
    z-index: 2;
  }
  
  .markdown-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-left: 220px;
  }

  .markdown {
    width: 100%;
    height: 100%;
  }
</style>