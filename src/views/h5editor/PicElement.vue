<template>
  <div class='wrap'  @mousemove="mousemove" @mousedown="mousedown" @mouseup="mouseup">
    <slot></slot>
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
      // todo 怎么解决外层事件传递问题
      /**
      mounted () {
        document.querySelector('.canvas').onmousemove = (event) => {
          var e = event || window.event
          if (this.flag) {
            let nowX = e.clientX
            let nowY = e.clientY
            let disX = nowX - this.currentX
            let disY = nowY - this.currentY
            let top = parseInt(this.top) + disY
            let left = parseInt(this.left) + disX
            this.moveEle.style.top = top + 'px'
            this.moveEle.style.left = left + 'px'
          }
        }
      },
      **/
      methods: {
        mousemove (e) {
          if (this.flag) {
            let nowX = e.clientX
            let nowY = e.clientY
            let disX = nowX - this.currentX
            let disY = nowY - this.currentY
            this.moveEle.style.top = parseInt(this.top) + disY + 'px'
            this.moveEle.style.left = parseInt(this.left) + disX + 'px'
          }
        },
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
    cursor: move;
  }
  .wrap img {
    position: absolute;
  }
</style>
