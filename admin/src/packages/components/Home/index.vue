
<template>
  <div class="abc">{{ msg }}</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Home 组件'
    }
  }
}
</script>

<style scoped>
.abc {
  background: #f60;
}
</style>
