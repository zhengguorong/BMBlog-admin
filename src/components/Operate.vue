<template>
  <div class="operate">
    <div class="border-line"></div>
    <div class="scale scale-nw"></div>
    <div class="scale scale-ne"></div>
    <div class="scale scale-sw"></div>
    <div class="scale scale-se"></div>
    <div class="scale scale-n"></div>
    <div class="scale scale-e"></div>
    <div class="scale scale-s"></div>
    <div class="scale scale-w"></div>
  </div>
  </div>
  </div>
</template>
</template>
</template>

<script>
</script>

<style lang="less" scoped>
  .operate {
    width: 100%;
    height: 100%;
  }
  
  .operate::before,
  {
    top: -2px;
    content: '';
    position: absolute;
    width: 100%;
    border-top: 1px dashed #000;
  }
  
  .operate::after {
    bottom: -2px;
    content: '';
    position: absolute;
    width: 100%;
    border-top: 1px dashed #000;
  }
  
  .border-line::before {
    left: -2px;
    content: '';
    position: absolute;
    height: 100%;
    border-left: 1px dashed #000;
  }
  
  .border-line::after {
    right: -2px;
    content: '';
    position: absolute;
    height: 100%;
    border-left: 1px dashed #000;
  }
  
  .scale {
    position: absolute;
    background: #fff;
    border: 1px solid #000;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
  }
  
  .scale-nw {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }
  
  .scale-ne {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }
  
  .scale-sw {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }
  
  .scale-se {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }
  
  .scale-n {
    top: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }
  
  .scale-e {
    right: -5px;
    top: 50%;
    margin-top: -5px;
    cursor: e-resize;
  }
  
  .scale-s {
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  
  .scale-w {
    left: -5px;
    top: 50%;
    margin-top: -5px;
    cursor: w-resize;
  }
</style>