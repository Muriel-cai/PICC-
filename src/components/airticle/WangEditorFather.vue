<template lang="html">
  <div>
    <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
    <div class="sureBtn" @click="sure">
      确定发布
    </div>
  </div>
</template>

<script>

import EditorBar from './WangEditor'
export default {
  data () {
    return {
      editor: {
        info: ''
      },
      isClear: false
    }
  },
  created(){
    console.log(this.editor.info,'jj')
  },
  components: {
    EditorBar
  },
  methods:{
    sure(){
      // console.log(11111,this.editor.info);
    }
  }
}
</script>