
<template>
  <div class="abc">{{ msg }}</div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      msg: 'Detail 组件==='
    }
  }
}
</script>

<style scoped>
.abc{
  background: #f0f;
}
</style>
