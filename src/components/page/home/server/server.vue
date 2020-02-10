<template>
  <div class="server">
   <div class="tabBox">
     <div class="tabLi"  v-for="(item, index) in tabs" @click ="showTabCon(index,item.code)">
       <span :class="{tabactive : index+1 == step}">{{item.text}}</span>
       <!-- <router-link :class="{tabactive : index == step}" :to="item.link">{{item.text}}</router-link> -->
     </div>   
   </div>
   <div class="main">
    <div class="topcon">

      <setBtn :btnText="btnText" @btnEvent ="deriveData"></setBtn>
       参与时间：{{startTime}} 至 {{endTime}} 
      <span @click="clearData" >清空数据</span>     
      <span @click="setCode">设置参与时间和条件</span>      
      <span @click="setHospitalE" v-if="step == 2">设置医院</span>     
      <span @click="setNlist">不可参与名单设置</span>
    </div>    
     <treatmentD v-if="step == 1" :treatmentD ="severData" @deleteLxyList="deleteList"></treatmentD>
     <physicalD v-if="step == 2" :physicalD ="severData" @deleteTjList ="deleteList"></physicalD>
     <!-- <router-view></router-view> -->
     
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
    <!--弹框内容-->
    <el-dialog
      :title.sync= "dialogTitle"
      :visible.sync="dialogFormVisible"
      :width.sync = "dialogWidth"
      top = "10vh"
      center
      append-to-body
      >
      <div class="lxyBox" v-if="istime == true">
        <p >当前开启时间：{{startTime}} 至 {{endTime}}</p>
        <p >当前参与条件：{{CultureTime}} 前入职 </p>
        <p class="setHei">开启时间 ： </p>
        <div class="xxx-box"> 
          <el-date-picker
            v-model="newStartTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
            unlink-panels
            >
          </el-date-picker>
          <!-- <el-date-picker type="date" placeholder="请选择开启时间" v-model="newStartTime" ></el-date-picker> -->
        </div>
        <p class="setHei">参与条件（截至入职时间） ： </p>
        <div class="xxx-box"> 
          <el-date-picker type="date" placeholder="请选择参与时间" v-model="newEnterTime" style="width: 100%;"></el-date-picker>
        </div>
        <div v-if="step == 1">
          <p class="setHei">省内报名人数数量限制 ： </p>
          <el-input v-model="provincialNum" placeholder="请填写"></el-input>
          <p class="setHei">省外报名人数数量限制 ： </p>
          <el-input v-model="outProvinceNum" placeholder="请填写" ></el-input>
        </div>
        <div class="setbom clear">
          <setBtn :btnText = "saveBtn" @btnEvent ="saveTime"></setBtn>
        </div>
        

      </div>
      <!-- 不可参与名单设置 -->
      <div v-if="isnLimits">
        <div class="topcon">
          <setBtn :btnText="addNtext" @btnEvent ="addNlimits"></setBtn>
          <setBtn :btnText="deleteNtext" @btnEvent ="deleteNlimitsAll"></setBtn>
          <div class="formBox">
            <input type="file"  name="attence"  @change="changeFile($event)" ref="attenceInput" />
            <span >导入HR代码</span>
          </div>
          
          
        </div>
        <div>
          <nolimitsPenson :nolimitsPenson ="nolimitsPensonData" @deletelimitTr="deletelimitsTr"></nolimitsPenson>
        </div>
       <!--  分页-->
       <div class="block">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="nolimitCurrentPage"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total="nolimitTotalNum"
          >
        </el-pagination>
       </div>
      </div>
      <!-- 医院设置 -->
      <div v-if="issetH">
        <div class="topcon">
          <setBtn :btnText="addHostext" @btnEvent ="addHospital"></setBtn>
         
        </div>
        <div>
          <setHospital :setHospitalD ="setHospitalData" @deleteHosTr="deleteHosTr" @editHosiTr ="editHosiTr"></setHospital>
        </div>
      </div>
     </el-dialog> 
      <el-dialog
        :title.sync= "dialogTitle2"
        :visible.sync="dialogFormVisible2"
        width = "380px"
        top = "10vh"
        center
        append-to-body
      >
      <!-- 设置医院的第二层弹框 -->
      <div v-if="ishos && issetH">
        <el-form ref="hosForm" :model="hosForm" label-width="80px" >
          <el-form-item label="医院名称" prop="hospitalName">
            <el-input v-model="hosForm.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="合同类别" prop="type">
            <el-checkbox-group v-model="hosForm.type" color="#F54F32">
              <el-checkbox v-for='item in hosFormTypeOption' :label="item.value" :key="item.value" >{{item.name}}</el-checkbox>
             
            </el-checkbox-group>
          </el-form-item>
        </el-form>

      </div>
      <!-- 设置不可参与人员的二层弹框 -->
       <div v-if="issetN && isnLimits">
        <el-form ref="limitForm" :model="limitForm" label-width="70px" >
          <el-form-item label="HR代码:">
            <el-input v-model="limitForm.hrcode"></el-input>
          </el-form-item>
          
        </el-form>

      </div>
      <div style="clear: both;padding-left: 60px;">

       <el-button type="primary"  @click="saveHos">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
 import setBtn from '../../../part/btn'
 import treatmentD from './treatmentD'
 import physicalD from './physicalD'
 import nolimitsPenson from './nolimitsPenson'
 import setHospital from './setHospital'
 import { export2Excel } from '@/components/excel/unit'
