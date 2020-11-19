<template>
  <div class="notice">
    <h1 class="title">{{title}}</h1>
    <div class="btnBox">
      <setBtn :btnText = "addBtn" @btnEvent ="addNotice"></setBtn>
    </div>
    <!--表格数据-->
    <div>
      <el-table
        :data="noticeData"
        style="width: 100%"
        border center >
        <el-table-column
         type="index"
         width="60" center>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="150">
           <template slot-scope="scope">
             {{settype(scope.row.type,scope.row,scope)}}
           </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="time"
          width="260"
          label="发布时间">
        </el-table-column>
        <el-table-column  width="120"  label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type = "text"
            @click="handleEdit(scope.row)">编辑</el-button>
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
        title="新增公告"
        :visible.sync="dialogFormVisible"
        width="70%"
        top = "10vh"
        center
        >
        <div>
          <div class="xxx-box">
            <div class="xxx-box30">公告类型:</div>
            <div class="xxx-box70">
              <span
                v-for="(item, index) in tabs"
                :key="index"
                :class="['tabBox', isTab == index+1 ? 'isTab' : 'noTab']"
                @click="isTab = index+1 "
                >{{item.text}}
              </span>
            </div>
          </div>
          <div   >
            <div class="xxx-box">
              <div class="xxx-box30">标题:</div>
              <div class="xxx-box70">
                <el-input v-model="articleTitle" placeholder="请填写"></el-input>

              </div>
            </div>
            <div class="xxx-box">
              <div class="xxx-box30">封面:</div>
              <div class="xxx-box70">
                <div class="xxx-boxfile">
                  <input type="file" @change="uploadImg($event)" multiple="multiple" accept="image/png,image/jpeg,image/gif,image/  jpg"/>
                  <img :src="articlePic" v-if="articlePic">
                  <span>仅支持上传 jpg、png格式</span>
                </div>
                 <p class="deletePicBtn" @click='deletePic'>删除
                    <!-- <span class="means">资料库</span> -->
                 </p>
              </div>
            </div>
            <div class="xxx-box" v-if="isTab == 2 || isTab == 4">
              <div class="xxx-box30">上传附件:</div>
              <div class="xxx-box70">
                  <input type="file" @change="uploadFile($event)" multiple="multiple" />
                  <p class="lsinput">{{fileName}}</p>

              </div>
            </div>
            <div class="xxx-box" v-if="isTab == 1">
              <div class="xxx-box30">内容:</div>
              <div class="xxx-box70">
               <editor-bar  v-model="editor.info" ></editor-bar>

              </div>
            </div>
          </div>
        </div>
        <div class="xxx-box" v-if="isTab == 3">
          <div class="xxx-box30">地址:</div>
          <div class="xxx-box70">
            <el-input v-model="otherLink" placeholder="请填写外链如：www.picc.com"></el-input>

          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <setBtn :btnText = "publishBtn" @btnEvent ="publish"></setBtn>

        </div>
      </el-dialog>
  </div>
</template>

<script>
import setBtn from '../../part/btn'
import EditorBar from '../../airticle/WangEditor'

