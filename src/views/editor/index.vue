<template>
	<div class="eidtor">
      <div  class="articles">
        <articles :selectedArticle="selectedArticle" :addArticle="addArticle" :articleList="articleList"></articles>
      </div>
      <div class="markdown">
        <markdown :saveArticle="saveArticle" :editorArticle="editorArticle"></markdown>
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
    methods: {
      saveArticle () {
        this.$store.dispatch('saveArticle', this.editorArticle)
      },
      selectedArticle (article) {
        this.$store.commit('SET_EDITOR_ARTICLE', article)
      },
      addArticle (article) {
        this.$store.commit('ADD_ARTICLE')
      }
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
