<template>
  <div class="welfare">
   <div class="tabBox">
     <div class="tabLi"  v-for="(item, index) in tabs" @click ="showTabCon(item.code,1)">
       <span :class="{tabactive : index+1 == step}">{{item.text}}</span>
       <!-- <router-link :class="{tabactive : index == step}" :to="item.link">{{item.text}}</router-link> -->
     </div>   
   </div>
   <div class="main" v-if=" !isShop">
    <div class="topcon">
      <setBtn :btnText="btnText" @btnEvent ="btnEvent"></setBtn>
      <span @click="setCode">设置使用码</span>
      <span @click="clerrAll">清空数据</span>

    </div>
    
     <el-table
       :data="welData"
       style="width: 100%"
       border >
       <el-table-column
         type="index"
         width="60">
       </el-table-column>
       <el-table-column
         prop="userName"
         label="员工姓名"
         width="180">
       </el-table-column>
       <el-table-column
         prop="userDept"
         label="部门">
       </el-table-column>
       <el-table-column
         prop="hrCode"
         label="hr代码">
       </el-table-column>
       <el-table-column
         prop="birthdayNoodlesTime"
         label="参与时间"
         width="180"
         v-if="step == 1">
       </el-table-column>
       <el-table-column
         prop="physicalTime"
         label="参与时间"
         width="180"
         v-if="step == 2"
         >
       </el-table-column>
     </el-table>
     <!-- <router-view></router-view> -->
      <!--分页-->
    <div class="block">
     <!--  <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="totalNum"
        >
      </el-pagination>
    </div>
   </div>
   <div class="shop" v-if="isShop">
     <p class="shopP"> 当前商场地址 ：<a :href="shopUrl" target="_blank">{{shopUrl}}</a> </p>
     <p class="shopP"><setBtn :btnText="urlText" @btnEvent ="setUrl"></setBtn> </p> 
   </div>

   <!--设置时间的弹框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="issetCode"
       width="380px"
      :before-close="handleClose"
      >
      <div v-if= "isShop != true">     
         <span v-if = "step == 1">当前生日面使用码是 ：{{birCode}}</span>
         <span v-if = "step == 2">当前理疗使用码是 ：{{phyCode}}</span>
         <div class="xxx-box"> 
           <div class="xxx-box30">修改使用码 ： </div>
           <div class="xxx-box70">
             <el-input v-model="newcode" placeholder="请填写"></el-input>
             
           </div> 
           <p style="color:#E64C4C;">注意事项：生日面使用码和理疗使用码不能重复，该使用码作为扫描时验证密码使用，请勿泄露，避免被误用</p>                                               
         </div>
      </div>
      <div v-if ="isShop">
        <span>当前外链是 ： {{shopUrl}}</span>
         <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 90px;">修改外链为：</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="newshopUrl" placeholder="请填写 务必带上"></el-input>            
           </div> 
           <p style="color:#E64C4C;">注意事项：外链请务必加上前缀 https:// 或者 http://</p>
         </div>
        </div>
      <div slot="footer" class="dialog-footer">
         <setBtn :btnText = "saveBtn" @btnEvent ="saveCode"></setBtn>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import setBtn from '../../../part/btn'
  import { export2Excel } from '@/components/excel/unit'
