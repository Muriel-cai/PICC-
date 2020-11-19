<template>
  <div class="staff">
    <h1>{{title}} </h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="HR代码">
        <el-input v-model="formInline.getHRcode" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formInline.getPhone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.getuserName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <setBtn :btnText = "searchText" @btnEvent ="searchE"></setBtn>
        <!-- <el-button type="primary" @click="" color="#F54F32">查询</el-button> -->
      </el-form-item>
    </el-form>

    <div class="btnBox clear">
      <setBtn :btnText = "addText" @btnEvent ="addStaff"></setBtn>
      <setBtn :btnText = "deleteText" @btnEvent ="deteleStaff"></setBtn>
      <div class="formBox">
        <input type="file" name="attence"  @change="changeFile($event)" ref="attenceInput" />
        <span >批量导入</span>
      </div>
    </div>
    <!--表格数据-->
    <div class="mainBox">
      <el-table
        ref="multipleTable"
        :data="staffData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
         type="index"
         width="40">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="110">
        </el-table-column>
        <el-table-column
          prop="hrCode"
          label="HR代码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userDept"
          label="部门"
          >
        </el-table-column>

       <!--  <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
         prop="entryDate"
          label="入职日期"

          >
          <!-- <template slot-scope="scope"> {{renderTime (scope.row.entryDate)}}</template> -->
        </el-table-column>
        <el-table-column
          prop="birthdayNum"
          label="生日面次数"
          width="90">
        </el-table-column>
        <el-table-column
          prop="phtNum"
          label="理疗次数"
          width="90">
        </el-table-column>
        <el-table-column
          prop="tpdoctorNum"
          label="电话医生次数"
          width="105">
        </el-table-column>
        <el-table-column   label="操作"  width="100">
          <template slot-scope="scope">
            <span class="btn blue_btn" @click="handleEdit(scope.row)">编辑</span>
            <span class="btn red_btn" @click="delectEdit(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    <div style="margin-top: 20px">
    <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
    <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
  </div>
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
    <el-dialog
      title="员工信息"
      :visible.sync="ifAdd"
      width="80%"
      top = "10vh"
      center >
      <div>
        <addInfo  :ifNew="isnew"> </addInfo>
        <!-- <div class="subBtn">
          <setBtn :btnText = "subText" @btnEvent ="submit"></setBtn>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import setBtn from '../../part/btn'
