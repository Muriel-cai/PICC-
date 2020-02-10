<template>
  <div class="setInput">
   <!-- <div class="{{setone}}">
     <span>{{text}}</span>
     <el-input v-model="inputValue" placeholder="请输入" v-if ="type === 'text'"></el-input>
   </div> -->

     <span class="lefttext">{{text}}</span>
     <el-input v-model="inputValue" placeholder="请输入"></el-input>
  </div>
</template>

<script>
export default {
  props:['text','inputValue'],
  name: 'setInput',
  data () {
    return {
      
    }
  },
  components:{
    // topNav:topNav
  },
  methods:{
    
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .setthree{
    width: 30%;
    height: 36px;
    margin: 5px;
    float: left;
    margin-right:3.2% ;
    
  }
  .settwo{
    width: 48%;
    height: 36px;
    margin: 5px;
    float: left;
    margin-right: 1.8%;
    .lefttext{
      width: 120px;
      height: 36px;
      display: inline-block;
    }
    .el-input{
      width: calc(100% - 125px);
    }
  }
  .setone{
    width: 100%;
    height: 36px;
    margin: 5px;
    float: left;
    margin-right: 1.8%;
    .lefttext{
      width: 120px;
      height: 36px;
      display: inline-block;
    }
    .el-input{
      width: calc(100% - 125px);
    }
  }
  .lefttext{
      width: 80px;
      height: 36px;
      display: inline-block;
    }
    .el-input{
      width: calc(100% - 90px);
    }
</style>
