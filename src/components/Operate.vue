<template>
  <div class="operate">
    <div class="border-line"></div>
    <div class="scale scale-nw" data-direction="nw"></div>
    <div class="scale scale-ne" data-direction="ne"></div>
    <div class="scale scale-sw" data-direction="sw"></div>
    <div class="scale scale-se" data-direction="se"></div>
    <div class="scale scale-n" data-direction="n"></div>
    <div class="scale scale-e" data-direction="e"></div>
    <div class="scale scale-s" data-direction="s"></div>
    <div class="scale scale-w" data-direction="w"></div>
  </div>
  </div>
  </div>
</template>
</template>
</template>

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
    width: 7px;
    height: 7px;
    z-index: 1;
  }
  
  .scale-nw {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
    border-radius: 50%;
  }
  
  .scale-ne {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
    border-radius: 50%;
  }
  
  .scale-sw {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
    border-radius: 50%;
  }
  
  .scale-se {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
    border-radius: 50%;
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