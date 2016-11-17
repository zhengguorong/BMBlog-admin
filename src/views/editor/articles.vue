<template>
  <div class="article-list">
    <ul>
      <li v-for="(article, index) in articleList" :class="{active: article == editorArticle}" @click="selectedArticle(article)">
        <p>{{article.title}}</p>
        {{article.active}}
      </li>
    </ul>
    <el-button class="add" type="primary" @click="addArticle">添加</el-button>
  </div>
</template>
<style scoped>
  .article-list {
    border-right:1px solid #d9d9d9;
  }
  ul {
    padding:0
  }
  li {
    list-style-type: none;
    height:90px;
    cursor: pointer;
  }
  li.active {
    background-color: #ccc;
  }
</style>
<script>
  export default {
    props: {
      articleList: {
        type: Array,
        required: true
      }
    },
    computed: {
      editorArticle () {
        return this.$store.state.article.editorArticle
      }
    },
    methods: {
      selectedArticle (article) {
        this.$store.commit('SET_EDITOR_ARTICLE', article)
      },
      addArticle (article) {
        this.$store.commit('ADD_ARTICLE')
      }
    }
  }
</script>
