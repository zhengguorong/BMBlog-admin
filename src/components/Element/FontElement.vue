<template>
  <div class='wrap' @mousedown="mousedown" @mouseup="mouseup">
    <span>{{element.text}}</span>
  </div>
</template>

<script>
    export default{
      props: {
        element: {
          type: Object,
          require: true
        }
      },
      data () {
        return {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
      },
      methods: {
        move () {
          document.querySelector('.canvas').onmousemove = (event) => {
            var e = event || window.event
            if (this.flag) {
              let nowX = e.clientX
              let nowY = e.clientY
              let disX = nowX - this.currentX
              let disY = nowY - this.currentY
              this.element.top = parseInt(this.top) + disY
              this.element.left = parseInt(this.left) + disX
            }
          }
        },
        mousedown (e) {
          this.flag = true
          this.currentX = e.clientX
          this.currentY = e.clientY
          this.top = this.element.top
          this.left = this.element.left
          this.move()
        },
        mouseup (e) {
          this.flag = false
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
