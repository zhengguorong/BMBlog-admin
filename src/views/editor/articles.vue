<template>
  <div class="article-list">
    <ul>
      <li v-for="article in articles">
        <p>{{article.title}}</p>
      </li>
    </ul>
  </div>
</template>
<style>

</style>
<script>
  export default {
    data () {
      return {
        articles: [{
          title: '今天天气好晴朗'
        }, {
          title: '处处好风光'
        }]
      }
    }
  }
</script>
