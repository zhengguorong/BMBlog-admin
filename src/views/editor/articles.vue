<template>
  <div class="article-list">
    <ul>
      <li v-for="(article, index) in articleList" :class="{active: article.active}" @click="selectedArticle(article)">
        <p>{{article.title}}</p>
        {{article.active}}
      </li>
    </ul>
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
    methods: {
      selectedArticle (article) {
        this.$store.commit('SET_EDITOR_ARTICLE', article)
      }
    }
  }
</script>
