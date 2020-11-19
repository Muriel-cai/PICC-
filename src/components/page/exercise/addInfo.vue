<template>
  <div class="addInfo" dataId="ifNew" >
    <h1 class="staffTitle">员工资料</h1>
   <el-form ref="staffInfo" :model="staffInfo" :rules="rules" @input="handleInput"  label-width="110px">
    <el-form-item label-width="0" >
      <el-col :span="11" >
        <el-form-item label="姓名 " required prop="userName" >
          <el-input v-model="staffInfo.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="11" >
        <el-form-item label="性别"  prop="gender" required>
          <el-radio-group v-model="staffInfo.gender">
            <el-radio :label="1" value="1">男</el-radio>
            <el-radio :label="2" value="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label-width="0" >
      <el-col :span="11">
        <el-form-item label="手机号码 " required prop="phone">
          <el-input v-model="staffInfo.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="11">
        <el-form-item label="HR代码 " required prop="hrCode">
          <el-input v-model="staffInfo.hrCode"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label-width="0">
      <el-col :span="11">
        <el-form-item label="证件类型" required prop="idtype">
          <el-select v-model="staffInfo.idtype" placeholder="请选择证件类型">
            <el-option  v-for="(item ,index) in idtypeOptions" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="11">
        <el-form-item label="证件号码 " required prop="idcode">
          <el-input v-model="staffInfo.idcode"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label-width="0">
      <el-col :span="11">
        <el-form-item prop="birthday" label="出生日期 " required>
          <el-date-picker type="date" placeholder="选择日期" v-model="staffInfo.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="11">
        <el-form-item prop="entryDate" label="入职日期 " required>
          <el-date-picker type="date" placeholder="选择日期" v-model="staffInfo.entryDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="部门" required prop="userDept">
             <el-select v-model="staffInfo.userDept" placeholder="请选择部门">
              <el-option  v-for="(item ,index) in userDeptOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>

            </el-select>
            <!-- <el-input v-model="staffInfo.userDept"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col class="line" :span="11">
          <el-form-item label="职务情况" prop="userPost">
            <el-select v-model="staffInfo.userPost" placeholder="请选择职务类型">
              <el-option  v-for="(item ,index) in userPostOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>

            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0" >
        <el-col :span="11">
          <el-form-item label="学历" prop="education">
            <el-select v-model="staffInfo.education" placeholder="请选择学历">
              <el-option  v-for="(item ,index) in educationOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>

            </el-select>

          </el-form-item>
        </el-col>
        <el-col class="line" :span="11">
          <el-form-item label="国籍" required prop="nationality">
            <el-select v-model="staffInfo.nationality" placeholder="请选择">
              <el-option  v-for="(item ,index) in nationalityOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="户籍类型" required prop="householdType">
            <el-select v-model="staffInfo.householdType" placeholder="请选择" value-key="cateId">
              <el-option  v-for="(item ,index) in householdTypeOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>

            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="11">
          <el-form-item label="就业情况" required prop="epStatus">
            <el-select v-model="staffInfo.epStatus" placeholder="请选择">
              <el-option  v-for="(item ,index) in epStatusOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="证件有效时间" >
        <el-col :span="10">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="staffInfo.validityTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line setalign" :span="2" >-</el-col>
        <el-col :span="10">
          <el-form-item >
            <el-date-picker type="date" placeholder="选择截止时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="staffInfo.deadlineTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="民族" required prop="nation">
            <el-select v-model="staffInfo.nation" placeholder="请选择">
              <el-option  v-for="(item ,index) in nationOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="11">
          <el-form-item label="技术等级" prop="technicalGrade">
            <el-select v-model="staffInfo.technicalGrade" placeholder="请选择">
              <el-option  v-for="(item ,index) in technicalGradeOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="联系电话 ">
            <el-input v-model="staffInfo.telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="11">
          <el-form-item label="婚姻状态" prop="maritalStatus">
            <el-select v-model="staffInfo.maritalStatus" placeholder="请选择">
               <el-option  v-for="(item ,index) in maritalStatusOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>

    <el-form-item label-width="0">
      <el-col :span="11">
        <el-form-item label="合同类别" required prop="contractType">
          <el-select v-model="staffInfo.contractType" placeholder="请选择" value-key="cateId">
             <el-option  v-for="(item ,index) in contractTypeOption" :key="index" :label="item.cateName" :value="item.cateId"></el-option>
          </el-select>
          <!-- <el-input v-model="staffInfo.contractType"></el-input> -->
        </el-form-item>

      </el-col>
    </el-form-item>
