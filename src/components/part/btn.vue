<template>
  <div class="btn">
   <span @click ="btnE"> {{btnText}} </span>

  </div>
</template>

<script>
export default {
  name: 'btn',
  props: ['btnText', 'btnEvent'],
  data () {
    return {

    }
  },
  methods: {
    btnE () {
      this.$emit('btnEvent')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .btn{
  height: 32px;
  display: inline-block;
  padding: 0 12px;
  background: #F54F32;
  line-height: 32px;
  cursor: pointer;
  span{
    color: #fff;
    font-size:14px;
  }
 }
</style>
