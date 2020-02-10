<template>
  <div class="topNav">
    <div class="logoBox"><img :src="bgPic"></div>
   <h1> 人保小微 "幸福1+1" 管理系统</h1>
   <div class="rightT">
     <span> <i class="iconfont icon-my"></i> {{userName}}</span>
     <span @click="loginOut" class="loginOutBox"><i class="iconfont icon-tuichu"></i> 退出</span>
   </div>
  </div>
</template>

<script>
export default {
  props:['loginOutE'],
  name: 'topNav',
   props:['userName'],
  data () {
    return {
     // userName:"maind",
     bgPic:require("../../assets/img_picclogo.png")
    }
  },
  methods:{
    loginOut(){
      this.$emit('loginOutE')
      // let self = this;
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .topNav{
  position:fixed;
  z-index: 10;
  height: 60px;
  width: 100%;
  top:0;
  left:0;
  bottom:0;
  right:0;
  padding: 10px 20px;
  background:#2F3946;
  .logoBox{
    width: 80px;
    height: 40px;
    float: left;
    img{
      padding-top:5px;
    }
  }
  h1{
    width: 50%;
    float: left;
    line-height: 40px;
    color: #fff;
    font-weight: normal;
    font-size: 18px;
  }
  .rightT{
    width: 30%;
    float: right;
    text-align: right;
    line-height: 40px;
    span{
      display: inline-block;
      margin-right: 20px;
      color: #fff;
      font-size: 16px;
    }
    .loginOutBox{
      cursor: pointer;
    }
  }
 }
</style>
