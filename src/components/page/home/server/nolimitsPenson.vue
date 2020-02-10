<template>
  <div class="nolimitsPenson">
    <el-table
       :data="nolimitsPenson"
       style="width: 100%"
       border >
       <el-table-column
         prop="hr_code"
         label="hr代码">
       </el-table-column>
       <el-table-column
         prop="user_name"
         label="姓名"
         width="200">
       </el-table-column>
       <el-table-column
         prop="cateName"
         label="部门"
         >
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
  name: 'nolimitsPenson',
  props:['nolimitsPenson','deletelimitTr'],
  data () {
    return {
    
    }
  },
  methods:{
    deleteTr(option){
      this.$emit('deletelimitTr',option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>





