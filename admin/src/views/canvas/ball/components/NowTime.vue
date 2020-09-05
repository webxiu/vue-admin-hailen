<template>
  <canvas ref="canvas" width="400" height="400">当前浏览器不支持Canvas</canvas>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      ctx: null,
      canvas: null,
      windowWidth: 800,
      windowHeight: 200,
      RADIUS: 4,
      MARGIN_TOP: 60,
      MARGIN_LEFT: 20,
      // 时间矩阵
      digit: [
        [
          [0, 0, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 0, 1, 1, 0],
          [0, 0, 1, 1, 1, 0, 0]
        ], // 0
        [
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [1, 1, 1, 1, 1, 1, 1]
        ], // 1
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1]
        ], // 2
        [
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0]
        ], // 3
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 1]
        ], // 4
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0]
        ], // 5
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0]
        ], // 6
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0]
        ], // 7
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0]
        ], // 8
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 0, 0, 0, 0]
        ], // 9
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ] // :
      ]
    }
  },
  mounted() {
    this.init()
    setInterval(this.draw, 1000)
  },
  methods: {
    init() {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')

      this.canvas.width = this.windowWidth
      this.canvas.height = this.windowHeight

      this.render(this.ctx)
      setInterval(() => {
        this.render(this.ctx)
      }, 1000)
    },
    render(ctx) {
      // let minutes = 24;
      // let seconds = 56;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()

      this.renderDigit(
        this.MARGIN_LEFT,
        this.MARGIN_TOP,
        parseInt(hours / 10),
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 16 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(hours % 10),
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 32 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        10,
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 42 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(minutes / 10),
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 58 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(minutes % 10),
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 73 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        10,
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 82 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(seconds / 10),
        ctx
      )
      this.renderDigit(
        this.MARGIN_LEFT + 98 * (this.RADIUS + 1),
        this.MARGIN_TOP,
        parseInt(seconds % 10),
        ctx
      )
    },

    renderDigit(x, y, num, ctx) {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      // let color = 'rgb(' + r + ',' + g + ',' + b + ')'
      const color = 'rgb(135,95,150)'
      ctx.fillStyle = color
      for (let i = 0; i < this.digit[num].length; i++) {
        for (let j = 0; j < this.digit[num][i].length; j++) {
          if (this.digit[num][i][j] == 1) {
            ctx.beginPath()
            ctx.arc(
              x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
              y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
              this.RADIUS,
              0,
              2 * Math.PI
            )
            ctx.closePath()
            ctx.fill()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
