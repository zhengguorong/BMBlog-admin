<template>
  <div class="header">
    <div class="container">
      <a href="">
        <div class="logo">
          <img src="../assets/images/logo.jpg" alt="">
        </div>
      </a>
      <div class="nav">
        <ul>
          <li class="active">
            <a href="">我的作品</a>
          </li>
          <li>
            <a href="">我的作品</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  background-color: #fff;
}
.header .container {
  margin:0 auto;
  width: 1024px;
  text-align: center;
}
.header .logo img{
  float: left;
  height: 60px;
}
.header .nav {
  float: left;
  padding-left: 50px;
}
.header .nav li {
  float: left;
  width: 110px;
  line-height: 52px;
  border-top: solid 5px rgba(0,0,0,0);
  text-align: center;
  list-style: none;
}
.header .nav li.active {
  border-top: solid 5px #0059f1;
}
.header .nav li a {
  height: 60px;
  font-size: 16px;
  color: #000;
}
.header .nav li.active a {
  color: #0059f1;
}
</style>