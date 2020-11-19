<template>
  <div class="leftNav" ref="leftNav">
    <div class="">
      <!-- {{allNav}} -->
    </div>
    <div class="scrollbar">
      <div class="one_nav" v-for="(item , index) in allNav" :key='index' >
        <h1 @click="showUl($event,index,item.checked)"> {{item.text}}</h1>
        <ul v-if="item.checked == false">
          <li v-for="(a,b) in item.children" :key="b" @click="showP(a.hrefTarget)" :class="{ active : a.hrefTarget === $route.path  }">
            <router-link :to="a.hrefTarget">{{a.text}}</router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'leftNav',
  props: ['showCon', 'allNav'],
  data () {
    return {
      clientHeight: ''

    }
  },
  created () {

    // console.log(this.$route.path,'{{{{{{{{{{{{{lkdjjjjjjjjjjjj',localStorage.getItem('userId'));
    // const userId = localStorage.getItem('userId');
    // this.$axios.post('/api/showMenus',this.qs.stringify({userId:userId})).then(res=>{
    //   // console.log(res.data.data.children[0],"侧边导航");
    //   self.allNav = res.data.data.children;

    // }).catch(ret=>{
    //   console.log(ret)
    // })
  },
  watch: {

    // 如果 `clientHeight` 发生改变，这个函数就会运行
    // clientHeight: function () {
    //   this.changeFixed(this.clientHeight)
    // }
  },
  mounted () {
    // 获取浏览器可视区域高度
    // this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    // //console.log(self.clientHeight);
    // window.onresize = function temp() {
    //   this.clientHeight = `${document.documentElement.clientHeight}`;
    // };
  },

  methods: {
    showP (option) {
      this.$emit('showCon', option)
    },
    showUl (e, index, twoShow) {
      console.log(e, index, twoShow, 'pppp')
      // this.twoShow = index;
      if (twoShow !== true) {
        console.log(this.allNav[index].checked)
        this.allNav[index].checked = true
      } else {
        console.log(2222)
        this.allNav[index].checked = false
      }
    }
    // changeFixed(clientHeight){                        //动态修改样式
    //   console.log(clientHeight,this.$refs.leftNav.offsetHeight);
    //  this.$refs.leftNav.offsetHeight < clientHeight ? this.$refs.leftNav.style.height = clientHeight - 60 +'px' : this.$refs.leftNav.style.height = 'auto';

    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.leftNav{
  position: fixed;
  width: 150px;
  height: auto;
  background: #364150;
  top: 0;
  bottom: 0;
  margin-top: 60px;
  transition: padding-top .3s;
  overflow: hidden;
  // .scrollbar{
  //   height: 100%;
  //   overflow-y: auto;
  //   overflow: scroll;
  //   // margin-top: 17px;
  //   // margin-right: 17px;
  // }
  .one_nav{
    position:relative;
    width: 100%;
    height: auto;
    h1{
      height: 60px;
      width: 100%;
      line-height: 60px;
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding-left:30px;
    }
    ul{
      position:relative;
      background:#5A6473;

      li{
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 50px;

        a{
          color: #fff;
        }
      }
      .active{
        background:#F54F32;
      }
    }
  }

}
</style>
