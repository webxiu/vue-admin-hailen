<template>
  <div class="shadow-move">
    免费直播
  </div>
</template>

<script>
export default {
  name: "ShadowMove"
};
</script>

<style lang="scss" scoped>
.shadow-move {
  width: 144px;
  height: 56px;
  font-size: 20px;
  line-height: 56px;
  background-size: 100% 100%;
  color: #fff;
  font-weight: 700;
  border-radius: 5px;
  background-color: #f7415e;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 144px;
    height: 56px;
    overflow: hidden;
    z-index: 6;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    animation: shadowMove 1.5s ease-out infinite forwards;
  }
}
@keyframes shadowMove {
  from {
    // or left: -250px;
    margin-left: -250px;
  }
  to {
    margin-left: 250px;
  }
}
</style>