</el-form>
  <h1 class="staffTitle">福利情况</h1>
  <el-form  :model="staffInfo"  label-width="110px">
    <el-form-item label-width="0" >
      <el-col :span="11">
        <el-form-item label="生日面次数" required
          :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
          <el-input v-model="staffInfo.birthdayNum"></el-input>
        </el-form-item>

      </el-col>
      <el-col :span="11">
        <el-form-item label="理疗次数" required
        :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
          <el-input v-model="staffInfo.phtNum"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label-width="0">
      <el-col :span="11">
        <el-form-item label="电话医生次数" required
        :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
          <el-input v-model="staffInfo.tpdoctorNum"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
  </el-form>
  <div class="subBtn">
    <span @click="submit('staffInfo')">确认添加</span>
  </div>
  </div>
</template>
<script>
import setBtn from '../../part/btn'
export default {
  name: 'addInfo',
  inject: ['reload'],
  props: ['ifNew'],
  data () {
    // 手机号验证
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rules, value, callback) => {
      console.log(rules, value, 'validatePhone')
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      setTimeout(() => {
        // console.log(phoneReg.test(Number(value)))
        if (!phoneReg.test(Number(value))) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 100)
    }
    // // 身份证号码验证
    // let idCodeReg= /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    // var validateIdCode = (rules,value,callback)=>{
    //    if(!value){
    //     return callback(new Error('号码不能为空'));
    //    } else if(!idCodeReg.test(value)){
    //     callback(new Error('格式错误'));
    //    } else {
    //     callback();
    //    }
    // };
    return {
      staffInfo: {
        userName: '',
        gender: '',
        phone: '',
        hrCode: '',
        idtype: '',
        idcode: '',
        birthday: '',
        entryDate: '',
        userDept: '',
        userPost: '',
        education: '',
        nationality: '',
        householdType: '',
        epStatus: '',
        validityTime: '',
        deadlineTime: '',
        nation: '',
        technicalGrade: '',
        telephone: '',
        maritalStatus: '',
        contractType: '',
        birthdayNum: '',
        phtNum: '',
        tpdoctorNum: ''

      },
      userId: '',
      // subText:'确认添加' ,
      householdTypeOption: [
        {
          cateId: '1',
          cateName: '农业户口'
        },
        {
          cateId: '2',
          cateName: '非农业户口'
        }
      ],
      contractTypeOption: [
        {
          cateId: '1',
          cateName: '总公司版本劳动合同工'
        },
        {
          cateId: '2',
          cateName: '地方版本劳动合同工'
        },
        {
          cateId: '3',
          cateName: '劳务派遣人员'
        }
      ],
      idtypeOptions: [],
      userDeptOption: [],
      userPostOption: [],
      educationOption: [],
      nationalityOption: [],
      epStatusOption: [],
      nationOption: [],
      technicalGradeOption: [],
      maritalStatusOption: [],
      choiceIds: [],
      rules: {
        userName: [
          { message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          {validator: validatePhone, message: '手机号格式不正确', trigger: 'blur'}
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        hrCode: [
          { required: true, message: '请填写，不能为空', trigger: 'blur' }
        ],
        idtype: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        idcode: [
          {required: true, message: '身份证格式不正确', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请填选', trigger: 'change'}
        ],
        entryDate: [
          {required: true, message: '请填选', trigger: 'change'}
        ],
        userDept: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        epStatus: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        nationality: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        householdType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        contractType: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    setBtn: setBtn
  },
  created () {
    let self = this
    this.$axios.post('/api/selectCategoryList').then(function (res) {
      self.idtypeOptions = res.data.data[0][100]
      self.userDeptOption = res.data.data[0][200]
      self.userPostOption = res.data.data[0][300]
      self.educationOption = res.data.data[0][400]
      self.nationalityOption = res.data.data[0][500]
      self.epStatusOption = res.data.data[0][600]
      self.nationOption = res.data.data[0][700]
      self.technicalGradeOption = res.data.data[0][800]
      self.maritalStatusOption = res.data.data[0][900]
      // console.log(self.idtypeOptions,"ppppp",self.educationOption )
    }).catch(function (ret) {
      console.log(ret)
    })
    if (!self.ifNew) {
      this.$nextTick(() => {
        this.$refs.staffInfo.resetFields()
        // 等弹窗里的form表单的dom渲染完在执行this.$refs.staffForm.resetFields()，去除验证
      })
    } else {
      this.getstaffData(self.ifNew, self)
    }
  },
  watch: {
    ifNew (val) {
      this.getstaffData(val, this)
    }
  },
  beforeUpdate () {},
  updated () {},
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    getstaffData (val, self) {
      let id = this.qs.stringify({
        'id': val
      })
      if (!val) {
        self.staffInfo = {}
      }
      this.$axios.post('/api/queryUserById', id).then(function (res) {
        console.log(res.data.data, '客服')
        if (res.data.data.gender === '女') {
          res.data.data.gender = 2
        } else if (res.data.data.gender === '男') {
          res.data.data.gender = 1
        }
        self.staffInfo = res.data.data
      }).catch(function (ret) {
        console.log(ret)
      })
    },
    submit (formName, e) {
      let self = this
      // this.$emit('onSubmit',this.staffInfo);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid, 'submit!')
          if (!self.ifNew) {
            this.$axios.post('/api/insertUser', this.qs.stringify(self.staffInfo)).then(function (res) {
              console.log(res.data.status)
              if (res.data.status === 200) {
                self.$message({
                  type: 'success',
                  message: '添加成功'
                })
                self.reload()
              } else if (res.data.status === 300) {
                self.$message({
                  type: 'success',
                  message: 'HR代码或者电话重复'
                })
              } else {
                self.$message({
                  type: 'success',
                  message: '添加失败，请检查数据！'
                })
              }
            }).catch(function (ret) {
              console.log(ret)
            })
          } else {
            self.userId = self.ifNew
            self.staffInfo.userId = self.userId
            this.$axios.post('/api/updateUser', this.qs.stringify(self.staffInfo)).then(function (res) {
              self.$message({
                type: 'success',
                message: '修改成功'
              })
              self.reload()
            }).catch(function (ret) {
              console.log(ret)
            })
          }
        } else {
          console.log('error submit!!', valid)
          this.$message({
            type: 'info',
            message: '信息有误'
          })
          return false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang= "less">
.el-select {
  display: inline;
}
.el-form-item {
    margin-bottom: 10px;
}
.el-form-item__error{
  padding-top: 0;
}
</style>
<style scoped  lang= "less">
  .setalign{
    text-align: center;
  }
.staffTitle{
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-size:18px;
  font-weight:bold;
  line-height:23px;
  color:rgba(51,51,51,1);
  opacity:1;
}
.subBtn{
  height: 50px;
  width: 100%;
  position:relative;
  margin-top: 20px;
  text-align: center;
  span{
    color: #fff;
    height: 32px;
    font-size:14px;
    cursor: pointer;
    display: inline-block;
    padding: 0 12px;
    background: #F54F32;
   line-height: 32px;
  }
 }
</style>
