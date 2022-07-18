<template>
  <div class="progress-box">
    <svg :width="size" :height="size" :viewBox="`0 0 ${r*2} ${r*2}`">
        <circle
          :r="r"
          :cx="r"
          :cy="r"
          :style="{stroke: trackColor}"
          fill="transparent"
          class="progress-bg"
        ></circle>
        <circle
          :r="r"
          :cx="r"
          :cy="r"
          fill="transparent"
          class="progress-bar"
          ref="bar"
          :style="{stroke: thumbColor}"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        ></circle>
      </svg> 
  </div>
</template>

<script>
export default {
  props:{
    size: { type: Number, default: 200 },
    percent: { type: Number, default: 0.5 }, 
    r: { type: Number, default: 50 },
    trackColor: { type: String, default: "rgb(111, 192, 6)" },
    thumbColor: { type: String, default: "rgb(0,0,255)" },
  }
  ,data(){
    return{
      dashArray: Math.PI * 2 * this.r,
      percent2:this.percent,
      timer: null
    }
  },
  mounted(){
    this.timer =  setInterval(() => {
      if (!this.$refs.bar.style) {
        return 
      } 
      this.percent2 ++;
      if(this.percent2>100){
        this.$refs.bar.style.transition = "none"
        this.percent2 = 0
      }else{
        this.$refs.bar.style.transition = "all 0.1s"
      } 
    }, 50);
  },
  computed:{
    dashOffset(){
      return (100 - this.percent2) * this.dashArray / 100
    }
  },
  destroyed(){
    clearInterval(this.timer) 
  }
}
</script>

<style lang="scss" scoped>
 
  svg {
    box-shadow: 0 0 1px 1px #f60;
  }

  circle {
    stroke-width: 10px;
    transform-origin: center;
  }
  .progress-bg {
    transform: scale(0.9); 
  }
  .progress-bar { 
    transform: rotate(-90deg) scale(0.9);
  }
</style>