export default {
  name: 'notice',
  inject: ['reload'],
  data () {
    return {
      title: '悦公告',
      addBtn: '新增公告',
      isnew: true,
      editId: '',
      noticeData: [],
      currentPage: 1,
      totalNum: 1,
      isSingle: false,
      dialogFormVisible: false,
      isTab: 1,
      articleTitle: '',
      articlePic: '',
      haspic: false,
      otherLink: '',
      attenceFile: {},
      fileUrl: '',
      fileName: '',
      tabs: [
        {
          text: '图文',
          type: '1'
        },
        {
          text: 'pdf',
          type: '2'
        },
        {
          text: '外链',
          type: '3'
        },
        {
          text: '附件',
          type: '4'
        }
      ],
      editor: {
        info: ''
      },
      isClear: false,
      publishBtn: '确认发布'
    }
  },
  components: {
    setBtn: setBtn,
    EditorBar
  },
  created () {
    let self = this
    let param = this.qs.stringify({
      'page': 1
    })
    // console.log(param,"param")
    this.$axios.post('/api/queryAnnouncement', param).then(function (res) {
      // console.log(res.data,"pppppp");
      self.noticeData = res.data.list
      self.totalNum = res.data.total
    }).catch(function (ret) {
      console.log(ret)
    })
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    articlePic: function (val) {
      this.haspic = true
      // console.log(1000000,val)
    }
  },
  methods: {
    addNotice () {
      let self = this
      self.dialogFormVisible = true
      self.isnew = true
    },
    handleEdit (option) {
      let self = this
      // console.log(option);
      self.dialogFormVisible = true
      self.isnew = false
      this.$axios.post('/api/getAnnouncement', this.qs.stringify({
        id: option.id
      })).then(res => {
        console.log(res.data, 'ppppppppppppppp')
        self.editId = res.data.id
        self.isTab = res.data.type
        self.articleTitle = res.data.title
        self.articlePic = res.data.url
        self.editor.info = res.data.content
        self.otherLink = res.data.content
        self.fileName = res.data.fileName
        self.fileUrl = res.data.content
      }).catch(ret => {
        console.log(ret)
      })
    },
    publish () {
      let self = this
      self.dialogFormVisible = false
      let contents
      // console.log(1111,self.isTab,"self.isTab");
      if (self.isTab === 1) {
        contents = self.editor.info
      } else if (self.isTab === 2 || self.isTab === 4) {
        contents = self.fileUrl
      } else if (self.isTab === 3) {
        contents = self.otherLink
      }

      if (self.isnew === true) {
        let param = this.qs.stringify({
          'type': self.isTab,
          'title': self.articleTitle,
          'url': self.articlePic,
          'content': contents
        })
        this.$axios.post('/api/addAnnouncement', param).then(function (res) {
          // console.log(res);
          self.reload()
        }).catch(function (ret) {
          console.log(ret)
        })
      } else if (self.isnew === false) {
        // console.log(self.editId,self.editor.info,self.isTab,self.articleTitle ,self.articlePic,contents)
        let param = this.qs.stringify({
          'id': self.editId,
          'type': self.isTab,
          'title': self.articleTitle,
          'url': self.articlePic,
          'content': contents
        })
        this.$axios.post('/api/updateAnnouncement', param).then(function (res) {
          // console.log(res);
          self.reload()
        }).catch(function (ret) {
          console.log(ret)
        })
      }
    },
    settype (option) {
      if (option === 1) {
        return '图文'
      } else if (option === 2) {
        return 'pdf'
      } else if (option === 3) {
        return '外链'
      } else if (option === 4) {
        return '附件'
      }

      // console.log(option,"option",row,value)
    },
    // 上传封面
    uploadImg: function (e) {
      let self = this
      // console.log(e);
      this.articlePic = e.target.files[0] // 获取input的图片file值

      let param = new FormData() // 创建form对象
      param.append('url', this.articlePic)// 对应后台接收图片名
      // console.log(param);
      let config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      this.$axios.post('/api/uploadImage', param, config).then(function (res) {
        // console.log(res.data.imageUrl[0],"tup[ian");
        self.articlePic = res.data.imageUrl[0]
        this.reload()
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 上传附件
    uploadFile (e) {
      let self = this
      // console.log(e);

      self.attenceFile = e.target.files[0]
      self.fileName = e.target.files[0].name
      let param = new FormData() // 创建form对象
      param.append('file', self.attenceFile)// 通过append向form对象添加数据
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // console.log(self.attenceFile,param);
      this.$axios.post('/api/uploadFile',
        param,
        config
      ).then(res => {
        // console.log(res.data.data,'文件上传');
        self.fileUrl = res.data.data.fileUrl
        self.fileName = res.data.data.fileName
        self.attenceFile = ''
      }).catch(ret => {
        console.log(ret)
        self.attenceFile = ''
      })
    },

    deleteTr (option, n) {
      let self = this
      // console.log(option);
      let param = this.qs.stringify({
        'id': option
      })
      this.$confirm('此操作将永久清除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/deleteAnnouncement', param).then(function (res) {
          // console.log(res,'res');
          self.reload()
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(function (ret) {
          // console.log(ret,"ret");
          self.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deletePic () {
      let self = this
      self.articlePic = ''
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      let self = this
      // console.log(`当前页: ${val}`,val);
      let param = this.qs.stringify({
        'page': val
      })
      this.$axios.post('/api/queryAnnouncement', param).then(function (res) {
        // console.log(res.data,"pppppp");
        self.noticeData = res.data.list
      }).catch(function (ret) {
        console.log(ret)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .notice{
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
 .con{
  width: 500px;
  height: 500px;
  background: pink;
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
    position:relative;
    z-index: 1;
    width: calc(100% - 90px);
    float: right;

  }
  input[type =file]{
    position:relative;
    opacity: 0;
    z-index: 5;
  }
  .lsinput{
    position:absolute;
    z-index:1;
    width: 100%;
    height: 34px;
    padding:10px;
    left:0;right: 0;
    top:0;right:0;
    border:1px solid #DCDFE6;
    line-height: 14px;
    // background:pink;
  }
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
  span{
    float: right;
    padding:0 10px;
    color:#2580E8;
    cursor: pointer;
  }
 }
 .dialog-footer{
  clear: both;
  padding-left:95px;
  text-align: left;
  height: 50px;
  line-height: 50px;
 }
</style>
