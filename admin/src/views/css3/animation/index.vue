<template>
  <div class="css-animation">
    <div class="title">css动画</div>
    <abc />
    <div class="title">环形进度条</div>
    <ProgressBar :size="50" :r="58" :percent="20" :trackColor="'rgb(111, 192, 6)'" :thumbColor="'rgb(0,0,255)'" /> 
    <div class="title">边框动画</div>
    <Animate1 />
    <div class="title">影子滑动</div>
    <ShadowMove />
    <div class="title">加载心形动画</div>
    <LoadingHeart />
    <div class="title">Css Loading</div> 
    <CssLoading />
    <div class="title">Three</div>
    <Three />
  </div>
</template>

<script>
import Animate1 from "./components/animate1";
import ProgressBar from "./components/ProgressBar";
import CssLoading from "./components/CssLoading"; 
import ShadowMove from "./components/shadow-move";
import LoadingHeart from "./components/LoadingHeart";
import Three from "./components/Three";
export default {
  name: "CssAnimation",
  components: {
    Animate1,
    ProgressBar,
    CssLoading, 
    ShadowMove,
    LoadingHeart,
    Three
  }
};
</script>

<style lang="scss" scoped>
.css-animation {
  padding-left: 20px;
  .title {
    line-height: 48px;
  }
}
</style>
