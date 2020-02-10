<template>
  <div class="staffResource">
   <h1>{{title}}</h1>
   <div class="mainBox">
    <!--  <div class="leftbox" >
       <div class="btnBox clear">
         <setBtn :btnText = "addText" @btnEvent ="addMarkList"></setBtn>
       </div>
       <div>
        <el-tree         
          :data="StaffData"   
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click ='handleNodeClick'
          :default-expanded-keys="treeExpandedKeys"        
          
          >
        </el-tree>
       </div>
     </div> -->
     <div class="">
       <div class="btnBox clear">
         <setBtn :btnText = "addText" @btnEvent ="addStaff"></setBtn>
       </div>
       <div>
         <el-table
           ref="multipleTable"
           :data="roleData"
           tooltip-effect="dark"
           style="width: 100%"
           border
           >
           <el-table-column
            type="index"
            width="40"
            >
           </el-table-column>
           <el-table-column
             prop="userAccount"
             label="用户账号名"
             >
           </el-table-column>
           <el-table-column
             prop="userName"
             label="用户名称"
             >
           </el-table-column>
           <el-table-column
             prop="userPhone"
             label="用户手机"
             width="110"
             >
           </el-table-column>
           <el-table-column
             prop="userEmail"
             label="用户邮箱"
             >
           </el-table-column>
             <el-table-column
               prop="lastTime"
               label="最后登录时间"
               width="160"
             >
           </el-table-column>
           <el-table-column   label="操作"  width="200">  
             <template slot-scope="scope">
               <span class="btn red_btn" @click="delectEdit(scope.row.userId)">删除</span>
               <span class="btn blue_btn" @click="handleEdit(scope.row.userId)">修改</span>
               <span class="btn blue_btn" @click="choiceEdit(scope.row.userId)">选择角色</span>

             </template>  

           </el-table-column>
         </el-table>
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
       <!--弹窗-->
    <el-dialog
      title="资源信息"
      :visible.sync="ifChange"
      width="350px"
      top = "10vh"
      center >  
      <div v-if="isRote == true">     
        <div v-if="isZy == false">
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;" >用户账号名:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="userAccount" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">用户名称:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="userName" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
        <div class="xxx-box" v-if="isnew == true"> 
           <div class="xxx-box30" style="width: 250px;">用户初始密码:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="userPwd" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">用户手机:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="userPhone" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">用户邮箱:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="userEmail" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
         
        </div>
        <div v-if="isZy == true">
        <el-table
          ref="multipleTableT"
          :data="roleZyData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="资源名称"
            >
          </el-table-column>

        </el-table>       
        </div>
      </div>
      <div v-if="isRote == false">
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">节点名称:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="markName" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
         <setBtn :btnText = "saveBtn" @btnEvent ="saveData"></setBtn>
      </div>
    </el-dialog>
     </div>
   </div>
   



  </div>
</template>

<script>
  import setBtn from '../../part/btn'
  import staffL from './staffL'
