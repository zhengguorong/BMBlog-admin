<template>
    <div class="container">
      <div class="canvas">
        <PicElement/>
      </div>
    </div>
</template>

<script>
    import PicElement from './PicElement'
    export default{
      components: {
        PicElement
      }
    }
</script>

<style scoped>
  .container {
    background-color:#ccc
  }
  .canvas {
    width:320px;
    height:504px;
    background-color:#fff;
    margin:0 auto;
  }
</style>
