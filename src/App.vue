<template>
  <div id="app">
    <div v-show="isLogin && hasQx">

      <topNav @loginOutE="loginOutE" :userName="userName"></topNav>
      <div class="leftcon">
        <leftNav @showCon="changeCon" :allNav="allNav"></leftNav>
      </div>
    </div>
   
   
    <div class="main" >
      
     <!--   <div class="leftNav">
      
      </div>  -->
      <div :class='[ "account-content" ,{all_p10 : isLogin  == true }]'  >
        <router-view v-if ="isRouterAlive"></router-view>
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import leftNav from './components/nav/leftNav'
  import topNav from './components/nav/topNav'

export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
       navs:[
        {
          link:"/showCon",
          text:"悦分享"
        },
        {
          link:"/welfare",
          text:"悦福利"
        }
      ],    
      isRouterAlive:true,
      showNav:false,
      allNav:[],
      hasQx:false,
      userId:'',
      userName:''
    }
  },
  components:{
    topNav:topNav,
    leftNav:leftNav
  },
  computed:{
    isLogin(val){
      this.userName = localStorage.getItem('name');
      this.userId = localStorage.getItem('userId',val)
      if(this.userId){        
        this.getLeftNav(this.userId);
      };      
      return this.$store.getters.isLoggedIn
      this.$router.push('/login');
    }
   
  },
  created(){
     let self = this; 
  },
  methods:{
    changeCon(option){
      var self = this;
      this.$router.push({path: option})
    },
    loginOutE(){
      this.$store.dispatch('LogOut').then(() => {
      //跳转到登录页面  
      this.$router.push('/login');
      })
    },
    getLeftNav(id){
      let self = this;
      this.$axios.post('/api/showMenus',this.qs.stringify({userId:id})).then(res=>{
        // console.log(res.data)
        if(res.data.data.children ){
          self.hasQx = true;
           self.allNav = res.data.data.children;
            // console.log(self.allNav ,"[[[[[")
         }else {
          console.log('没有数据');
          self.$message({
            type: 'success',
            message: '您还没有权限! 请联系管理员'
          });   
          self.hasQx = false;
          this.loginOutE()
         }
        

       
      }).catch(ret=>{
        console.log(ret)
      })
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      });
    }
  }
}
</script>

<style>
html,body{
   background:#F6F8F9;
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  margin:0;
  padding: 0;
}
  .el-table td, .el-table th{
    padding: 5px 0;
  }
  .el-dialog--center .el-dialog__body{
    padding:10px 20px 20px;
  }
  .el-dialog__header {
    padding: 8px 20px 8px;
    text-align: left;
    background: #EEEEEE;
  }
  .el-dialog__title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .el-dialog__headerbtn {
    top: 8px;
  }
  .el-input__inner{
    height: 34px;
    line-height: 34px;
  }
 .el-select {
    display: inline-block;
    position: relative;
    width: 100%!important;
}
  .btn{
    display: inline-block;
    padding:0 5px;
    font-size: 14px;
    line-height: 23px;
    cursor: pointer;
  }
  .red_btn{
    color: #E64C4C;
    cursor: pointer;
  }
  .blue_btn{
    color: #2580E8;
    cursor: pointer;
  }

  .three_box{
    width: 32%;
    float: left;
    margin-right: 1.3%;
  }
  .two_box{
    width: 48%;
    float: left;
    margin-right: 2%;
  }
  .clear{
    clear: both;
  }
  .m-t5:{
    margin-top: 20px;
  }
  .m-b5{
    margin-bottom: 20px;
  }
  .p_left2{
    padding-left: 20px;
  }
  .all_p10{
    padding:10px;
  }
  .xxx-box{
    position:relative;
    clear: both;
    width: 100%;
    min-height:34px;
    margin:10px 0;
    .xxx-box30{
      width: 130px;
      height: 34px;
      float: left;
      line-height: 34px;
     
    }
    .xxx-box70{
      width: calc(100% - 135px);
      float: right;
      
    }
    p{
    clear: both;
    padding:10px 0;
    color: #666;
    font-size: 12px;
    line-height: 18px;

  }
}
</style>
<style lang="less" scoped>
.leftcon{
  width: 180px;
  height: auto;
}
.main{ 
  position:relative;
  float: left;
  width: calc(100% - 160px);
  height:auto;
  margin-left: 160px;
  margin-top:70px;
  .leftNav{
    position: absolute;
    left:0;
    width: 160px;
    height: auto;
    border-right: 1px solid #ccc;
    ul{
      position:relative;
      li{
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 20px;
      }
    }
  }
  .account-content{  
    flex: 1;
    background: #fff;
  }
 } 
</style>

