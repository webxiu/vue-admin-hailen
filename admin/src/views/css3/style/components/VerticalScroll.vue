<template>
  <div
    id="out"
    ref="out"
    style="width:500px;height:500px;overflow:auto;background: #ccc"
    @wheel="wheel"
  >
    <div id="inside" style="width:1000px;height:1000px;overflow-x:auto">
      <h1>很长的文字 ==很长的文字 ==很长的文字 ==很长的文字 ==很长的文字 ==很长的文字 ==鼠标滚动左右滑动</h1>
    </div>
  </div>
</template>

<script>
export default {
  // 鼠标滚动左右滚动
  name: 'VerticalScroll',
  data() {
    return {}
  },
  methods: {
    wheel(e) {
      e.preventDefault()
      var step = 50
      if (e.deltaY < 0) {
        this.$refs.out.scrollLeft -= step
      } else {
        this.$refs.out.scrollLeft += step
      }
      console.log('鼠标滚动左右滚动')
    }
  }
}
</script>

<style>
</style>
