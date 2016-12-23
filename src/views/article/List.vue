<template>
  <div class="list">
    <ul class="documents custom-scrollbar">
      <li v-for="item in articleList" :key="item._id">
        <div class="documents-item" :class="{ active: item._id === editingId }" @click="selectedArticle(item._id)">
          <p>{{ item.title }}</p>
          <button class="close-btn reset-btn" @click.stop="clean(item._id)"><i class="el-icon-close"></i></button>
        </div>
      </li>
    </ul>
    <button class="add reset-btn" @click="addArticle"><i class="el-icon-plus"></i></button>
  </div>
</template>
<script>
  export default {
    computed: {
      articleList () {
        return this.$store.state.article.list
      },
      editorArticle () {
        return this.$store.state.article.editorArticle
      },
      editingId () {
        return this.editorArticle._id
      }
    },
    methods: {
      addArticle () {
        this.$store.dispatch('ADD_ARTICLE').then(() => {
        })
      },
      selectedArticle (_id) {
        this.$store.dispatch('SET_EDITOR_ARTICLE', { _id })
      },
      clean (_id) {
        this.$store.dispatch('DELETE_ARTICLE', { _id })
      }
    }
  }
</script>
<style scoped lang="less">
  .list {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    box-shadow: 4px 5px 3px #aaa;
    height: 100%;
  }
  .documents {
    overflow: auto;
    border-bottom: 1px solid #bdbdbd;
    cursor: default; 
    &-item {
      color: #9E9E9E;
      transition: all ease .3s;
      padding: 15px;
      position: relative;
      .close-btn {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        font-size: 0.3em;
        padding: 5px;
        &:hover {
          background-color: #EF5350;
          color: #fff;
        }
        &:active {
          background-color: #F44336;
          color: #fff;
        }
      }
      &:hover {
        background-color: #eee;
        .close-btn {
          display: block;
        }
      }
      &.active {
        color: #616161;
        border-left: 6px solid #009688;
      }
    }
  }
  
  .add {
    display: block;
    height: 55px;
    line-height: 55px;
    text-align: center;
    flex-shrink: 0;
    color: #616161;
    transition: all ease .3s;
    &:hover {
      background-color: #e0e0e0;
    }
    &:active {
      background-color: #bdbdbd;
    }
  }
</style>