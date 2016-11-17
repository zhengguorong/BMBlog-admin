<template>
	<div class="eidtor">
      <div  class="articles">
        <articles :articleList="articleList"></articles>
      </div>
      <div class="markdown">
        <markdown  :editorArticle="editorArticle"></markdown>
      </div>
	</div>
</template>

<script>
  import articles from './articles'
  import markdown from './markdown'
  export default {
    computed: {
      articleList () {
        return this.$store.state.article.list
      },
      editorArticle () {
        return this.$store.state.article.editorArticle
      }
    },
    mounted () {
      this.$store.dispatch('getArticleList')
    },
    components: {
      articles, markdown
    }
  }
</script>
<style lang="less" scoped>
  .eidtor {
    display: flex;
  }
  .articles {
    flex:1;
  }
  .markdown {
    flex:4;
  }
</style>
