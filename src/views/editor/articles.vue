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
      },
      addArticle: {
        type: Function,
        required: true
      },
      selectedArticle: {
        type: Function,
        required: true
      }
    },
    computed: {
      editorArticle () {
        return this.$store.state.article.editorArticle
      }
    }
  }
</script>
