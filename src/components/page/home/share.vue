<template>
  <div class="share">
   <h1>{{title}}</h1>
   <div class="topcon">
      <div class="leftBtn">
      <setBtn :btnText = "addShareText" @btnEvent ="addShare"></setBtn>           
      </div>
    <!--   <div class="rightSec">
        <el-date-picker
          v-model ="getTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        > 
        </el-date-picker>
        <el-select v-model="typeValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
      </div> -->
   </div>
   
  <el-table 
  ref="multipleTable"
  :data="tableData"
  tooltip-effect="dark"
  style="width:98%"
  border
  >
    <el-table-column
    type="index"
    width="50"
    >
    </el-table-column>
   <el-table-column
   prop="title"
   label="标题"
   
   >    
   </el-table-column>
   <!--  <el-table-column
    prop="time"
    label="结束时间"
    width="180"
    >     
    </el-table-column> -->
    <el-table-column
    prop="text"
    label="类型"
    width="90"
    >  
    <template slot-scope="scope">        
      {{settype(scope.row.type,scope.row,scope)}}
    </template>
    </el-table-column>
     
    </el-table-column>
    <el-table-column
    prop="time"
    label="发布时间"
    width="180"
    >     
    </el-table-column>
   
    <el-table-column   label="操作"  width="180">  
      <template slot-scope="scope">
        <span class="btn blue_btn" @click="handleEdit(scope.row)">编辑</span>
        <span class="btn blue_btn" v-if ="scope.row.type == 2" @click="checkVote(scope.row)">查看投票 </span>
        <span class="btn red_btn" @click="delectEdit(scope.row)">删除</span>
      </template>   
    </el-table-column>
  </el-table>
    <!--弹框内容-->
    <el-dialog
      :title.sync="addtitle"
      :visible.sync="dialogFormVisible"
      width="70%"
      top = "10vh"
      center
      >
      <!-- 编辑信息的弹框 -->
     <div ref="addshareBox" v-if="ifEdit == 1">
      <div >
        <div class="xxx-box" v-if="ifAdd"> 
          <div class="xxx-box30">新增分享:</div>
          <div class="xxx-box70">
            <span 
              v-for="(item, index) in tabs" 
              :class="['tabBox', isTab == index ? 'isTab' : 'noTab']"
              @click="changeTab(index)"
              >{{item.text}}
            </span>  
          </div>                                             
        </div>
        <div   >
          <div class="xxx-box"> 
            <div class="xxx-box30">标题:</div>
            <div class="xxx-box70">
              <el-input v-model="shareTitle" placeholder="请填写"></el-input>
              
            </div>                                             
          </div>
          <div class="xxx-box"> 
            <div class="xxx-box30">封面:</div>
            <div class="xxx-box70">
              <div class="xxx-boxfile">
                <input type="file" @change="uploadFile($event)" multiple="multiple" accept="image/png,image/jpeg,image/gif,image/  jpg"/>
                <img :src="articlePic" v-if="articlePic">
                <span>仅支持上传 jpg、png格式</span>                
              </div>
               <p class="deletePicBtn" @click='deletePic'>删除</p>
            </div>                                          
          </div>
          <div class="xxx-box" v-if="isTab !== 2"> 
            <div class="xxx-box30">内容:</div>
            <div class="xxx-box70">
             <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
              
            </div>                                             
          </div>
        </div>
      </div>
      <div class="voteCon" v-if="isTab == 1"> 
        <div class="xxx-box" v-if=" isTab === 0 || isTab === 1 "> 
          <div class="xxx-box30">结束时间:</div>
          <div class="xxx-box70">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
                           
          </div>                                             
        </div>
        <div class="xxx-box"> 
          <div class="xxx-box70">
           <setBtn :btnText = "addQuestion" @btnEvent ="addQuestionE"></setBtn>
              <div class="questionBox  border ">
                <div  v-for="(item , index) in allQuestion" >   
                  <h1 class="qusTitle">问题 {{index+1}}                        
                    <span  @click="statehidden(index)" ref="arrow">收起</span>
                    <!-- <span @click="item.ifDevelop = true" v-else="item.ifDevelop">展开</span> -->
                    <span @click="deleteItem(item,index)">删除</span>
                  </h1> 
                  <div class="paddingL quesBox" ref="quesChild">                                         
                    <div class="xxx-box"> 
                    <div class="xxx-box30">标题:</div>
                    <div class="xxx-box70">
                      <el-input v-model="item.title" placeholder="请填写"></el-input>
                    </div>                                             
                    </div>  
                    <div class="xxx-box"> 
                      <div class="xxx-box30">类型:</div>
                      <div class="xxx-box70">
                        <span 
                          :class="['tabBox', item.type == 1 ? 'isTab' : 'noTab']"
                          @click="item.type = 1"
                          >单选
                        </span>  
                        <span 
                          :class="['tabBox', item.type == 2 ? 'isTab' : 'noTab']"
                          @click="item.type = 2"
                          >多选
                        </span>  

                      </div>                                         
                    </div>  
                      <ul>
                        <li v-for="(n , index1) in item.options ">               
                          <div class="xxx-box"> 
                           
                            <div class="xxx-box30">选项{{index1 + 1}}:</div>
                            <div class="xxx-box60">
                              <el-input v-model="n.label" placeholder="请填写"></el-input>
                              
                            </div>
                            <div class="xxx-box30 red_btn p_left2" @click="deleteCho(index,index1)" v-if="index1 >1">删除选项 </div>                                             
                          </div>  
                        </li>
                        <li>
                          <p style="padding-left: 85px; " class="blue_btn" @click="addCho (index)"> 添加选项</p>
                            
                          
                        </li>
                      </ul>
                      
                  </div>
                </div>
              </div>
          </div>                                             
        </div>
      </div>
      <div class="xxx-box" v-if="isTab == 2"> 
        <div class="xxx-box30">地址:</div>
        <div class="xxx-box70">
          <el-input v-model="content" placeholder="请填写外链如：www.picc.com"></el-input>
          
        </div>                                             
      </div>
      <div slot="footer" class="dialog-footer">
        <setBtn :btnText = "publishBtn" @btnEvent ="publish"></setBtn>      
      </div>
     </div>
     <!-- 查看投票情况的弹框 -->
     <div class="checkvoteBox" v-if="ifEdit == 2">
      <h1>{{shareTitle}}  </h1>
      <div v-for="(item, index) in allQuestion">
        <p class="secTitle">{{item.title}}</p>
        <ul class="">
          <li v-for=" (n , index1) in item.options">
            <p> {{n.label}}</p>
            <div class="leftInfo" >
              <el-progress :percentage="(setNum(n.ticket,item.ticketTotal))" :stroke-width="20" :text-inside="true" color="#F56C61" :format="format"></el-progress>             
            </div>
             <div class="rightInfo">{{n.ticket}} 票</div> 
          </li>
        </ul>
      </div>
     </div>
    </el-dialog> 
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
  
