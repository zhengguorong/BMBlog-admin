<template>
	<div class="eidtor">
      <articles class="articles" :articleList="articleList"></articles>
      <markdown style="flex:4" class="markdown" :editorArticle="editorArticle"></markdown>
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
