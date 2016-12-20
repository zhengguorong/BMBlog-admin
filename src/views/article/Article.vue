<template>
  <div class="eidtor">
    <List class="list" />
    <Markdown class="markdown" />
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
<style lang="scss" scoped>
  .eidtor {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  
  .list {
    float: left;
    width: 20%;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #d9d9d9;
  }
  
  .markdown {
    float: left;
    width: 80%;
    height: 100%;
    overflow: auto;
  }
</style>