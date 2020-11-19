
<template>
  <div class="staffResource">
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
          prop="roleName"
          label="权限名称"
          >
        </el-table-column>
        <el-table-column   label="操作"  width="200">
          <template slot-scope="scope">
            <span class="btn blue_btn" @click="handleEdit(scope.row.roleId,scope.row.roleName)">修改</span>
            <span class="btn red_btn" @click="delectEdit(scope.row.roleId)">删除</span>
            <span class="btn red_btn" @click="choiceEdit(scope.row.roleId)">选择权限</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog
      title="角色信息"
      :visible.sync="ifChange"
      width="300px"
      top = "10vh"
      center >
      <div v-if="istree == false">
        <div class="xxx-box">
           <div class="xxx-box30" style="width: 250px;">角色名称:</div>
           <div class="xxx-box70" style="width: 250px;">
             <el-input v-model="wzNum" placeholder="请填写"></el-input>
           </div>

        </div>
      </div>
      <div v-if="istree == true">
        <el-table
          ref="multipleTableT"
          :data="roleData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column
            prop="authName"
            label="角色名称"
            >
          </el-table-column>
        </el-table>

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
  name: 'staffResource',
  inject: ['reload'],
  data () {
    return {
      'title': '角色管理',
      addText: '新增',
      staffLData: [

      ],
      ifChange: false,
      wzNum: '',
      saveBtn: '保存',
      id: '',
      isadd: true,
      istree: false,
      roleData: [],
      hasCroleId: [],
      IdsData: []
    }
  },
  components: {
    setBtn,
    staffL
  },
  created () {
    let self = this
    this.$axios.post('/api/showRoles', this.qs.stringify({
      'page': 1,
      'limit': 15
    })).then(res => {
      // console.log(res.data);
      self.staffLData = res.data.data
    }).catch(ret => {
      console.log(ret)
    })
  },
  methods: {
    // 新增权限
    addStaffL () {
      let self = this
      self.wzNum = ''
      self.ifChange = true
      self.isadd = true
      self.istree = false
    },
    // 修改权限
    handleEdit (id, name) {
      let self = this
      // console.log(id,"权限")
      self.ifChange = true
      self.id = id
      self.wzNum = name
      self.isadd = false
      self.istree = false
    },
    // 选择权限
    choiceEdit (id) {
      let self = this
      // console.log(id,"ooooo")
      self.istree = true
      self.ifChange = true
      self.resourceData = []
      self.id = id
      this.$axios.post('/api/queryAuthByRole', this.qs.stringify({
        roleId: id
      })).then(res => {
        // console.log(res.data.data,"[[[[[[");
        self.roleData = res.data.data
        for (let i = 0; i < self.roleData.length; i++) {
          if (self.roleData[i].status === 1) {
            // 这是默认选中上的
            // console.log(self.roleZyData[i],"pppppp")
            this.$refs.multipleTableT.toggleRowSelection(self.roleData[i], true)
          }
        }
      }).catch(ret => {
        console.log(ret)
      })
    },
    handleSelectionChange (val) {
      let self = this
      // console.log(val,"val");
      self.hasCroleId = val
    },
    saveNum () {
      let self = this
      // console.log("权限",self.hasCroleId);
      if (self.isadd === true && self.istree === false) {
        this.$axios.post('/api/addRoles', this.qs.stringify({
          'roleName': self.wzNum
        })).then(res => {
          // console.log(res);
          self.ifChange = false
          self.reload()
        }).catch(ret => {
          console.log(ret)
        })
      } else if (self.isadd === false && self.istree === false) {
        this.$axios.post('/api/modifyRole', this.qs.stringify({
          'roleName': self.wzNum,
          roleId: self.id
        })).then(res => {
          // console.log(res);
          self.ifChange = false
          self.reload()
        }).catch(ret => {
          console.log(ret)
        })
      } else if (self.istree === true) {
        self.hasCroleId.forEach((n, m) => {
          // console.log(n.authId,m);
          self.IdsData.push(n.authId)
        })
        // console.log(self.IdsData.join(','))
        this.$axios.post('/api/addAuthToRole', this.qs.stringify({
          aIds: self.IdsData.join(','),
          rId: self.id
        })).then(res => {
          // console.log(res);
          self.ifChange = false
          self.reload()
        }).catch(ret => {
          console.log(ret)
        })
      }
    },

    // 删除权限
    delectEdit (id) {
      let self = this
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/delRole', this.qs.stringify({
          authId: id
        })).then(res => {
          // console.log(res);
          this.$message({
            type: 'info',
            message: '删除成功'
          })
          self.reload()
        }).catch(ret => {
          console.log(ret)
        })
      }).catch(ret => {
        console.log(ret)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
