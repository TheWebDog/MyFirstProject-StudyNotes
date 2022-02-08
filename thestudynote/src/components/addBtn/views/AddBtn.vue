<template>
  <div class="addbtn" @click="goAdd">
    <div class="hoverANDactive">+</div>
  </div>
</template>

<script>
export default {
  name: "AddBtn",
  methods :{
    goAdd(){
      this.$router.push('/writePage')
    }
  }
}
</script>