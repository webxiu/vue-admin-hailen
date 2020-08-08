<template>
  <div class="abc">
    <div class="test">我是 src/packages 目录下面的全局组件: abc.vue</div>
  </div>
</template>

<script>
export default {
  name: 'Abc'
}
</script>

<style lang="scss">
.abc {
  .test {
    background: #ccc;
  }
}
</style>
