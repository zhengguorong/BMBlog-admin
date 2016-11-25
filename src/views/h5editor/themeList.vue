<template>
  <div>
  <div>用户h5列表</div>
  <ul v-for="item in list">
    <li>{{item._id}} <el-button type="primary" @click="toEditor(item)">编辑</el-button></li>
  </ul>
    <el-button type="primary" @click="create">新建</el-button>
  </div>
</template>

<script>
  export default {
    computed: {
      list () {
        return this.$store.state.editor.themeList
      }
    },
    mounted () {
      this.$store.dispatch('getUserThemeList')
    },
    methods: {
      toEditor (item) {
        this.$store.dispatch('setEditorTheme', item)
        this.$store.dispatch('setEditorPage', item.pages[0])
        window.location.href = '#/h5editor'
      },
      create () {
        this.$store.dispatch('createTheme')
        this.$store.dispatch('addPage')
        window.location.href = '#/h5editor'
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
