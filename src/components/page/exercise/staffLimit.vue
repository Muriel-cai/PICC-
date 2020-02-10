<template>
  <div class="staffLimit">
    <h1>{{title}}</h1>
    <div class="btnBox clear">
      <setBtn :btnText = "addText" @btnEvent ="addStaffL"></setBtn>
    </div>
    <div class="mainBox">
      <el-table
        ref="multipleTable"
        :data="staffLData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        >
        <el-table-column
         type="index"
         width="40">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          >
        </el-table-column>
        <el-table-column   label="操作"  width="200">  
          <template slot-scope="scope">
            <span class="btn blue_btn" @click="handleEdit(scope.row.authId,scope.row.authName)">修改</span>
            <span class="btn red_btn" @click="delectEdit(scope.row.authId)">删除</span>
            <span class="btn red_btn" @click="choiceEdit(scope.row.authId)">选择资源</span>
          </template>   
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog
      title="资源信息"
      :visible.sync="ifChange"
      width="300px"
      top = "10vh"
      center >       
      <div v-if="istree == false">
        <div class="xxx-box"> 
           <div class="xxx-box30" style="width: 250px;">权限名称:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="wzNum" placeholder="请填写"></el-input>            
           </div> 
          
        </div>
      </div>
      <div v-if="istree == true">
        <el-tree         
          :data="resourceData"        
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click ='handleNodeClick'        
          @check-change= 'getCurrentKey'
          :check-strictly ='checkStrictly'
          :default-checked-keys='checkedArr'
         
          >
          <!-- {{id}}.............. {{id+' xllxvkvvk'}} -->
        </el-tree>
        <!-- {{checkedArr}} -->
      </div>
      <div slot="footer" class="dialog-footer">
         <setBtn :btnText = "saveBtn" @btnEvent ="saveNum"></setBtn>
      </div>
    </el-dialog> 
   
  </div>
</template>

<script>
  import setBtn from '../../part/btn'
  import staffL from './staffL'
export default {
  name: 'staffLimit',
  inject:['reload'],
  data () {
    return {
      "title":"权限管理",
      addText:'新增',
      staffLData:[],
      ifChange:false,
      wzNum:'',
      saveBtn:'保存',
      id:'',
      isadd:true,
      istree:false,
      resourceData:[],
      defaultProps: {
        children: 'children',
        label: 'text',
        id: "",
      },
      activeData: null,   // 当前操作数据
      treeExpandedKeys:[] ,  // 记录打开节点的数组 
      checkedArr:[],
      checkStrictly:false
    }
  },
  components:{
    setBtn,
    staffL
  },
  created(){
    let self = this;
    this.$axios.post('/api/showAuths',this.qs.stringify({
      "page":1,
      "limit":15
    })).then(res=>{
      // console.log(res.data);
      self.staffLData = res.data.data;
    }).catch(ret =>{
      console.log(ret)
    })
  },
  methods:{  
   
    //新增权限
    addStaffL(){
      let self = this;
      self.wzNum = '';
      self.ifChange = true;
      self.isadd = true;
      self.istree = false;
    },
    // 修改权限
    handleEdit(id,name){
      let self = this;
      // console.log(id,"权限")
      self.ifChange = true;
      self.id = id;
      self.wzNum = name;
      self.isadd = false;
      self.istree = false;
    },
    // 选择权限
    choiceEdit(id){
      let self = this;
      // console.log(id,"ooooo")
      self.istree = true;
      self.ifChange = true;
      self.resourceData=[];
      self.checkedArr =[];
      self.id = id;
      self.checkStrictly = true
      this.$axios.post('/api/showMenuByAuth',this.qs.stringify({
        authId:id
      })).then(res=>{
        // console.log(res.data.data,"[[[[[[",);
        self.resourceData.push(res.data.data);
        // this.filterNode()
        setTimeout(function () {
        res.data.data.children.forEach((n,m)=>{
          n.children.forEach((z,y) =>{
            console.log(z.checked,y);
            if(z.checked == true){
             self.checkedArr.push(z.id);
            }

          })
        });
        self.$refs.tree.setCheckedKeys(self.checkedArr);
      },500)
        
        // self.checkedArr = new Set(self.checkedArr);
        // console.log(self.checkedArr)
         // self.treeExpandedKeys.push(data.id);
      }).catch(ret =>{
        console.log(ret)
      })
    },
   
    handleNodeClick(data,node){
      let self = this;
      // console.log(data.id,"++++++++++++++",node);
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // console.log(parent,"+++++++++",children,"]]]]]]",index)
      // self.treeExpandedKeys.push(data.id);
      // if(data.description == 1){//判断点击节点，choose the node you clicked
      //    console.log(1111)
      // } 
    },
    getCurrentKey(data,node){
      let self = this;
      // console.log('setCheckedNodes',data.id,node);
      const index = self.treeExpandedKeys.indexOf(data.id);
      if(node == true) {
        self.treeExpandedKeys.push(data.id);
      } else if(node == false){
        self.treeExpandedKeys.splice(index, 1);
      }
      // console.log(self.treeExpandedKeys,"self.treeExpandedKeys")
    },
    saveNum(){
      let self = this;
      // console.log("权限",self.wzNum);
      if(self.isadd == true && self.istree == false){
        this.$axios.post('/api/addAuths',this.qs.stringify({
          'authName':self.wzNum
        })).then(res=>{
          // console.log(res);
          self.ifChange = false;
          self.reload();
        }).catch(ret=>{
          console.log(ret)
        })
      } else if(self.isadd == false && self.istree == false) {
        this.$axios.post('/api/modifyAuth',this.qs.stringify({
          'authName':self.wzNum,
          authId :self.id
        })).then(res=>{
          // console.log(res);
          self.ifChange = false;
          self.reload();
        }).catch(ret=>{
          console.log(ret)
        })
      } else if(self.istree == true) {
        this.$axios.post('/api/addResourceToAuth',this.qs.stringify({
          rIds:self.treeExpandedKeys.join(','),
          aId:self.id 
        })).then(res=>{
          // console.log(res);
          self.ifChange = false;
          self.reload();
        }).catch(ret=>{
          console.log(ret)
        })
      }        
    },
    //删除权限
    delectEdit(id){
      let self = this;
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/delAuthBId',this.qs.stringify({        
          authId :id
        })).then(res =>{
          // console.log(res);
          this.$message({
            type: 'info',
            message: '删除成功'
          }); 
          self.reload();
        }).catch(ret=>{
          console.log(ret)
        })
      }).catch(ret=>{
        console.log(ret);
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.staffLimit{
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
 }

</style>
