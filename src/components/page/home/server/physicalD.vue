<template>
  <div class="physicalD">
    <el-table
       :data="physicalD"
       style="width: 100%"
       border >
       <el-table-column
         type="index"
         width="60">
       </el-table-column>

       <el-table-column
         prop="tj_name"
         label="员工姓名"
         width="80">
       </el-table-column>
       <el-table-column
         prop="tj_dept"
         label="部门"
         width="">
       </el-table-column>
       <el-table-column
         prop="tj_gender"
         label="性别"
         width="50"
         >
       </el-table-column>
       <el-table-column
         prop="tj_age"
         label="年龄"
         width="100">
       </el-table-column>
       
       <el-table-column
         prop="tj_hrCode"
         label="hr代码">
       </el-table-column>
       <el-table-column
         prop="marital_id"
         label="婚姻状态"
         width="200">
       </el-table-column>
       <el-table-column
         prop="tj_phone"
         label="手机号">
       </el-table-column>
       <el-table-column
         prop="hospital_name"
         label="医院名称">
       </el-table-column>
       <el-table-column
         prop="pe_time"
         label="提交时间"
         width="180">
       </el-table-column>
       <el-table-column  width="120"  label="操作">  
         <template slot-scope="scope">
           <el-button
           size="mini"
           type = "text"
           @click="deletetjTr(scope.row.id)"
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
  name: 'physicalD',
  props:['physicalD',"deleteTjList"],
  data () {
    return {
    
    }
  },
  methods:{
    deletetjTr(id){
      this.$emit('deleteTjList',id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




