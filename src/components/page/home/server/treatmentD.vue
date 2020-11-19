<template>
  <div class="treatmentD">
    <el-table
       :data="treatmentD"
       style="width: 100%"
       border >
       <el-table-column
         type="index"
         width="60">
       </el-table-column>
       <el-table-column
         prop="enroll_area"
         label="省内外"
         width="80">
       </el-table-column>

       <el-table-column
         prop="enroll_name"
         label="员工姓名"
         width="100">
       </el-table-column>
       <el-table-column
         prop="enroll_dept"
         label="部门"
         width="100">
       </el-table-column>
       <el-table-column
         prop="enroll_gender"
         label="性别"
         width="50"
         >
       </el-table-column>
       <el-table-column
         prop="enroll_hrCode"
         label="hr代码">
       </el-table-column>
       <el-table-column
         prop="enroll_idCard"
         label="证件号码"
         width="200">
       </el-table-column>
       <el-table-column
         prop="enroll_phone"
         label="手机号">
       </el-table-column>
       <el-table-column
         prop="enroll_remark"
         label="备注">
       </el-table-column>
       <el-table-column
         prop="enroll_userCultureTime"
         label="提交时间"
         width="180">
       </el-table-column>
       <el-table-column  width="120"  label="操作">
         <template slot-scope="scope">
           <el-button
           size="mini"
           type = "text"
           @click="deleteTr(scope.row.id)"
           >
             删除
           </el-button>
         </template>
       </el-table-column>
     </el-table>
  </div>
</template>

<script>
export default {
  name: 'treatmentD',
  props: ['treatmentD', 'deleteLxyList'],
  data () {
    return {

    }
  },
  methods: {
    deleteTr (id) {
      this.$emit('deleteLxyList', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
