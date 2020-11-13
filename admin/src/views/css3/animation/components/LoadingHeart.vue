import * as child from 'child_process';
<template>
  <div class="wrap">
    <div class="loading-heart">
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 150px;
  background: #eee;
  height: 300px;
}
.loading-heart {
  display: flex;
  .bar {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: 0 10px;
  }
  .bar:nth-child(1) {
    background-color: red;
    animation: love1 3s 0s infinite;
  }
  .bar:nth-child(2) {
    background-color: darkturquoise;
    animation: love2 3s 0.2s infinite;
  }
  .bar:nth-child(3) {
    background-color: darksalmon;
    animation: love3 3s 0.4s infinite;
  }
  .bar:nth-child(4) {
    background-color: deeppink;
    animation: love4 3s 0.6s infinite;
  }
  .bar:nth-child(5) {
    background-color: yellow;
    animation: love5 3s 0.8s infinite;
  }
  .bar:nth-child(6) {
    background-color: deeppink;
    animation: love4 3s 1s infinite;
  }
  .bar:nth-child(7) {
    background-color: darksalmon;
    animation: love3 3s 1.2s infinite;
  }
  .bar:nth-child(8) {
    background-color: darkturquoise;
    animation: love2 3s 1.4s infinite;
  }
  .bar:nth-child(9) {
    background-color: red;
    animation: love1 3s 1.6s infinite;
  }

  // 定义动画
  @keyframes love1 {
    30%,
    50% {
      height: 60px;
      transform: translateY(-30px);
    }
    70%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love2 {
    30%,
    50% {
      height: 125px;
      transform: translateY(-60px);
    }
    70%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love3 {
    30%,
    50% {
      height: 160px;
      transform: translateY(-75px);
    }
    70%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love4 {
    30%,
    50% {
      height: 180px;
      transform: translateY(-60px);
    }
    70%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love5 {
    30%,
    50% {
      height: 200px;
      transform: translateY(-45px);
    }
    70%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
}
</style>
