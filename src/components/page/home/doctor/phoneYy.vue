<template>
  <div class="dortorList">  
    <h1 class="title">{{title}}</h1>
    <div class="topcon">
      <setBtn :btnText = "addBtn" @btnEvent ="putOut"></setBtn>
      <span @click="setNum">设置每日问诊放号量</span>
    </div>
    <doDortorList  :doDortorList ="dortorData"  @handleEdit="handleEdit"></doDortorList>
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
     <!--设置每日问诊放号量-->
    <el-dialog
      title="设置每日问诊放号量"
      :visible.sync="issetNum"
       width="380px"
      :before-close="handleClose"
      >
     
      <div >
        <span> </span>
         <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">设置每日问诊放号量:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="wzNum" placeholder="请填写"></el-input>            
           </div> 
          
         </div>
        </div>
      <div slot="footer" class="dialog-footer">
         <setBtn :btnText = "saveBtn" @btnEvent ="saveNum"></setBtn>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
  import setBtn from '../../../part/btn'
  import doDortorList from './doDortorList'
  import { export2Excel } from '@/components/excel/unit'
export default {
  name: 'dortorList',
  inject:['reload'],
  data () {
    return {
      title:'电话医生',
      addBtn:'导出清单',
      dortorData : [] ,
      currentPage:1 ,
      totalNum:1,
      saveBtn:'保存',
      issetNum:false,
      wzNum:''
    }
  },
  components:{
    setBtn,
    doDortorList
  },
  mounted:function(){
    
  },
  created(){
    let self = this;
    this.$axios.post('/api/queryTelephoneDoctorList',this.qs.stringify({
      "page":self.currentPage,
      "limit":15
    })).then(res=>{
      // console.log(res.data,"++++++++");
      self.dortorData = res.data.data;
      self.totalNum = res.data.total;
    }).catch(ret=>{
      console.log(ret)
    })
  },
  methods:{
    // 设置每日问诊放号量
    saveNum(){
      let self = this;
      // console.log(self.wzNum,"设置每日问诊放号量");
     
      this.$axios.post('/api/updateWzCount',this.qs.stringify({
        wz_count:self.wzNum
      })).then(res=>{
        // console.log(res);
        self.issetNum = false;
      }).catch(ret=>{
        console.log(ret)
      })
      
    },
    handleClose(){
      let self = this;
      this.issetNum = false; 
    },
    // 
    setNum (){
      let self = this;
       self.issetNum = true;
       this.$axios.post('/api/queryCountEveryDay').then(res=>{
        console.log(res.data.data);
        self.wzNum = res.data.data;
       }).catch(ret=>{
        console.log(ret)
       })
    },
    handleEdit(id, type){
      let self = this;
      // console.log(id,type,"主页");
      this.$confirm( '是否继续执行该操作 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
        this.$axios.post('/api/updateWzStatus',this.qs.stringify({
          wzid:id,
          wzHandle:type
        })).then(res=>{
          // console.log(res,"wzHandle");
          self.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.reload()
        }).catch(ret=>{
          console.log(ret)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    // 导出清单
     putOut(){
      let self = this;
      let excelText = '电话医生已申请名单';
      // console.log(self.step,"PPPPPPPPPPPPPP")
     
      const tHeader = [ '问诊人姓名','性别','是否本人','联系电话','希望问诊时间','是否已就医','症状描述'];   
      const filterVal = [ 'wz_name', 'wz_gender', 'wz_relation', 'wz_phone','wz_timestart', 'is_seek', 'wz_description'];
      
      this.$axios.post('/api/queryTelephoneDoctorList',this.qs.stringify({
        wzState:'1',
        limit:'-1'
      })).then(res=>{
        // console.log('导出清单',res.data,filterVal) ;
        export2Excel(tHeader,filterVal,res.data.data,excelText)
      }).catch(ret=>{
        console.log(ret)
      })         
    },
    //分页的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);

    },
    handleCurrentChange(val) {
      let self = this;
      // console.log(`当前页: ${val}`,val,"handleCurrentChange1");
     self.currentPage = val;
     this.$axios.post('/api/queryTelephoneDoctorList',this.qs.stringify({
      "page":self.currentPage,
      "limit":15
     })).then(function(res){
        // console.log(res.data,"pppppp");
        self.dortorData = res.data.data;
      }).catch(function(ret){
        console.log(ret)
      })
      
    },
  }
}
</script>
 
<style lang="less" scoped="">
  .dortorList{
    position: relative;
    width: 100%;
    height: auto;
    .title{
      height: 30px;
      width: 100%;
      line-height: 30px;
      color: #222222;
      padding-bottom: 10px; 
      border-bottom: 1px solid rgba(238,238,238,1);
      margin-bottom: 10px;
    }
    .btnBox{
      margin-bottom: 10px;
    }
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

</style>
