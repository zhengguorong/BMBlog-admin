<template>
  <label class="lable-pic">
    <input class="input-pic" type="file" @change="fileChange"/>
  </label>
</template>

<style scoped>
  .lable-pic {
    display: block;
    cursor: pointer;
    width: 3em;
    height: 3em;
    background: url("../assets/addpic_large.png") no-repeat;
    background-size: cover;
  }

  .input-pic {
    display: none;
  }
</style>

<script>
  export default{
    data () {
      return {
        picUrl: '',
        style: {
          width: 200,
          height: 200
        }
      }
    },
    methods: {
      convertImgToBase64 (img) {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
        var dataURL = canvas.toDataURL('image/' + ext)
        console.log(dataURL)
        return dataURL
      },
      fileChange (value) {
        var $vue = this
        if (!value) return
        let file = value.target.files[0]
        console.log(file)
        var reader = new window.FileReader()
        reader.onload = function (e) {
          var data = e.target.result
          var image = new window.Image()
          image.onload = function () {
            $vue.style.width = image.width
            $vue.style.height = image.height
          }
          image.src = data
          $vue.$emit('style', $vue.style)
          $vue.$emit('input', image.src)
        }
        reader.readAsDataURL(file)
      }
    }
  }
</script>
