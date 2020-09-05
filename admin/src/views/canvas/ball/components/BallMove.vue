import { mount } from '@vue/test-utils';
<template>
  <canvas ref="canvas" width="400" height="400" style="border: 1px solid #000" />
</template>

<script>
export default {
  name: 'BallMove',
  data() {
    return {
      ctx: null,
      canvas: null,
      offset: 1
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.ball(50, 300, 5, 5, 50, '#f60')
    this.ballMove()
  },
  methods: {
    ballMove() {
      // requestAnimationFrame(arguments.callee);
      requestAnimationFrame(this.ballMove)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.update()
    },
    ball(x, y, dx, dy, r, color) {
      this.ctx.x = x
      this.ctx.y = y
      this.ctx.dx = dx
      this.ctx.dy = dy
      this.ctx.r = r
      this.ctx.color = color
    },
    draw() {
      this.ctx.beginPath()
      this.ctx.arc(this.ctx.x, this.ctx.y, this.ctx.r, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = this.ctx.color
      this.ctx.fill()
      this.ctx.closePath()
    },
    update() {
      if (
        this.ctx.x + this.ctx.r > this.canvas.width ||
        this.ctx.x - this.ctx.r < 0
      ) {
        this.ctx.dx = -this.ctx.dx * Math.random()
      }
      if (
        this.ctx.y + this.ctx.r > this.canvas.height ||
        this.ctx.y - this.ctx.r < 0
      ) {
        this.ctx.dy = -this.ctx.dy
      }
      this.ctx.x += this.ctx.dx
      this.ctx.y += this.ctx.dy
      this.draw()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
