<template>
  <canvas
    class="auth-code-canvas"
    @click="drawPic"
    :width="width"
    :height="height"
  ></canvas>
</template>
<script>
export default {
  name: "SIdentify",
  props: {
    codeNum: { type: Number, default: 4 },
    width: { type: Number, default: 120 },
    height: { type: Number, default: 48 },
    fontSizeMin: { type: Number, default: 16 },
    fontSizeMax: { type: Number, default: 40 },
    backgroundColorMin: { type: Number, default: 180 },
    backgroundColorMax: { type: Number, default: 240 },
    colorMin: { type: Number, default: 50 },
    colorMax: { type: Number, default: 160 },
    lineColorMin: { type: Number, default: 40 },
    lineColorMax: { type: Number, default: 180 },
    dotColorMin: { type: Number, default: 0 },
    dotColorMax: { type: Number, default: 255 },
    getCode: { type: Function, default: () => {} }
  },
  mounted() {
    this.drawPic();
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    },
    drawPic() {
      let canvas = document.querySelector(".auth-code-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      );
      ctx.fillRect(0, 0, this.width, this.height);
      // 绘制文字
      this.drawText(ctx);
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    drawText(ctx) {
      let res = "";
      for (let i = 0; i < this.codeNum; i++) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
        ctx.font = `bold ${this.randomNum(
          this.fontSizeMin,
          this.fontSizeMax
        )}px 微软雅黑`;
        const sCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const len = sCode.length;
        const txt = sCode[this.randomNum(0, len)];
        // let x = (i + 0.5) * (this.width / (this.codeNum + 1));
        // let y = this.randomNum(this.fontSizeMax, this.height);
        // let deg = Math.random() - 0.5;
        let x = i * 20 + 15;
        let y = Math.random() * 8 + 30;
        let deg = this.randomNum(-30, 30);
        const size = this.randomNum(18, 40);
        ctx.save();
        ctx.translate(x, y);
        // ctx.font = size + "px SimHei";
        ctx.rotate((deg * Math.PI) / 180);
        // ctx.textBaseline = "bottom";
        ctx.fillText(txt, 0, 0);
        ctx.restore();
        res += txt;
      }
      this.getCode(res);
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(
          this.lineColorMin,
          this.lineColorMax
        );
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.width),
          this.randomNum(0, this.height)
        );
        ctx.lineTo(
          this.randomNum(0, this.width),
          this.randomNum(0, this.height)
        );
        ctx.stroke();
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.width),
          this.randomNum(0, this.height),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.auth-code-canvas {
  margin-top: 1px;
  margin-left: 8px;
}
</style>
