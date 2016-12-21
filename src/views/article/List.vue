<template>
  <div class="container">
    <ul class="list custom-scrollbar">
      <li v-for="item in articleList">
        <div class="list-item" :class="{ active: item._id === editingId }" @click="selectedArticle(item._id)">
          <p>{{ item.title }}</p>
          <i class="el-icon-plus" @click.stop="copy(item._id)"></i>
          <i class="el-icon-delete" @click.stop="clean(item._id)"></i>
        </div>
      </li>
    </ul>
    <el-button class="btn" type="primary" @click="addArticle">添加</el-button>
  </div>
</template>
<script>
  export default {
    computed: {
      articleList () {
        return this.$store.state.article.list
      },
      editingId () {
        return this.$store.state.article.editorArticle._id
      }
    },
    methods: {
      addArticle () {
        this.$store.dispatch('ADD_ARTICLE')
      },
      selectedArticle (id) {
        this.$store.dispatch('SET_EDITOR_ARTICLE', { id })
      },
      copy (id) {
        this.$store.dispatch('ADD_COPY_ARTICLE', { id })
      },
      clean (id) {
        this.$store.dispatch('DELETE_ARTICLE', { id })
      }
    }
  }
</script>
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
  .list {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow-y: auto;
    $icons: ".el-icon-plus, .el-icon-delete";
    #{$icons} {
      cursor: pointer;
      position: absolute;
      right: 10px;
      display: none;
    }
    .el-icon-delete {
      top: 55%;
    }
    .el-icon-plus {
      bottom: 55%;
    }
    &-item {
      border-bottom: 1px solid #ccc;
      transition: box-shadow 0.3s;
      position: relative;
      min-height: 100px;
      padding: 10px 30px 10px 10px;
      &:hover {
        box-shadow: 0 1px 7px rgba(0,0,0,0.3);
        #{$icons} {
          display: block;
          color: #ccc;
        }
      }
      &.active {
        color: #fff;
        background-color: #d1c091;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
        #{$icons} {
          display: block;
          color: inherit;
        }
      }
    }
  }
  
  .btn {
    width: 100%;
    flex-shrink: 0;
  }
</style>