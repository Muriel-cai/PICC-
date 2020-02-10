<template>
  <div class="staffL">
    
  </div>
</template>

<script>
export default {
  name: 'staffL',
     
  props:['staffLData','handleEditL','delectEditL','choiceEditL','lableName','getName'],
  data () {
    return {
     
    }
  },
  methods:{
    handleEdit(id){
      this.$emit('handleEditL',id);
    },
    delectEdit(id){
      this.$emit('delectEditL',id);
    },
    choiceEdit(id){
      this.$emit('choiceEditL',id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