export default {
  name: 'staffResource',
  inject:['reload'],
  data () {
    return {
     "title":"用户管理",
     addText:'新增',
     isRote:false,
     StaffData:[],
     roleData:[],
     treeExpandedKeys:[],
     defaultProps: {
        children: 'children',
        label: 'text',
        id: "",
      },
      currentPage:1,
      totalNum :1,
      ifChange:false,
      userAccount:'',
      userName:'',
      userPwd:'123456',
      userPhone:'',
      userEmail:'',
      markName:'',
      saveBtn:'保存',
      isnew:true,
      isZy:false,
      markId:'',
      priority:'',
      parentId:'',
      userId:'',
      roleZyData:[],
      hasCroleId:[],
      IdsData:[]

    }
  },
  components:{
    setBtn,
    staffL
  },
  computed:{
   
  },
  watch:{
   
  },
  created(){
    let self = this;
    this.$axios.post('/api/querySUser',this.qs.stringify({
      "page":1,
      "limit":15
    })).then(res=>{
      // console.log(res.data,"右边");
      self.roleData = res.data.data;
      self.totalNum = res.data.total
    }).then(()=>{
      this.$axios.post('/api/getMarkList').then(res=>{
        // console.log(res.data,'左边');
        self.StaffData.push(res.data.data);
      })
    }).catch(ret =>{
      console.log(ret)
    })
  },
  methods:{
    // 新增用户信息
    addStaff(){
      let self = this;
      self.ifChange = true;
      self.isZy = false;
      self.isnew = true;
      self.isRote = true;
    },
    //新增节点
    addMarkList(){
      let self = this;
      console.log(self.markId)
      if(self.markId !=''){
        console.log('markId不等于空');
        self.ifChange = true;
        self.isRote = false;
        
      } else{
        console.log('markId等于空');
        self.$message({
          type: 'success',
          message: '请先选择节点!'
        });
      }
      
    },
    handleNodeClick(data,node){
      let self = this;
      console.log(data,node,'handleNodeClick',data.id);
      self.markId=data.id;
      self.priority=data.priority;
      self.parentId=data.parentId;
    },
 
    // 修改员工信息
    handleEdit(id){
      let self = this;
      self.ifChange = true;
      self.isZy = false;
      self.isnew = false;
      self.isRote = true;
      self.userId = id;
      this.$axios.post('/api/getUserByUserId',this.qs.stringify({userId:id})).then(res=>{
        console.log(res.data.data)
        self.userAccount = res.data.data.userAccount;
        self.userName = res.data.data.userName;
        self.userEmail = res.data.data.userEmail;
        self.userPhone = res.data.data.userPhone;

      }).catch(ret=>{

      })
    },
    // 删除
    delectEdit(id){
      let self = this;

      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/delUserByUserId',this.qs.stringify({
        userId:id
      })).then(function(res){
          console.log(res,"删除");
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
    // 选择资源
    choiceEdit(id){
      let self = this;
      self.isZy = true;
      self.ifChange = true;
      self.isRote = true;
      self.userId = id;
      this.$axios.post('/api/selectRoleByUser',this.qs.stringify(
      {
        userId:id
      })).then(res=>{
        // console.log(res.data);
        self.roleZyData = res.data.data;
        // console.log(self.roleZyData.length,"oooooo")
        for(let i = 0 ; i < self.roleZyData.length ; i++ ){
         
           if(self.roleZyData[i].status == 1){
             //这是默认选中上的
              console.log(self.roleZyData[i],"pppppp")
             this.$refs.multipleTableT.toggleRowSelection(self.roleZyData[i],true);
           }
         } 
      }).catch(ret =>{
        console.log(ret)
      })
    },
    handleSelectionChange(val){
      let self = this;
      // console.log(val,"val");
      self.hasCroleId = val;
    },
    // 保存新增或者修改数据
    saveData(){
      let self = this;
      let param = {
        userAccount:self.userAccount,
        userPwd:self.userPwd,
        userName:self.userName,
        userPhone: self.userPhone,
        userEmail: self.userEmail,
        mark_id:self.markId
      };
    
     
        
       if(self.isZy == false){
         if(self.userName == ''){
           self.$message({
             type: 'info',
             message: '用户名不能为空!'
           });
           return false;
         }
        if(self.isnew == true ){
          if(self.userPwd == ''){
            self.$message({
              type: 'info',
              message: '初始密码不能为空!'
            });
            return false;
          }   
          this.$axios.post('/api/addOrUpdateSUser',this.qs.stringify(param)).then(res=>{
            
            self.$message({
              type: 'success',
              message: '新增用户的信息成功!'
            });
            self.ifChange = false;
            self.reload();
          }).catch(ret=>{
            console.log(ret)
          })
        } else if(self.isnew == false){
          param.userId = self.userId
          this.$axios.post('/api/addOrUpdateSUser',this.qs.stringify(param)).then(res=>{          
            self.$message({
              type: 'success',
              message: '修改用户的信息成功!'
            });
            self.ifChange = false;
            self.reload();
          }).catch(ret=>{
            console.log(ret)
          })
        }
       } else if(self.isZy == true){
        // console.log(self.hasCroleId,"[[[[[[")
        self.hasCroleId.forEach((n,m)=>{
          // console.log(n.authId,m);
          self.IdsData.push(n.roleId);
        });
        // console.log(self.IdsData.join(','),"pppppppp",self.id)
        this.$axios.post('/api/addRoleByuserId',this.qs.stringify({
          roleId: self.IdsData.join(','),
          userId:self.userId
        })).then(res=>{
          // console.log(res);
          self.ifChange = false;
          self.hasCroleId =[];
          self.reload();
        }).catch(ret=>{
          console.log(ret)
        })
       }
      
     // if(self.isRote == true){  } else if(self.isRote == false){
     //  this.$axios.post('/api/addMark',this.qs.stringify({
     //      markName:self.markName,
     //      parentId:self.parentId,
     //      priority:self.priority
     //    })).then(res=>{
     //      // console.log(res);
     //      self.$message({
     //        type: 'success',
     //        message: '新增节点成功!'
     //      });
     //      self.ifChange = false;
     //      self.reload();
     //    }).catch(ret =>{
     //      console.log(ret)
     //    })
     //  }    
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let self = this;
      console.log(`当前页: ${val}`,val);
      let param = this.qs.stringify({
        page:val,
        limit :15    
      }); 
      this.$axios.post('/api/querySUser',param).then(function(res){
        // console.log(res.data,"pppppp");
        self.roleData = res.data.data;
      }).catch(function(ret){
        console.log(ret)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
  .staffResource{
    position: relative;
    width: 100%;
    height: auto;
    padding: 10px 20px;
    .mainBox{
      // display: flex; 
      // .leftbox{
      //   position:relative;
      //   flex-grow:1;
      //   height: auto;
      //   flex-basis: 22px;
      //   flex-shrink: 1;
      // }
      // .rightBox{
      //   position:relative;
      //   flex-grow:4;
      //   height: auto;
      //   flex-basis: 22px;
      //   flex-shrink: 4;
      // }
    }
    .btnBox{
      margin-bottom: 10px;
  
    }
  }
</style>


<!-- 
.row__item--double {
    -webkit-box-flex: 2;
    -webkit-flex-grow: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    -webkit-flex-shrink: 2;
    -ms-flex-negative: 2;
    flex-shrink: 2;
    -webkit-flex-basis: 22px;
    -ms-flex-preferred-size: 22px;
    flex-basis: 22px;
} -->