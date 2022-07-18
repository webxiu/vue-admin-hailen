<template>
  <div class="css-animation">
    <div>全局组件:</div>
    <abc />
    <!-- 边框动画 -->
    <Animate1 />
    <!-- 环形进度条 -->
    <ProgressBar :size="50" :r="58" :percent="20" :trackColor="'rgb(111, 192, 6)'" :thumbColor="'rgb(0,0,255)'" /> 
    <h3>Css Loading:</h3>
    <CssLoading />
  </div>
</template>

<script>
import Animate1 from './components/animate1'
import ProgressBar from './components/ProgressBar'
import CssLoading from './components/CssLoading'
export default {
  name: 'CssAnimation',
  components: { Animate1,ProgressBar ,CssLoading}
}
</script>

<style lang="scss" scoped> 
</style>