</template>

<script>
  import setBtn from '../../part/btn'
  import EditorBar from '../../airticle/WangEditor'
export default {
  inject:['reload'],
  name: 'share',
  data () {
    return {
     title:"悦分享",
     addtitle:"新增分享",
     addShareText:"新增分享",
     ifAdd:true,
     tableData:[],
     getTime:'',
     typeValue:'',
     ifEdit:'1',
     // options:[
     // {
     //  "value":"hhhh",
     //  "label":"444444"
     // }],
     tabs:[
      {
        text:'图文',
        code:"1"
      },
      {
        text:'投票',
        code:"2"
      },
      {
        text:'外链',
        code:"3"
      }
     ],
     isTab:"0",
     shareTitle:'',
     dialogFormVisible:false,
     articlePic:'',
      editor: {
        info: ''
      },
      isClear: false,
      endTime:"",
      content:"",
      addQuestion:"添加问题",
      changeId:'',
      allQuestion:[
      {
        title:"",
        type:"1",
        options:[
        {
          option:'',

        },
         {
          option:'',
        },
         {
          option:'',
         }
        ]
      }
      ],
      opData:[],
      publishBtn:"确认发布",
      wztext:'文章标题',
      wzTitle:'',
      currentPage:1,
      totalNum:1,
      hasdone:false
    }
  },
  components:{
    setBtn:setBtn,
    EditorBar:EditorBar
  },
  created(){
    var self = this;
    self.opData = self.allQuestion;
    let param = this.qs.stringify({
      page:self.currentPage
    })
    this.$axios.post('/api/queryShare',param).then(function(res){
      console.log(res.data,"res.data.list")
      self.tableData = res.data.list;
      self.totalNum = res.data.total;
    }).catch(function(err){
      console.log(err)
    });

  },
  computed:{

  },
  methods:{
     settype(option){
      if(option == 1){
        return  '图文';
      } else if(option == 2){
        return  '投票';
      } else if(option == 3){
        return '外链'
      }
      // console.log(option,"option",row,value)
    },
    setNum(n,m){
      console.log(n,m,"kkkkkkkkkkkkkkk");
      let reg = /^(.*\..{2}).*$/;
      if(m>0){
        let num = String(n/m*100).replace(reg ,"$1");
        return Number(num);
      } else {
        return 0
      }           
    },
    changeTab(index){
      let self = this;
      self.isTab = index;
    },
    uploadFile:function(e){
      let self = this;
      // console.log(e);
      this.articlePic = e.target.files[0]; //获取input的图片file值

      let param = new FormData(); // 创建form对象
      param.append('url', this.articlePic);//对应后台接收图片名
      // console.log(param);
      let config = {
        headers: {
          'Accept': 'application/json'              
        }
      }
      this.$axios.post('/api/uploadImage',param,config).then(function(res){
          // console.log(res.data.imageUrl[0],"tup[ian");
          self.articlePic = res.data.imageUrl[0];
         
        })
        .catch(function(error){
          console.log(error);
        });          
    },
    deletePic(){
      let self = this;
      self.articlePic = '';
    },
    statehidden(index){
      let self = this;
      // console.log(index,"展开或者收起");
      if (this.$refs.quesChild[index].style.display === 'none') {
        this.$refs.quesChild[index].style.display = 'block';
        this.$refs.arrow[index].innerText = "收起";
      } else {
        this.$refs.quesChild[index].style.display = 'none';
        this.$refs.arrow[index].innerText = "展开";
      }
    },
    addShare(){
      let self = this;
      // console.log("addShare");
      self.dialogFormVisible = true;
      self.ifAdd = true;
      self.addtitle = "新增分享";
      self.ifEdit = "1";
      self.isTab = 0;
      self.shareTitle = '';
      self.articlePic = '';
      self.editor.info = '';
      self.allQuestion = self.opData;
    },
    addQuestionE(){
      let self = this;
      // console.log('添加问题',self.allQuestion);
      self.allQuestion.push(
        {
        title:"",
        type:"1",
        options:[
        {
          option:'',
        },
         {
          option:'',
        },
         {
          option:'',
         }
        ]
      }
      )
    },  
    deleteItem(option,index){
      let self = this;
      // console.log(option,index);
      self.allQuestion.splice(index,1);
    },
    // 添加选项
    addCho(n,m){
      let self = this;
      // console.log(n,'addCho',self.allQuestion[n].options)
      self.allQuestion[n].options.push({
        option:'',
      })
    },
    deleteCho(n,m){
      let self = this;
      // console.log(self.allQuestion[n].options.length,m);
      if(self.allQuestion[n].options.length >2 ){
        self.allQuestion[n].options.splice(m,1);
      } else {
        self.$message({
          type: 'success',
          message: '选项不能少于2条!'
        });    
      }
      
    },
    publish(){
      let self = this;
      console.log(self.isTab,self.content)
      let contents ;
      if(self.isTab != 2 ){
        contents = self.editor.info;
      } else if(self.isTab == 2 ){
        contents = self.content;
      };
      let doneId =[];
      let hasDone = new Promise(function (resolve, reject) {

        for(let i =0; i<self.allQuestion.length ; i++){
          self.allQuestion[i].options.forEach(function(n,m){
            if(n.label == null || n.label == '' || n.label == 'undefined'){  
              // console.log(n,n.value)                         
              doneId.push(n.value)              
            } 
          })
        };
        if(self.isTab != 1 ) {
           resolve()
         } else if(doneId.length == 0 && self.endTime != ''){
           resolve()
         } else {
          self.$message({
            type: 'info',
            message: '请完善选项信息!'
          });
        }
      });
      hasDone.then(function (value) {
        // console.log(this,self)
        let param = self.qs.parse({
          type:self.isTab+1,
          title:self.shareTitle,
          url:self.articlePic,
          content:contents,
          endTime:self.endTime,
          questionModels: self.allQuestion,
        });
        if(self.ifAdd == true){
          self.$axios.post('/api/addShare',param).then(function(res){
            self.reload();
          }).catch(function(ret){
            console.log(ret)
          })
      
        } else if(self.ifAdd == false) {
          let paramdata = self.qs.parse({
            id :self.changeId,
            type:self.isTab+1,
            title:self.shareTitle,
            url:self.articlePic,
            content: contents,
            endTime:self.endTime,
            questionModels: self.allQuestion
          });
          // console.log(self.allQuestion,"self.allQuestion")
          self.$axios.post('/api/updateShare',paramdata).then(function(res){
            self.reload();
          }).catch(function(ret){
            
          })
        }
        // console.log(self.isTab+1,self.shareTitle,self.articlePic,self.editor.info,self.endTime,self.allQuestion,"allQuestion");
        }).catch(function (error) {
          console.log(error)
        })              
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let self = this;
      // console.log(`当前页: ${val}`,val);
      let param = this.qs.stringify({
        'page':val     
      }); 
      this.$axios.post('/api/queryShare',param).then(function(res){
        self.tableData = res.data.list;
      }).catch(function(ret){
        console.log(ret)
      })
    },
    //编辑 
    handleEdit(option){
      let self = this;
      self.dialogFormVisible = true;
      self.ifEdit = "1";
      self.ifAdd = false;
      self.addtitle = "修改内容";
      self.isTab = option.type -1;
      self.changeId = option.id;
      let param = this.qs.stringify({
        id: option.id,
        type:option.type
      })
      this.$axios.post('/api/getShare',param).then(function(res){
        // console.log(res.data,"res.data",);
        self.editor.info = res.data.content;
        self.shareTitle = res.data.title;
        self.endTime =  res.data.endTime;
        self.articlePic = res.data.url;
        self.content = res.data.content;
        if(res.data.type == 2){
           // console.log(res.data.questionModels,"res.data.questionModels")
          self.allQuestion = res.data.questionModels;
          // self.allQuestion.options.ifDevelop=true;
        } 
      }).catch(function(ret){
        console.log(ret)
      })
    },
    // 添加选项
    
    // 删除
    delectEdit(option){
      let self = this;
      // console.log(option);
      let param = this.qs.stringify({
        id:option.id,
        type:option.type     
      }); 
       this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/deleteShare',param).then(function(res){
         // console.log(res,'res');
         self.reload();        
          self.$message({
            type: 'success',
            message: '删除成功!'
          });                  
        }).catch(function(ret){
          console.log(ret,"ret");
          self.$message({
              type: 'error',
              message: '删除失败!'
            });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });    
    },
    format(){
       return percentage === 100 ? '满' : `${percentage}%`;
    },
    // 查看投票情况
    checkVote(option){
      let self = this;
      self.dialogFormVisible = true;
      self.ifEdit = "2";
      self.addtitle = "查看投票";
      // console.log(option ,'查看投票情况');
       let param = this.qs.stringify({
        id: option.id,
        type:option.type
      })
      this.$axios.post('/api/getShare',param).then(function(res){
        
        self.shareTitle = res.data.title;
        self.allQuestion = res.data.questionModels;
        

        // console.log(res.data.questionModels[0]);
        // for(let i =0; i<self.allQuestion.length; i++){
        //   // self.totalTicked += Number(dataArr[i].ticket);
        //  for(let n =0; n < self.allQuestion[i].options.length; n++){
        //   console.log(self.allQuestion[i].ticketTotal)
        //     self.allQuestion[i].options[n].ticket = self.allQuestion[i].options[n].ticket /self.allQuestion[i].ticketTotal*100
        //  }
        // }
       
       
      }).catch(function(ret){
        console.log(ret);
      })
    }

  }
}
</script>
<style  lang="less">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
   width: 100%;
}
 .el-input__icon{
  line-height: 34px;
 }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .share{
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 990px;
    .topcon{
      height: 60px;
      line-height: 60px;
      .leftBtn{
        width: 300px;
        float: left; 
      }
      .rightSec{
        width: 600px;
        height: 60px;
        float: right;
        margin-right: 26px;
        text-align: right;
      }
    }
    
  }

  .showwz{
    width: 900px;
    height: 500px;
    background: #fff;
  }
  .setthree{
    width: 100%;
    height: 36px;
    margin: 5px;
    float: left;
    margin-right:3.2% ;
  }
  .tabBox{
    display: inline-block;
    height: 34px;
    padding:0 30px;
    line-height: 34px;
    cursor: pointer;
  }
  .noTab{
    background:url(../../../assets/sel_f.png) no-repeat left 8px center ;
  }
  .isTab{
    background:url(../../../assets/sel_t.png) no-repeat left 8px center ;
  }
  .xxx-box{
    position:relative;
    clear: both;
    width: 100%;
    min-height:34px;
    margin:10px 0;
    .xxx-box30{
      width: 80px;
      height: 34px;
      float: left;
      line-height: 34px;
     
    }
    .xxx-box70{
      width: calc(100% - 90px);
      float: right;
      
    }   
    .xxx-box60{
      width: calc(100% - 180px);
      float: left;
    }
    
  }
    .border{
      border:1px solid #DDDDDD;
    }
    .paddingL{
      padding:0 20px;
    }
    .marginB{
      margin-bottom: 10px;
    }
  .xxx-boxfile{
     position:relative;
     width:120px;
     height:120px;
     background:url(../../../assets/z_add.png) no-repeat center center ;
     background-size:120px 120px;
     cursor: pointer;
     input[type=file] {
       position:absolute;
       opacity: 0;
       z-index: 1000;    
       width: 100%;
       height: 100%;
       top:0;
       left:0;
       bottom:0;
       right:0;
       cursor: pointer;
     }
     img{
       position:absolute;
       z-index: 2;
       width: 100%;
       height: 100%;
       top:0;
       left:0;
       bottom:0;
       right:0;
     }
     span{
       position:absolute;
       left: 130px;
       display: inline-block;
       width: 200px;
       bottom:0px;
     }
  }