export default {
  name: 'welfare',
  inject:['reload'],
  data () {
    return {
     "title":"福利",
     btnText:'导出清单',
     dialogTitle:'设置生日面使用码',
     welData:[],
     noodleD:[],
     physicalD:[],
     hasAxios :false,
     step:1,
     isShop:false,
     issetCode:false,
     birCode:"",
     phyCode:'',
     saveBtn:'保存',
     newcode:'',
     shopUrl:"",
     urlText:'修改外链',
     newshopUrl:'',
     tabs:[
       {
        text:'生日面',
        code:1,
        link:'noodle'
       },
       {
        text:'理疗',
        code:2,
        link:'physical'
       },
       {
        text:'商城',
        link:'shops',
        code:3
       }
     ],
     currentPage:1,
     totalNum:0,
    }
  },
  components:{
    setBtn:setBtn
  },
  created(){
    let self = this;
    let param = this.qs.stringify({
      page :self.currentPage,
      type:self.step
    })
   this.$axios.post('/api/queryWelfare',param).then(function(res){
      // console.log(res.data.list);
      self.welData = res.data.list;
      self.noodleD = res.data.list;
      self.totalNum = res.data.total;
   }).catch(function(ret){
    console.log(ret)
   })
  },
  methods:{
    showTabCon(code,currentPage){
      let self = this;
      self.step = code;   
      this.$options.methods.setdata(self,code,currentPage);
      // console.log(code)
      if(code == 3){
        this.getUrl();
        self.isShop = true;
      }
    },
    getUrl(){
      let self = this;
      this.$axios.post('/api/getMall').then(res=>{
        // console.log(res);
        self.shopUrl = res.data.data.ruleValue;
      }).catch(ret=>{
        console.log(ret)
      })
    },
    setdata(self,code,currentPage){
      // console.log(code,currentPage,"+++++++++++++")
      let param = self.qs.stringify({
        page :currentPage,
        type:code
      })     
      // console.log(self,code,param,"测试code ")       
      
        self.isShop = false;
        self.welData = self.noodleD;
        self.$axios.post('/api/queryWelfare',param).then(function(res){
          // console.log(res.data.list);
         
          self.totalNum = res.data.total;
          if(code == 1){
             self.welData = res.data.list;
           }else if(code == 2){
              self.welData = res.data.list;
           }
          // self.noodleD = res.data.list;
        }).catch(function(ret){
         console.log(ret)
        })
     
    },
    setCode(){
      let self = this;
      self.issetCode = true;
      if(self.step == 1){
        self.dialogTitle ='设置生日面使用码';
      } else if(self.step == 2 ){
        self.dialogTitle ='设置理疗使用码';
      };
       this.$axios.post('/api/getRules',this.qs.stringify({
          type:self.step
        })).then(res=>{
        // console.log(res.data.data.ruleValue);
          if(self.step == 1){
            self.birCode = res.data.data.ruleValue;
          } else if(self.step == 2 ){
            self.phyCode = res.data.data.ruleValue;
          };
       }).catch(ret=>{
        console.log(ret)
       })
    },
    saveCode(){
      let self = this;
      // console.log('baocun',self.newcode,self.step);
      let param = this.qs.stringify({
        type : self.step,
        ruleValue :self.newcode
      });
      if(self.isShop != true){      
        this.$axios.post('/api/updateRules',param).then(function(res){
          // console.log(res);
          self.issetCode = false;
          self.$message({
            type: 'success',
            message: '修改成功!'
          });         
          self.newcode="";
        }).catch(function(ret){
  
        })
      } else if(self.isShop == true){
        self.dialogTitle ='修改外链';
        this.$axios.post('/api/updateMall',this.qs.stringify({
          ruleValue:self.newshopUrl
        })).then(res=>{
          // console.log(res);
          self.$message({
            type: 'success',
            message: '修改成功!'
          });   
          this.getUrl();
          // self.shopUrl = self.newshopUrl;
          self.issetCode = false;
        }).catch(ret=>{
          console.log(ret)
        })
       
      }
      
    },
    handleClose(){
      let self = this;
      this.issetCode = false; 
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let self = this;
      // console.log(`当前页: ${val}`,val);
      this.$options.methods.setdata(self,self.step,val);
    },
    clerrAll(){
      let self = this;
      let param = this.qs.stringify({
        'type' : self.step
      });
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/deleteWelfare',param).then(function(res){
          // console.log(res,"删除");
          self.$message({
            type: 'success',
            message: '删除成功!'
          });
          self.reload();
        }).catch(function(ret){
           console.log(ret)
        })      
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });           
    },
    // 设置外链
    setUrl(){
      let self = this;
      self.issetCode = true;
    },
    btnEvent(){
      let self = this;
      let filterVal =[];
      let excelText ='';
      // console.log(self.step,"PPPPPPPPPPPPPP")
      let param = this.qs.stringify({
        type: self.step       
      });
      const tHeader = [ '员工姓名','部门','HR代码','参与时间'];
      if(self.step == 1){
        filterVal = [ 'userName', 'userDept', 'hrCode', 'birthdayNoodlesTime'];
        excelText = '生日面数据';
      } else if(self.step == 2 ) {
        filterVal  = [ 'userName', 'userDept', 'hrCode', 'physicalTime'];
        excelText = '理疗数据';
      };    　
      this.$axios.post('/api/exportWelfare',param).then(res=>{
        // console.log('导出清单',res.data,filterVal) ;
        export2Excel(tHeader,filterVal,res.data.data,excelText)
      }).catch(ret=>{
        console.log(ret)
      })         
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  .el-dialog{
    width: 420px;
  }
</style>
<style scoped lang="less">
.el-dialog{

}
.tabBox{
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom:1px solid  rgba(238,238,238,1);
  .tabLi{
    position:relative;
    display: inline-block;
    padding:0 30px;
    line-height: 50px;
    float: left;
    span{
      display: inline-block;
      height: 48px;
      line-height: 48px;
      color :#222222;
      font-size: 16px;
    }
    .tabactive{
       font-weight: bold;
       border-bottom: 2px solid #F54F32;
    }
  }
}
.main{
  position:relative;
  clear: both;
  width: 100%;
  height: auto;
  .topcon{
    height: 50px;
    line-height: 50px;
    span{
      float: right;
      display: inline-block;
      padding:0 20px;
      cursor: pointer;
    }
  }
}

 
 .shop{
  height: 120px;
  .shopP{
    height: 50px;
    line-height: 50px;
  }
 }
</style>
