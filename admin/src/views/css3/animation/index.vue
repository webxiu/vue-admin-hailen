<template>
  <div class="css-animation">
    <div class="title">css动画</div>
    <abc />
    <div>css旋转(太大已经注释)</div>
    <!-- <Rotate /> -->
    <div class="title">边框动画</div>
    <Animate1 />
    <div class="title">影子滑动</div>
    <ShadowMove />
    <div class="title">加载心形动画</div>
    <LoadingHeart />
    <div class="title">Three</div>
    <Three />
  </div>
</template>

<script>
import Animate1 from "./components/animate1";
// import Rotate from './components/rotate';
import ShadowMove from "./components/shadow-move";
import LoadingHeart from "./components/LoadingHeart";
import Three from "./components/Three";
export default {
  name: "CssAnimation",
  components: {
    Animate1,
    // Rotate,
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