.deletePicBtn{
  height: 22px;
  color:#FA5E5A;
  line-height: 22px;
 }
 .dialog-footer{
  clear: both;
  padding-left:95px;
  text-align: left;
  height: 50px;
  line-height: 50px;
 }
 .voteCon{
  position:relative;
  clear: both;
  width: 100%;
  padding-top:1px;
 }
 .questionBox{
  margin:10px 0;
  .qusTitle{
    height:34px;
    background:rgba(245,245,245,1);
    border:1px solid rgba(221,221,221,1);
    border-radius:2px 2px 0px 0px;
    line-height: 34px;
    font-size:14px;
    font-weight: normal;
    padding:0 10px;
    span{
      display: inline-block;
      float: right;
      padding:0 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }
 }
 h1{
  font-size:18px;
  font-weight:bold;
  line-height:30px;
  color: #333;
 }

 .secTitle{
  position:relative;
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  clear: both;
 }
 .checkvoteBox{
  position:relative;
  width: 100%;
  padding: 10px 20px 50px; 
  ul{
    position:relative;
    width: 100%;
    height:auto;
    li{
      position:relative;
      display: block;
      clear: both;
      .leftInfo{
        width: 85%;
        float: left;
      }
      .rightInfo{
        display: block;
        width: 10%;
        float: right;
      }
    }
  }
 }
</style>
