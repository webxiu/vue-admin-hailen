
<template>
  <div style="padding-left: 39px;">
    <div class="line">画板:</div>
    <CanvasDrawing />
    <div class="line">画图:</div>
    <CanvasPaint />
  </div>
</template>

<script>
import CanvasDrawing from './components/CanvasDrawing'
import CanvasPaint from './components/CanvasPaint'
export default {
  name: 'CanvasAnimate',
  components: { CanvasDrawing, CanvasPaint }
}
</script>

<style lang="scss" scoped>
.line {
  border-top: 1px solid #ccc;
  padding-top: 15px;
  margin: 15px 0;
  &:first-child {
    border-top: none;
  }
}
</style>
