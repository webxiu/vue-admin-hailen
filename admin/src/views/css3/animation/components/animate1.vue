<template>
  <div class="item-box active">
    <div class="content" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.item-box {
  margin-bottom: 46px;
  padding: 2px;
  width: 261px;
  height: 167px;
  background: #c9afaf;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  &.active {
    background-image: -webkit-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 255) 50%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0) 75%,
      rgba(255, 255, 255, 0)
    );
    background-size: 10px 10px;
    animation: move 0.8s linear;
    animation-iteration-count: infinite;
  }
}
@keyframes move {
  0% {
    background-position: 0px 0px;
  }
  50% {
    background-position: 0px 5px;
  }
  100% {
    background-position: 0px 10px;
  }
}
</style>
