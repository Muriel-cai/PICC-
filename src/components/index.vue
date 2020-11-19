<template>
  <div class="login">
     <div class="loginBox">
      <div class="loginPic">
        <img :src="loginPic">
      </div>
       <el-form ref="loginInfo" :model="loginInfo"  @input="handleInput" class="setInput" >
         <el-form-item  required prop="userName" status-icon style=" width: 318px;">
            <el-input v-model="loginInfo.userName" placeholder="请输入姓名"></el-input>
         </el-form-item>
         <el-form-item required prop="passWord" status-icon style=" width: 318px;">
            <el-input v-model="loginInfo.passWord" type="password" placeholder="请输入密码"></el-input>
         </el-form-item>
       </el-form>
       <div class ="loginbtn" @click="getLogin"> 登陆</div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginPic: require('../assets/icon_picclogo.png'),
      loginInfo: {
        userName: '',
        passWord: ''
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    getLogin () {
      let self = this
      let param = this.qs.stringify({
        u: self.loginInfo.userName,
        p: self.loginInfo.passWord
      })
      this.$store.dispatch('Login', param)
        .then(() => {
          console.log(localStorage.getItem('userId'))
          // this.$axios.post('')
          this.$axios.post('/api/showMenus',
            this.qs.stringify({userId: localStorage.getItem('userId')})).then(res => {
          // console.log(res.data.data.children[0].children[0].hrefTarget,"侧边导航indes");
          // self.allNav = res.data.data.children;
            if (res.data.data && res.data.data.children[0] && res.data.data.children[0].children[0]) {
              this.$router.push({ path: res.data.data.children[0].children[0].hrefTarget })
            } else {

            }
          }).catch(ret => {
            console.log(ret)
          })
        })
        .catch((error) => {
          console.log(error.response, 'kdkdkdkdh')
        })
    }
    //  toLogin(){
    //   let self = this;
    //  //其他的校验逻辑
    //   this.axios.post("/api/login",
    //     this.qs.stringify(
    //       {phone :self.phoneNum}
    //     )
    //    ).then(res => {
    //     console.log(res,"登陆",this.$store)
    //    //登录失败,先不讨论

    //      //设置Vuex登录标志为true，默认userLogin为false
    //      // this.$store.dispatch("isLogin", true);
    //      //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
    //      //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候      ，证明用户已经登录了。
    //      // localStorage.setItem("Flag", "isLogin");
    //      //iViewUi的友好提示
    //      // this.$Message.success(res.data.message);
    //      //登录成功后跳转到指定页面
    //      this.$router.push("/home");

    // });

    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "less">
.loginBox{
    width: 400px;
    height: 300px;
    position: fixed;
    top:50%;
    margin-top: -200px;
    left:50%;
    margin-left: -200px;
    background: #fff;
    box-shadow:0px 4px 10px rgba(0,0,0,0.1);
    padding:20px;
    .loginPic{
      width: 360px;
      height: 26px;
      text-align: center;
      padding:25px 20px;
      img{
        width: 318px;
        height: 26px;
      }
    }
    .setInput{
      padding:30px 20px 1px;
      width: 318px;
      height: auto;
    }
    .loginbtn{
      width: 318px;
      height: 42px;
      margin: 2px auto;
      border-radius: 5px;
      background: #F54F32;
      color: #fff;
      font-size: 16px;
      line-height: 42px;
      text-align: center;
      cursor: pointer;
    }
}

</style>