import setInput from '../../part/setinput'
import addInfo from './addInfo'
export default {
  name: 'staff',
  inject: ['reload'],
  data () {
    return {
      'title': '员工管理',
      formInline: {
        getPhone: '',
        getHRcode: '',
        getuserName: ''
      },
      searchText: '查询',
      addText: '添加员工',
      deleteText: '删除',
      isnew: '',
      ifAdd: false,
      staffData: [],
      multipleSelection: [],
      staffInfos: [],
      currentPage: 1,
      totalNum: 1,
      choSelection: [],
      attenceFile: {}
    }
  },
  components: {
    setBtn: setBtn,
    setInput: setInput,
    addInfo: addInfo
  },
  created () {
    let self = this
    let param = this.qs.stringify({
      page: self.currentPage,
      limit: 15
    })
    this.$axios.post('/api/queryUserList', param).then(function (res) {
      console.log(res.data)
      self.staffData = res.data.data
      self.totalNum = res.data.total
    }).catch(function (ret) {
      console.log(ret)
    })
  },
  methods: {
    addStaff () {
      let self = this
      self.ifAdd = true
      self.isnew = ''
      // this.$refs['staffInfo'].resetFields();
      // self.staffInfos =[];
    },
    deteleStaff () {
      let self = this
      self.multipleSelection.forEach(val => {
        self.choSelection.push(val.userId)
      })
      let newData = Array.from(new Set(self.choSelection))
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('api/delUserList',
          this.qs.stringify(
            {
              user_id: newData.join()
            })
        ).then(function (res) {
          console.log(res, '删除')
          self.$message({
            type: 'success',
            message: '全部清空!'
          })
        }).catch(function (ret) {
          console.log(ret)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    renderTime (date) {
      let dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    // toggleSelection(rows){
    //   console.log(rows,"rows")
    //   if (rows) {
    //     rows.forEach(row => {
    //       console.log(row,"ppppp")
    //       // this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange (val) {
      var self = this
      self.multipleSelection = val
      console.log(val, 'select', this.multipleSelection)
      val.forEach(val => {
        self.choSelection.push(val.userId)
      })
    },
    handleEdit (option) {
      let self = this
      console.log(option.userId, '编辑')
      self.isnew = option.userId
      self.ifAdd = true
    },
    // 删除
    delectEdit (option) {
      let self = this
      console.log(option.userId, 'delectEdit')
      let param = this.qs.stringify({
        'user_id': option.userId
      })
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/delUser', param).then(function (res) {
          console.log(res, '删除')
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.reload()
        }).catch(function (ret) {
          console.log(ret)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量导入
    changeFile (e) {
      let self = this
      let repeatRowNum = []
      let wrongRowNum = []
      let repeatText
      self.attenceFile = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('filename', self.attenceFile)// 通过append向form对象添加数据
      console.log(self.attenceFile, param)
      this.$alert('', '批量导入员工信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          // console.log(11111,self.step,self.attenceFile,"+++++++++++++++",param);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$axios.post('/api/importExcel',
            param,
            config
          ).then(res => {
            if (res.data.data) {
              res.data.data.forEach(function (i, n) {
                // console.log(i.rowType,n);
                if (i.rowType === 1) {
                  repeatRowNum.push(i.row)
                } else {
                  wrongRowNum.push(i.row)
                }
                // console.log(repeatRowNum,wrongRowNum,"wrongRowNum")
              })
            }
            console.log(repeatRowNum, wrongRowNum, 'wrongRowNum')
            if (repeatRowNum.length > 0) {
              repeatText = ' 第' + repeatRowNum.join(',') + '行重复！ '
            } else {
              repeatText = ''
            }
            if (wrongRowNum.length > 0) {
              wrongRowNum = ' 第' + wrongRowNum.join(',') + '行信息有误! '
            } else {
              wrongRowNum = ''
            }
            this.$message({
              type: 'error',
              message: 'excel中' + repeatText + wrongRowNum,
              duration: 10000
            })
            this.$refs.attenceInput.value = null
            self.attenceFile = ''
          }).catch(ret => {
            console.log(ret)
            self.attenceFile = ''
          })
        }
      })
    },
    searchE () {
      let self = this
      console.log(1455, self.formInline.getPhone, self.formInline.getHRcode)
      var param = this.qs.stringify({
        'hrCode': self.formInline.getHRcode,
        'phone': self.formInline.getPhone,
        'userName': self.formInline.getuserName
      })
      console.log(param, 'pppp+++++++++', self.getHRcode)
      this.$axios.post('/api/queryUserList', param).then(function (res) {
        self.staffData = res.data.data
      }).catch(function (ret) {
        console.log(ret)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      let self = this
      console.log(`当前页: ${val}`, val)
      let param = this.qs.stringify({
        'page': val,
        limit: 15
      })
      this.$axios.post('/api/queryUserList', param).then(function (res) {
        self.staffData = res.data.data
      }).catch(function (ret) {
        console.log(ret)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "less">
 .staff{
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
 .mainBox{
  position:relative;
  height: auto;
  min-width: 990px;

 }
 .subBtn{
  height: 50px;
  width: 100%;
  position:relative;
  margin-top: 20px;
  text-align: center;
 }
 .formBox{
  position:relative;
  display: inline-block;
  width: 200px;
  height: 50px;
  text-align: right;
  input{
    position:relative;
    z-index: 10;
    opacity: 0;
  }
  span{
    position:absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top:0;bottom:0;
    left:0;right:0;

  }
}
</style>
