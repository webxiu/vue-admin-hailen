import tabbar from '@/components/Tabbar.vue';
<template>
  <div>
    <div>图片放大镜</div>
    <div id="div1" ref="div1">
      <div
        ref="small_pic"
        class="small_pic"
        @mouseover="mouseover"
        @mouseout="mouseout"
        @mousemove="mousemove"
      >
        <span ref="mark" class="mark"></span>
        <span ref="float_layer" class="float_layer" v-show="isShow"></span>
        <img
          ref="img"
          src="~@/assets/small.jpg"
          alt="妙味课堂 - 放大镜图片一"
          longdesc="http://www.miaov.com"
        />
      </div>

      <div ref="big_pic" class="big_pic" v-show="isShow">
        <img src="~@/assets/small.jpg" alt="妙味课堂 - 放大镜图片二" longdesc="http://www.miaov.com" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageMagnifier",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    mouseover() {
      this.isShow = true;
    },
    mouseout() {
      this.isShow = false;
    },
    mousemove(e) {
      const ev = e || event;
      let oDiv = this.$refs.div1;
      let oSmall = this.$refs.small_pic;
      let oFloat = this.$refs.float_layer;
      let oMark = this.$refs.mark;
      let oBig = this.$refs.big_pic;
      let oImg = this.$refs.img;
      let l =
        ev.clientX -
        oDiv.offsetLeft -
        oSmall.offsetLeft -
        oFloat.offsetWidth / 2;
      let t =
        ev.clientY -
        oDiv.offsetTop -
        oSmall.offsetTop -
        oFloat.offsetHeight / 2;

      console.log("oDiv", l, t);
      if (l < 0) {
        l = 0;
      } else if (l > oMark.offsetWidth - oFloat.offsetWidth) {
        l = oMark.offsetWidth - oFloat.offsetWidth;
      }
      console.log("l", l);

      if (t < 0) {
        t = 0;
      } else if (t > oMark.offsetHeight - oFloat.offsetHeight) {
        t = oMark.offsetHeight - oFloat.offsetHeight;
      }

      oFloat.style.left = l + "px";
      oFloat.style.top = t + "px";

      let percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
      let percentY = t / (oMark.offsetHeight - oFloat.offsetHeight);

      oImg.style.left =
        -percentX * (oImg.offsetWidth - oBig.offsetWidth) + "px";
      oImg.style.top =
        -percentY * (oImg.offsetHeight - oBig.offsetHeight) + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
#div1 {
  width: 200px;
  height: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  position: relative;
}

#div1 .small_pic {
  width: 200px;
  height: 200px;
  background: #eee;
  position: relative;
}
#div1 .float_layer {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  background: #f0f;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
#div1 .mark {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 0px;
  background: red;
  opacity: 0;
}
#div1 .big_pic {
  position: absolute;
  top: -1px;
  left: 356px;
  width: 250px;
  height: 250px;
  overflow: hidden;
  border: 2px solid #ccc;
}
#div1 .big_pic img {
  position: absolute;
  top: -30px;
  left: -80px;
}
</style>
