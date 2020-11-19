<template>
  <div class="setHospitalD">
    <el-table
       :data="setHospitalD"
       style="width: 100%"
       border >
       <el-table-column
         prop="hospitalName"
         label="医院名称">
       </el-table-column>
       <el-table-column
         prop="hospitalType"
         label="合同类别可见"
        >
         <template slot-scope="scope">
           <span v-if="scope.row.hospitalType.indexOf(1) != -1">总公司版本劳动合同工 </span>
           <span v-if="scope.row.hospitalType.indexOf(2) != -1">地方版本劳动合同工 </span>
           <span v-if="scope.row.hospitalType.indexOf(3) != -1">劳务派遣人员</span>
         </template>
       </el-table-column>
       <el-table-column  width="180"  label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type = "text"
              @click="editHosi(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type = "text"
              @click="deleteHTr(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
     </el-table>
  </div>
</template>

<script>
export default {
  name: 'setHospitalD',
  props: ['setHospitalD', 'deleteHosTr', 'editHosiTr'],
  data () {
    return {

    }
  },
  methods: {
    deleteHTr (option) {
      this.$emit('deleteHosTr', option)
    },
    editHosi (option) {
      this.$emit('editHosiTr', option)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
