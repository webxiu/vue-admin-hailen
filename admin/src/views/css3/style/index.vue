<template>
  <div style="padding-left: 39px;">
    <div class="line">字节跳动:</div>
    <ByteDance />
    <div class="line">鼠标滚动左右滑动:</div>
    <VerticalScroll />
    <div class="line">进度:</div>
    <Progress />
    <div class="line">动态添加输入框:</div>
    <AddInput />
    <div class="line">Canvas验证码:</div>
    <AuthCode />
  </div>
</template>

<script>
import ByteDance from './components/ByteDance'
import VerticalScroll from './components/VerticalScroll'
import AddInput from './components/AddInput'
import AuthCode from './components/AuthCode'
import Progress from './components/Progress'
export default {
  name: 'CssStyle',
  components: { ByteDance, VerticalScroll, AddInput, AuthCode, Progress }
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
