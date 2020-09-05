<template>
  <div>
    <canvas
      ref="canvas"
      width="400"
      height="400"
      style="border: 1px solid #ccc"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mouseout="mouseout"
      @mousemove="mousemove"
    />
    <input ref="myColor" type="color" :value="value" @change="colorChange">
    画笔大小
    <input type="range" min="1" max="5" @click="clickPen">
    <button @click="clearBtn">清除</button>
  </div>
</template>

<script>
export default {
  name: 'CanvasDrawing',
  data() {
    return {
      isMouseDown: false, // 画笔开关,默认关闭
      lineColor: '#000', // 默认颜色
      startLoc: { x: 0, y: 0 }, // 起点坐标
      pen: 3,
      value: '',
      ctx: ''
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
  },
  methods: {
    colorChange(e) {
      this.$refs.myColor.click()
      this.lineColor = e.target.value
    },
    clearBtn() {
      this.ctx.clearRect(0, 0, 400, 400)
      this.draw()
    },
    clickPen() {
      this.pen = this.value
    },
    mousedown(e) {
      this.isMouseDown = true // 鼠标按下打开画笔开关
      this.startLoc = this.getPoint(e.clintX, e.clientY) // 获取画笔位置
    },
    mouseup() {
      this.isMouseDown = false // 鼠标抬起不打开开关
    },
    mouseout() {
      this.isMouseDown = false // 鼠标移除不打开开关
    },
    mousemove(e) {
      if (this.isMouseDown) {
        // 判断开关是否为true
        const endLoc = this.getPoint(e.clientX, e.clientY)
        this.ctx.beginPath()
        this.ctx.lineWidth = this.pen
        this.ctx.strokeStyle = this.lineColor
        this.ctx.moveTo(this.startLoc.x, this.startLoc.y)
        this.ctx.lineTo(endLoc.x, endLoc.y)
        this.ctx.stroke()
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'
        this.startLoc = endLoc
      }
    },
    // 获取画笔位置函数
    getPoint(clientX, clientY) {
      var lineEnd = this.$refs.canvas.getBoundingClientRect()
      return { x: clientX - lineEnd.left, y: clientY - lineEnd.top }
    },
    // 绘制画布函数
    draw() {
      this.ctx.strokeStyle = '#000'
      this.ctx.lineWidth = 1
      // 画线框
      this.ctx.beginPath()
      this.ctx.moveTo(0, 0)
      this.ctx.lineTo(400, 0)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(0, 400)
      this.ctx.closePath() // 闭合路径
      this.ctx.stroke() // 绘制路径

      // 画 米 字格(可选)
      // this.ctx.beginPath();
      // this.ctx.moveTo(0, 0);
      // this.ctx.lineTo(400, 400);
      // this.ctx.moveTo(400, 0);
      // this.ctx.lineTo(0, 400);
      // this.ctx.moveTo(200, 0);
      // this.ctx.lineTo(200, 400);
      // this.ctx.moveTo(0, 200);
      // this.ctx.lineTo(400, 200);
      this.ctx.stroke() // 绘制路径
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
