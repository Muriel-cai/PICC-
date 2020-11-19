<template>
  <div class="doDortorList">
    <el-table
       :data="doDortorList"
       style="width: 100%"
       border >
       <el-table-column
         type="index"
         width="60">
       </el-table-column>
       <el-table-column
         prop="wz_name"
         label="问诊人姓名"
         width="98">
       </el-table-column>

       <el-table-column
         prop="wz_gender"
         label="性别"
         width="60">
       </el-table-column>
       <el-table-column
         prop="wz_relation"
         label="是否本人"
         width="120">
       </el-table-column>
       <el-table-column
         prop="wz_phone"
         label="联系电话"
         width="120"
         >
       </el-table-column>
       <el-table-column
         prop="wz_time"
         label="希望问诊时间">
       </el-table-column>
       <el-table-column
         prop="is_seek"
         label="是否已就医"
         width="100">
       </el-table-column>
       <el-table-column
         prop="wz_description"
         label="症状描述">
       </el-table-column>
       <el-table-column
         prop="wz_state"
         label="状态">
          <template slot-scope="scope" >
           <span :class="{'green_c' : scope.row.wz_state == 1}" > {{renderstate (scope.row.wz_state)}} </span>
          </template>
       </el-table-column>
       <el-table-column
         prop="wz_evaluate"
         label="星级评价"
         >
         <template slot-scope="scope" >
          <!-- {{renderTime (scope.row.entryDate)}} -->

           <el-rate
             v-model="scope.row.wz_evaluate"
             disabled
             show-score
             text-color="#ff9900"
             v-if ='scope.row.wz_evaluate >=1'
            >
           </el-rate>
           <span v-if ='scope.row.wz_evaluate == 0 '> 未评分</span>
        </template>

       </el-table-column>
       <el-table-column  width="120"  label="操作">
         <template slot-scope="scope">
           <el-button
            v-if="scope.row.wz_state == 1"
            size="mini"
            type = "text"
            @click="handleEditTr(scope.row.wzid,'2')">处理</el-button>
           <el-button
            v-if="scope.row.wz_state == 1"
           size="mini"
           type = "text"
           @click="handleEditTr(scope.row.wzid,'5')"
           >
             返回
           </el-button>
          <el-button
            v-if="scope.row.wz_state == 2"
            size="mini"
            type = "text"
            @click="handleEditTr(scope.row.wzid,'3')">完成</el-button>
         </template>
       </el-table-column>

     </el-table>
  </div>
</template>

<script>
export default {
  name: 'doDortorList',
  props: ['doDortorList', 'handleEdit'],
  data () {
    return {

    }
  },
  methods: {
    renderstate (state) {
      let text
      switch (state) {
        case '1':
          text = '已申请'
          break
        case '2':
          text = '处理中'
          break
        case '3':
          text = '已完成'
          break
        case '4':
          text = '已评价'
          break
        case '5':
          text = '已退回'
          break
      }
      return text
    },
    handleEditTr (id, type) {
      // console.log(id,type);
      this.$emit('handleEdit', id, type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.green_c{
    color:#0BAA1B;
  }
</style>
