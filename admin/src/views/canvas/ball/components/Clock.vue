import data from '../../../../../../../Project/vue-admin-ts/src/views/pdf/content';
<template>
  <canvas ref="canvas" width="200" height="200" style="border: 1px solid #ccc" />
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      ctx: null,
      canvas: null,
      timesArr: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
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
      this.width = this.ctx.canvas.width
      this.height = this.ctx.canvas.height
      this.r = this.width / 2
      this.rem = this.width / 200 // 设置宽高比例缩放

      this.draw()
    },
    drawBackground() {
      this.ctx.save()
      this.ctx.translate(this.r, this.r) // 将原点移动到画布中心
      this.ctx.beginPath()
      this.ctx.lineWidth = 10 * this.rem
      //  this.ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false);
      this.ctx.arc(
        0,
        0,
        this.r - this.ctx.lineWidth / 2,
        0,
        2 * Math.PI,
        false
      )
      this.ctx.stroke()

      //  this.ctx.font = "18px Arial";
      this.ctx.font = 18 * this.rem + 'px Arial'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.timesArr.forEach((time, i) => {
        const rad = ((2 * Math.PI) / 12) * i // 第i小时的弧度
        const x = Math.cos(rad) * (this.r - 30 * this.rem)
        const y = Math.sin(rad) * (this.r - 30 * this.rem)
        this.ctx.fillText(time, x, y)
      })

      for (let i = 0; i < 60; i++) {
        const rad = ((2 * Math.PI) / 60) * i
        const x = Math.cos(rad) * (this.r - 18 * this.rem)
        const y = Math.sin(rad) * (this.r - 18 * this.rem)
        this.ctx.beginPath()
        if (i % 5 === 0) {
          this.ctx.fillStyle = '#000'
        } else {
          this.ctx.fillStyle = '#ccc'
        }
        //  this.ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        this.ctx.arc(x, y, 2 * this.rem, 0, 2 * Math.PI, false)
        this.ctx.fill()
      }
    },

    drawHour(hour, minute) {
      this.ctx.save()
      this.ctx.beginPath()
      const rad = ((2 * Math.PI) / 12) * hour
      const mrad = ((2 * Math.PI) / 12 / 60) * minute
      this.ctx.rotate(rad + mrad)
      this.ctx.lineWidth = 5 * this.rem
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(0, 10 * this.rem)
      this.ctx.lineTo(0, -this.r + 60 * this.rem)
      this.ctx.stroke()
      this.ctx.restore()
    },
    drawMinute(minute) {
      this.ctx.save()
      this.ctx.beginPath()
      const rad = ((2 * Math.PI) / 60) * minute
      this.ctx.rotate(rad)
      this.ctx.lineWidth = 3 * this.rem
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(0, 10 * this.rem)
      this.ctx.lineTo(0, -this.r / 2)
      this.ctx.stroke()
      this.ctx.restore()
    },
    drawSecond(second) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.fillStyle = '#f00'
      const rad = ((2 * Math.PI) / 60) * second
      this.ctx.rotate(rad)
      this.ctx.moveTo(-2, 20 * this.rem)
      this.ctx.lineTo(2, 20 * this.rem)
      this.ctx.lineTo(1, -this.r + 40 * this.rem)
      this.ctx.lineTo(-1, -this.r + 40 * this.rem)
      this.ctx.fill() // 填充
      //  this.ctx.stroke(); // 画线
      this.ctx.restore()
    },

    drawDot() {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#bbb'
      this.ctx.arc(0, 0, 5 * this.rem, 0, 2 * Math.PI, false)
      this.ctx.fill()
      //  this.ctx.restore();
    },

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const now = new Date()
      const hh = now.getHours()
      const mm = now.getMinutes()
      const ss = now.getSeconds()

      this.drawBackground() // 画背景刻度
      this.drawHour(hh, mm) // 画时针
      this.drawMinute(mm) // 画分针
      this.drawSecond(ss) // 画秒针
      this.drawDot() // 画中心的小原点
      this.ctx.restore()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
