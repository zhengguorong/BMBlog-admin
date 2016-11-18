<template>
  <div class='wrap' @mousedown="mousedown" @mouseup="mouseup">
      <div class="inner"></div>
  </div>
</template>

<script>
    export default{
      data () {
        return {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false,
          moveEle: ''
        }
      },
      mounted () {
        var self = this
        document.querySelector('.canvas').onmousemove = function (event) {
          var e = event || window.event
          if (self.flag) {
            let nowX = e.clientX
            let nowY = e.clientY
            let disX = nowX - self.currentX
            let disY = nowY - self.currentY
            let top = parseInt(self.top) + disY
            let left = parseInt(self.left) + disX
            if (top === 0) {
              console.log('gg')
              self.moveEle.style.top = '0px'
            } else {
              self.moveEle.style.top = top + 'px'
            }
            if (left === 0) {
              self.moveEle.style.left = '0px'
            } else {
              self.moveEle.style.left = left + 'px'
            }
          }
        }
      },
      methods: {
        mousedown (e) {
          this.flag = true
          this.currentX = e.clientX
          this.currentY = e.clientY
          this.moveEle = e.target
        },
        mouseup (e) {
          this.flag = false
          let target = e.target
          this.left = target.style.left
          this.top = target.style.top
        }
      }
    }
</script>

<style lang='less' scoped>
  .wrap {
    position: absolute;
  }
  .inner {
    position: absolute;
    width:50px;
    height:50px;
    background-color: red;
    cursor: move;
  }
</style>
