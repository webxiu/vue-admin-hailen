<template>
  <div class="css-loading">
  <div class="dot-container">
    <div class="dots" />
  </div> 
    </div> 
</template>

<script> 
export default {
  name: 'CssLoading', 
}
</script>

<style lang="scss" scoped>
$base-bg: #f3f3f3;
$bgColor: #fff;
$n: 8;
$steps: 12;
$framePercent: 100%/ ($steps);
$blobsBg: ();
$xPos: 50%;
$yPos: 50%;
$bgPosList: 40% 50%, 43% 43%, 50% 40%, 57% 43%, 60% 50%, 57% 57%, 50% 60%,
  43% 57%;
@for $i from 0 to $n {
  $blobsBg: $blobsBg, var(--gradient);
}

@keyframes animate {
  0% {
    background-position: 50%;
  }
  @for $j from 1 through $n {
    $finalPos: null;
    @for $x from 1 through $n {
      @if $x <=$j {
        $finalPos: append($finalPos, nth($bgPosList, $x), comma);
      } @else {
        $finalPos: append($finalPos, 50%, comma);
      }
    }
    #{$framePercent * $j} {
      background-position: $finalPos;
    }
  }
  100% {
    background-position: $bgPosList;
  }
}

// body,
// html {
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// html {
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(rgba($base-bg, 0.9), rgba($base-bg, 0.9)),
//     url(https://images.unsplash.com/reserve/0y86gz4sT4O2ZQJIRWXE_IMG_0476.JPG?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=);
//   background-color: $base-bg;
//   background-size: cover;
//   background-blend-mode: normal, luminosity;
//   mix-blend-mode: multiply;
// }
.css-loading{
  position: relative;
  height: 600px;
}
.dot-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  overflow: hidden;
  animation: rotate 6s linear infinite;
}

.dots {
  width: 950px;
  height: 950px;
  --pos: 50% 50%;
  --gradient: radial-gradient(black 67%, transparent 68%);
  background: linear-gradient(#14fff4, #ef00ff);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:after {
    margin: 0;
    height: 100%;
    border-radius: 50%;
    display: block;
    box-shadow: 0 0 0 2rem $bgColor;
    background: $blobsBg $bgColor;
    background-size: 2.5rem 2.5rem, 3rem 3rem;
    background-position: 50%;
    background-repeat: no-repeat;
    filter: blur(8px) contrast(9);
    mix-blend-mode: lighten;
    animation: animate 4s cubic-bezier(0.38, -0.08, 0.42, 2.04) alternate
      infinite;
    transform: translateZ(0);
    content: "";
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>

