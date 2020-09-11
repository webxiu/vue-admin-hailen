import { mount } from '@vue/test-utils';
<template>
  <canvas ref="canvas" width="600" height="400" style="border: 1px solid #000" />
</template>

<script>
export default {
  name: "BallMove",
  data() {
    return {
      ctx: null,
      canvas: null,
      offset: 1,
      colorArr: ["#f60", "#f0f", "00f", "#0f0"],
      balls: [],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ball(50, 300, 5, 5, 50, "#f60");
    this.ballMove();
  },
  methods: {
    // drawBalls() {
    //   for (let i = 0; i < 100; i++) {
    //     let radius = Math.random() * 4 + 1;
    //     let x = Math.random();
    //     let y = Math.random();
    //     let dx = (Math.random() - 0.5) * 2;
    //     let dy = (Math.random() - 0.5) * 2;
    //   }
    // },
    ballMove() {
      // requestAnimationFrame(arguments.callee);
      requestAnimationFrame(this.ballMove);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update();
    },
    ball(x, y, dx, dy, r, color) {
      this.ctx.x = x;
      this.ctx.y = y;
      this.ctx.dx = dx;
      this.ctx.dy = dy;
      this.ctx.r = r;
      this.ctx.color = color;
    },
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.ctx.x, this.ctx.y, this.ctx.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = this.ctx.color;
      this.ctx.fill();
      this.ctx.closePath();
    },
    update() {
      if (
        this.ctx.x + this.ctx.r > this.canvas.width ||
        this.ctx.x - this.ctx.r < 0
      ) {
        this.ctx.dx = -this.ctx.dx;
      }
      if (
        this.ctx.y + this.ctx.r > this.canvas.height ||
        this.ctx.y - this.ctx.r < 0
      ) {
        this.ctx.dy = -this.ctx.dy;
      }
      this.ctx.x += this.ctx.dx;
      this.ctx.y += this.ctx.dy;
      this.draw();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