export default {
  name: 'welfare',
  inject:['reload'],
  data () {
    return {
     btnText:'导出清单',
     dialogFormVisible:false,
     dialogFormVisible2:false,
     dialogTitle:"设置开启时间和条件",
     dialogTitle2:"添加医院",
     dialogWidth:"460px",
     startTime:'',
     endTime:'',
     CultureTime:'',
     newStartTime:[],
     newEnterTime:'',
     provincialNum:'',
     outProvinceNum:'',
     severData:[],
     hasAxios :false,
     currentPage:1,
     totalNum:1,
     step:1,
     istime:false,
     isnLimits:false,
     issetH:false,
     shopUrl:"www.123.com",
     saveBtn:"保存",
     tabs:[
       {
        text:'疗休养',
        code:1,
        link:'noodle'
       },
       {
        text:'体检',
        code:2,
        link:'physical'
       }
     ],
     hosFormTypeOption:[
     {
      name:'总公司版本劳动合同工',
      value:'1'
     },
     {
      name:'地方版本劳动合同工',
      value:'2'
     },
     {
      name:'劳务派遣人员',
      value:'3'
     }],
     addNtext:'添加不可参与人员',
     deleteNtext:'全部删除',
     nolimitsPensonData:[],
     addHostext:'添加医院',
     setHospitalData:[],
     ishos:true,
     issetN:false,
     ifNewHosAdd:'',
     hosForm:{ 
      id:'',
      hospitalName : '',
      type : []
     },
     limitForm:{
      hrcode:''
     },
     attenceFile: {},
     clearShow:'',
     nolimitTotalNum:1,
     nolimitCurrentPage:1
     
    }
  },
  components:{
    setBtn,
    treatmentD,
    physicalD,
    nolimitsPenson,
    setHospital
  },
  created(){
    let self = this;
    this.$options.methods.gettreatmentData(this);
  },
  methods:{
    showTabCon(index,code){
      let self = this;
      self.step = index +1;
      self.currentPage = 1 ;
      if(code == 1){
        this.$options.methods.gettreatmentData(this);
      } else if(code == 2){
        this.$options.methods.getphysicalData(this);
      }
    },
    // 获取疗休养的数据和时间
    gettreatmentData(that){
      let self = this;
      let param = that.qs.stringify({
        "page":that.currentPage,
        "limit":15
      });
      that.$axios.post('/api/queryLxyList',param).then(res =>{
        that.severData = res.data.data;
        that.totalNum = res.data.total;
      }).then(res=>{
        that.$axios.post('/api/queryCultureTime',
          that.qs.stringify({
            type:that.step
          })
        ).then(function(res){
          that.startTime = res.data.data.CultureStartTime;
          that.endTime = res.data.data.CultureEndTime;
          that.CultureTime = res.data.data.ParticipantTime;
          that.provincialNum = res.data.data.areaIn_count;
          that.outProvinceNum = res.data.data.areaOUt_count;
        }).catch(function(ret){
          console.log(ret)
        })
      })
    },
    // 获取体检的数据和时间
    getphysicalData(that){
      let self = this;
       let param = that.qs.stringify({
        "page":that.currentPage,
        "limit":15
      });
      that.$axios.post('/api/queryTijianList',param).then(res =>{
        // console.log(res.data);
        that.severData = res.data.data;
        that.totalNum = res.data.total;
      }).then(res=>{
        that.$axios.post('/api/queryCultureTime',
          that.qs.stringify({
            type:that.step
          })
        ).then(function(res){
          // console.log(res,"时间++++++++++++++++体检");
          that.startTime = res.data.data.CultureStartTime;
          that.endTime = res.data.data.CultureEndTime;
          that.CultureTime = res.data.data.ParticipantTime;
          // that.provincialNum = res.data.data.areaIn_count;
          // that.outProvinceNum = res.data.data.areaOUt_count;
        }).catch(function(ret){
          console.log(ret)
        })
      })
    },
    //修改时间
    setCode(){
      let self = this;
      // console.log(self.step,"self.step");
      self.dialogFormVisible = true;
      self.istime = true;
      self.isnLimits = false;
      self.issetH = false;
      self.dialogTitle = "设置开启时间和条件";
      self.dialogWidth ="480px";

      self.newStartTime.push(new Date(self.startTime));
      self.newStartTime.push(new Date(self.endTime));
      self.newEnterTime = new Date(self.CultureTime);
      // console.log(new Date(self.startTime),"startTime")
    },

    //保存
    saveTime(){
      let self = this;
      // console.log(self.newStartTime[0],self.newStartTime[1] ,"修改保存时间")
      this.$axios.post('/api/updateCultureTime',
        this.qs.stringify({
          type: self.step,
          CultureStartTime:self.newStartTime[0],
          CultureEndTime:self.newStartTime[1],
          ParticipantTime:self.newEnterTime,
          areaOutCount:self.outProvinceNum,
          areaInCount:self.provincialNum
        })
        ).then(res=>{
          // console.log(res,'保存时间');
          this.reload();
          self.dialogFormVisible = false;
        }).catch(ret=>{
          console.log(ret)
        })
    },
    // formatJson(filterVal, jsonData) {
    // 　　return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    //  导出清单

    deriveData(){
      let self = this;
      let headers = {
        'Content-Type': 'application/json'
      }; 
      let param = this.qs.stringify({
        "page":-1,
        "limit":-1
      });
      if(self.step == 1){
        console.log(111);
        const tHeader = [ '省内外', '员工姓名', '部门', '性别','HR代码','证件号码','手机号码','备注'];
    　  const filterVal = [ 'enroll_area', 'enroll_name', 'enroll_dept', 'enroll_gender','enroll_hrCode','enroll_idCard','enroll_phone','enroll_remark'];
        const excelText = '疗休养数据';
        this.$axios.post('/api/queryLxyList',param).then(res=>{
          // console.log('导出清单',res.data) ;
          export2Excel(tHeader,filterVal,res.data.data,excelText);
        }).catch(ret=>{
          console.log(ret)
        })

      } else if(self.step == 2){
        // console.log(2222);
        const tHeader = ['员工姓名', '部门', '性别','年龄','HR代码','婚姻状态','手机号','医院名称','提交时间'];
    　  const filterVal = [ 'tj_name', 'tj_dept', 'enroll_dept', 'tj_gender','tj_age','tj_hrCode','marital_id','tj_phone','hospital_name','pe_time'];
       const excelText = '体检数据';
        this.$axios.post('/api/queryTijianList',param).then(res=>{
          // console.log('导出清单',res.data) ;;
          export2Excel(tHeader,filterVal,res.data.data,excelText);
        }).catch(ret=>{
          console.log(ret)
        })
      }    
    },
    // 清空数据
    clearData(){
      let self = this;
      // console.log(self.step);
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(self.step == 1){
            this.$axios.post('/api/delLxyList').then(res=>{
              // console.log(res,"清空疗休养数据");
              this.$message({
                type: 'success',
                message: '清空疗休养数据成功!'
              });
              this.reload();
            }).catch(ret=>{
              console.log(ret)
            })   
          } else if(self.step == 2){
            this.$axios.post('/api/delTijianList').then(res=>{
              // console.log(res,"清空体检数据");
              this.$message({
                type: 'success',
                message: '清空体检数据成功!'
              });
              this.reload();
            }).catch(ret=>{
              console.log(ret)
            })   
          }        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
    },
    //删除疗休养和体检数据
    deleteList(id){
      let self = this;
      // console.log(id,"id");
      let url;
      if( self.step ==1){
        url ='api/deleteLxyUserById'
      } else if( self.step == 2){
        url ='api/deleteTjUserById'
      }
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post(url,this.qs.stringify({
              id:id
            })).then(res=>{
              // console.log(res,"shanc");
              this.$message({
                type: 'success',
                message: '删除数据成功!'
              });
              this.reload();
            }).catch(ret=>{
              console.log(ret)
            })          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
    },
    //设置不可参与名单
    setNlist(){
      let self = this;
      // console.log('设置不可参与名单');
      self.dialogFormVisible = true;
      self.dialogTitle ="设置不可参与名单";
      self.dialogWidth = "70%";
      self.isnLimits = true;
      self.istime= false;
      self.issetH =false;
      this.$axios.post('/api/queryNonParticipationUser',
        this.qs.stringify({
          nonType: self.step,
          page:1,
          limit:15
        })
        ).then(res =>{
          // console.log(res);
          self.nolimitsPensonData = res.data.data;
          self.nolimitTotalNum = res.data.total;

        }).catch(ret =>{
          // console.log(ret)
        })
      
    },
    // 删除不可设置人信息
    deletelimitsTr(option){
      let self = this;
      // console.log(option, "删除不可设置人信息");  
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/delNonLxyOrTjUser',
          this.qs.stringify({id:option})
          ).then(res =>{
          // console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功'
          }); 
          this.setNlist();
        }).catch(ret=>{

          // console.log(ret);
        })   
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });


        
    },
    addNlimits(){
      let self = this;
      self.dialogFormVisible2 = true;
      self.ifNewHosAdd = false;
      self.ishos = false;
      self.issetN = true;
      self.dialogTitle2 = "添加不可参与人员";
    }, 
    //批量导入HR code
    leadingFile(){
      
    },
    //删除全部不可参与人员
    deleteNlimitsAll(){
      let self = this;
        this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('api/delAllNonLxyOrTjUser',
            this.qs.stringify({
              non_type:self.step
            })
            ).then(res=>{
              // console.log(res);
              this.$message({
                type: 'success',
                message: '删除成功'
              }); 
              this.setNlist();
            }).catch(ret=>{
              console.log(ret)
            })
             
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });  
      
    },
    // 设置医院信息
    setHospitalE(){
      let self = this;
      self.dialogFormVisible = true;
      self.dialogTitle ="设置医院信息";
      self.dialogWidth = "70%";
      self.isnLimits = false;
      self.issetH = true;
      self.istime= false;
      this.$axios.post('/api/queryHospitalList').then(res=>{
        // console.log(res,"医院");
        self.setHospitalData = res.data.data;
      }).catch(ret=>{
        console.log(ret)
      })
    },
    //删除医院
    deleteHosTr(option){
      let self = this;
      // console.log(option,"删除医院111111");
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/deleteHospitalById',
            this.qs.stringify({
              id:option
            })
            ).then(res=>{
              // console.log(res);
              this.$message({
                type: 'success',
                message: '删除成功'
              }); 
              this.setHospitalE();
            }).catch(ret=>{
              console.log(ret)
            })
             
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
     
    },
    //编辑医院信息
    editHosiTr(option){
      let self = this;
      self.dialogFormVisible2 = true;
      self.ifNewHosAdd = false;
      self.hosForm.id = option.id;
      self.hosForm.hospitalName = option.hospitalName;
      self.hosForm.type = option.hospitalType.split(",");
      self.ishos = true;
      self.issetN = false;
      self.dialogTitle2 = "编辑医院信息";
      
    },
    //添加医院
    addHospital(){
      let self = this;
      self.ifNewHosAdd = true;
      self.dialogFormVisible2 = true;
      self.ishos = true;
      self.issetN = false;
      self.dialogTitle2 = "添加医院";

    },
    //保存 医院修改新增数据
    saveHos(){
      let self = this;
      if(self.ishos == true){
        if(self.ifNewHosAdd == true){
          this.$axios.post('/api/insertHospital',
            this.qs.stringify({
              hospitalName:self.hosForm.hospitalName,
              hospitalType:self.hosForm.type.join()
            })
            ).then(res=>{                          
              this.setHospitalE(); 
              self.dialogFormVisible2 = false;       
          }).catch(ret=>{
            console.log(ret);  
          });
        } else if(self.ifNewHosAdd == false){
          this.$axios.post('/api/updateHospital',
            this.qs.stringify({
              id:self.hosForm.id,
              hospitalName:self.hosForm.hospitalName,
              hospitalType:self.hosForm.type.join()
            })
            ).then(res=>{
            // console.log(res);
            this.setHospitalE();
              self.dialogFormVisible2 = false;
            
          }).catch(ret=>{
            console.log(ret); 
          });
        }

      } else if(self.issetN == true){
        // console.log(self.limitForm.hrcode)
        this.$axios.post('/api/addNonLxyOrTjUser',
          this.qs.stringify({
            hr_code: self.limitForm.hrcode,
            non_type:self.step 
          })
          ).then(res=>{
          // console.log(res.data,"添加疗休养",this);
          if(res.data.data  == '402'){
            this.$message({
              type: 'info',
              message: '无此员工,请查看hrcode'
            }); 
          } else if(res.data.data  == '401'){
            this.$message({
              type: 'info',
              message: '重复添加！'
            }); 
          } else if(res.data.data  == 'true'){
           
            this.$message({
              type: 'success',
              message: '添加成功！'
            }); 
            self.dialogFormVisible2 = false;
            
          } 
           this.setNlist();
          // 
        }).catch(ret =>{
          console.log(ret)
        })
      }
      
    },
      
    changeFile(e){
      let self = this;
      console.log(1111)
      let repeatRowNum = [] ;
      let wrongRowNum = [] ;
      let repeatText,wrongText;
      self.attenceFile = e.target.files[0];
      let param = new FormData(); //创建form对象
        param.append('non_type',self.step);
        param.append('filename',self.attenceFile);//通过append向form对象添加数据
      console.log(self.attenceFile,param,"[[[[[[[[[[[[");
      this.$alert('', '上传不可参与人员HRcode', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'              
            }
          }
          this.$axios.post('/api/imporNonLxyOrTjtExcel',
            param,
            config
            ).then(res=>{
               console.log(res.data.data,res.data.data.list,"++++++++++++++++++++上传");  
              if(res.data.data.falNum == 0){
                this.$message({
                  type: 'success',
                  message: '已全部成功导入，共'+ res.data.data.sucNum +"条！"
                }); 
              } else {
                res.data.data.list.forEach(function(i,n){
                  console.log(i.rowType,n,i.row);
                  if(i.rowType == 0){
                    repeatRowNum.push(i.row)
                  } else{
                    wrongRowNum.push(i.row);
                  }
                  // console.log(repeatRowNum,wrongRowNum,"wrongRowNum")
                });              
                console.log(repeatRowNum,wrongRowNum,"wrongRowNum");
                if(repeatRowNum.length > 0) {
                  repeatText = ' 第'+repeatRowNum.join(',')+'行重复！'
                } else{
                  repeatText =''
                }
                if(wrongRowNum.length > 0) {
                  wrongRowNum = ' 第'+wrongRowNum.join(',')+'行信息有误!'
                } else{
                  wrongRowNum =''
                }
                this.$message({
                  type: 'error',
                  message: 'excel中导入成功'+res.data.data.sucNum+'条，失败'+res.data.data.falNum+'条'  + repeatText + wrongRowNum ,
                  duration : 10000
                });  

              } ;
              this.$refs.attenceInput.value = null;                                    
            self.attenceFile ="";
            this.setNlist();
          }).catch(ret =>{
            console.log(ret);
            self.attenceFile ="";
          })
            }
          });
     
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);

    },
    handleCurrentChange(val) {
      let self = this;
      // console.log(`当前页: ${val}`,val,"handleCurrentChange1");
     self.currentPage = val;
      if(self.step == 1){
        this.$options.methods.gettreatmentData(this);
      } else if(self.step == 2){
        this.$options.methods.getphysicalData(this);
      }
      
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);

    },
    handleCurrentChange2(val) {
      let self = this;
      // console.log(`当前页: ${val}`,val,"handleCurrentChange21");
      self.nolimitCurrentPage = val;
      // console.log(val,"val")
      this.$axios.post('/api/queryNonParticipationUser',
        this.qs.stringify({
          "nonType": self.step,
          "page":val,
          "limit":10

        })
        ).then(res=>{
          // console.log(res.data,"buke 分页");
          self.nolimitsPensonData = res.data.data;
          self.nolimitTotalNum = res.data.total;
      }).catch(ret=>{
        console.log(ret)
      })
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #F54F32;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background:  #F54F32;
    border-color: #F54F32;
  }
  .el-button--primary {
    color: #FFF;
    background-color: #F54F32;
    border-color: #F54F32;
}
.el-button--primary:focus, .el-button--primary:hover {
    color: #FFF;
    background-color: #F54F32;
    border-color: #F54F32;
}
</style>
<style scoped lang="less">
.tabBox{
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom:1px solid  rgba(238,238,238,1);
  .tabLi{
    position:relative;
    display: inline-block;
    padding:0 30px;
    line-height: 50px;
    float: left;
    span{
      display: inline-block;
      height: 48px;
      line-height: 48px;
      color :#222222;
      font-size: 16px;
    }
    .tabactive{
       font-weight: bold;
       border-bottom: 2px solid #F54F32;
    }
  }
}
.main{
  position:relative;
  clear: both;
  width: 100%;
  height: auto;

}
.topcon{
    height: 50px;
    line-height: 50px;
    span{
      float: right;
      display: inline-block;
      padding:0 10px;
      cursor: pointer;
    }
  }
.lxyBox{
  padding:12px ;
  p{
    font-size: 14px;
    color:#333;
    line-height: 24px;

  }
  .setHei{
    padding:5px 0px;
  }
}
.setbom{
  position:relative;
  width: 100%;
  height: auto;
  margin: 20px 0px 0px;
}
.formBox{
  position:relative;
  display: inline-block;
  width: 160px;
  height: 50px;
  float: right;
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
