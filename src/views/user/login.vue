<template>
  <div class="container">
    <div class="login-main">
      <div class="login-title">
        欢迎来到蓝月亮博客管理后台
      </div>
      <div class="content">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRule">
          <el-form-item prop="loginId">
            <el-input type="text" v-model="loginForm.loginId" placeholder="帐号(邮箱或者手机号)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click.native.prevent="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          loginId: '',
          password: ''
        },
        loginRule: {
          loginId: [
            {required: true, message: '请输入邮箱或手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login (ev) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {

          } else {
            return false
          }
        }
      )
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    background-image: url('../../assets/login-bg.jpg');
    background-size: auto;
    min-height: calc(100vh);
  }

  .login-main {
    width: 450px;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    top: 100px;
  }

  .login-title {
    margin: 0;
    padding: 30px 20px 26px;
    text-align: center;
    font-size: 18px;
  }

  .content {
    padding: 0 25px 10px;
  }

  .form-item {
    line-height: 1.5;
    margin-bottom: 17px;
  }

  .login-btn {
    width: 100%;
  }
</style>
