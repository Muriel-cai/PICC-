<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editorbar',
  data () {
    return {
      editor: null,
      info_: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value (val) {
      // 使用 v-model 时，设置初始值
      // console.log(val)
      this.editor.txt.html(val)
    }
  },
  mounted () {
    // this.seteditor();
    this.initEditor()
    // async (files, insert) => {
    //         /* files 是 input 中选中的文件列表 */
    //         let formData = new FormData()
    //         formData.append('file', files[0])
    //         let data = await this.upload(formData)
    //         /* upload方法是后台提供的上传图片的接口 */
    //         /* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中*/
    //         insert(data.imgUrl)
    //     }
  },
  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
      this.editor.customConfig.uploadImgServer = 'http://10.9.1.179:8082/api/uploadImage'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {'Accept': 'application/json'}// 自定义 header
      this.editor.customConfig.uploadFileName = 'url' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 3 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      // this.editor.config.hideLinkImg = true;
      // 配置菜单
      this.editor.customConfig.withCredentials = true // 跨域上传中如果需要传递 cookie 需设置 withCredentials
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log(xhr, editor, result, '图片上传成功回调结果')
          // 图片上传成功回调
          // console.log(this.$refs.editor,result.imageUrl[0]);

          // var url = result.url
          // insertImg(result.imageUrl[0])
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          insertImg(result.imageUrl[0])
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }

      // 创建富文本编辑器
      this.editor.create()
    },
    async initEditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor) /* 括号里面的对应的是html里div的id */
      /* 配置菜单栏 */
      this.editor.customConfig.menu = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.customConfig.uploadImgMaxLength = 3 // 限制一次最多上传 5 张图片 */
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 /*  //将图片大小限制为 3M 默认为5M /
        /* 自定义图片上传（支持跨域和非跨域上传，简单操作） */
      this.editor.customConfig.customUploadImg = async (files, insert) => {
        /* files 是 input 中选中的文件列表 */
        let formData = new FormData()
        formData.append('url', files[0])
        let config = {
          headers: {
            'Accept': 'application/json'
          }
        }
        let data = await this.$axios.post('/api/uploadImage', formData, config)
        // console.log(data.data.imageUrl[0],"cesssssssss")
        /* upload方法是后台提供的上传图片的接口 */
        /* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中 */
        insert(data.data.imageUrl[0])
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
        /* html 即变化之后的内容 */
      }
      this.editor.create() /* 创建编辑器 */
    }

  }
}
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 220px;
}
</style>
