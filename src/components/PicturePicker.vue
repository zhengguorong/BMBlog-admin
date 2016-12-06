<template>
  <div class="el-input">
    <label class="lable-pic dib el-input__inner" >
      <img class="img-pic"  v-show="picUrl"   :src="picUrl">
      <input class="input-pic"  type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange"/>
    </label>
    <img>
  </div>

</template>
<style scoped>
   .lable-pic{
     width: 2.95rem;
     height: 2.95rem;
     background: url("../assets/addpic_large.png") no-repeat;
     background-size: 100%;
     border: none;
   }
   .img-pic{
     width: 100%;
     height: 100%;
   }
  .input-pic{
    width: 100%;
    height: 100%;
    display: none;
  }
</style>
<script>
  import lrz from 'lrz'
  export default{
    data () {
      return {
        picUrl: ''
      }
    },
    methods: {
      fileChange (value) {
        if (!value) return
//        console.log(value.target.files[0])
        let file = value.target.files[0]
        lrz(file)
          . then(rst => {
            this.picUrl = rst.base64
            this.$emit('input', rst.base64)
          })
          .catch(err => {
            console.log(err)
          })
        var reader = new window.FileReader()
        reader.onload = function (e) {
          var data = e.target.result
          var image = new window.Image()
          image.onload = function () {
            console.log(image.width)
            console.log(image.height)
          }
          image.src = data
        }
        reader.readAsDataURL(file)
      }
    }
  }
</script>
