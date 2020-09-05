import { mount } from '@vue/test-utils';
<template>
  <div class="bg">
    <!-- 小球包裹盒子 -->
    <div ref="parent" class="wrap" />
  </div>
</template>

<script>
export default {
  name: 'CollideBall',
  data() {
    return {
      // 球的宽度
      elWidth: 8, // 110
      //  color : ['-webkit-repeating-radial-gradient(red, yellow 10%, green 15%)', 'green', 'blue', 'black', 'yellow'],
      color: [
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'pink',
        'golden',
        'brown',
        'rainbow',
        'coral',
        'turquoise',
        'greenyellow'
      ],
      // 随机的颜色
      ballNum: 30, // 20
      // pageHeight:window.screen.height,
      pageHeight: document.body.clientHeight,
      // pageWidth:window.screen.width,
      pageWidth: document.body.clientWidth,
      containerWidth: document.body.clientWidth,
      sizeRange: 48, // 60 球的大小偏移值
      balls: [],

      // 生成小球
      spaceIndex: 10, // 25
      spring: 1, // 球与球之间弹性系数
      bounce: -1 // 球与边缘之间弹性系数
    }
  },
  mounted() {
    this.createBalls(
      this.elWidth + this.sizeRange,
      this.pageWidth,
      this.pageHeight,
      this.ballNum
    )
    setInterval(() => {
      this.ballHit(this.balls, this.pageWidth, this.pageHeight)
    }, 15) // 30
  },
  methods: {
    // 生成虚拟网格
    createTable(ballWidth, pageWidth, pageHeight) {
      const col = Math.floor(pageWidth / ballWidth)
      const marginH = pageWidth % ballWidth
      const marginV = pageHeight % ballWidth
      const row = Math.floor(pageHeight / ballWidth)
      const total = col * row
      const ballMap = []
      for (let i = 0; i < total; i++) {
        // 网格map存入一维数组 //top、left值有较大偏差原因：/、%运算为小数，与Java不同
        ballMap[i] = {
          left: marginH / 2 + Math.floor(i % col) * ballWidth,
          top: marginV / 2 + Math.floor(i / col) * ballWidth
        }
      }
      return ballMap
    },
    createBalls(ballWidth, pageWidth, pageHeight, ballNum) {
      const ballMap = this.createTable(ballWidth, pageWidth, pageHeight)
      const range = ballMap.length
      if (ballNum >= range - this.spaceIndex) {
        ballNum = range - this.spaceIndex
      }
      const ballsData = []
      let ballIndex
      ballIndex = this.getRandom(0, range, ballNum)
      for (let i = 0; i < ballIndex.length; i++) {
        ballsData[i] = ballMap[ballIndex[i]]
      }
      this.renderBalls(ballsData, ballNum)
    },
    // 随机数去重工具函数2
    getRandom(min, max, n) {
      if (n > max - min + 1 || max < min) {
        return null
      }
      const result = []
      let count = 0
      while (count < n) {
        const num = Math.floor(Math.random() * (max - min)) + min
        let flag = true
        for (let j = 0; j < n; j++) {
          if (num == result[j]) {
            flag = false
            break
          }
        }
        if (flag) {
          result[count] = num
          count++
        }
      }
      return result
    },
    // 渲染小球
    renderBalls(ballData, ballNum) {
      for (let i = 0; i < ballNum; i++) {
        const divBall = this.createEl('div')
        // （待改进)
        this.balls.push({
          el: divBall,
          left: ballData[i].left,
          top: ballData[i].top,
          vx: Math.random() * 2 - 1, //* 6-3
          vy: Math.random() * 2 - 1,
          raduis: parseInt(divBall.style.width) / 2
        })
      }
      for (let j = 0; j < ballNum; j++) {
        this.balls[j].el.style.left = this.balls[j].left + 'px'
        this.balls[j].el.style.top = this.balls[j].top + 'px'
      }
    },
    // 随机生成一个dom元素
    createEl(el, text) {
      const elment = document.createElement(el)
      this.$refs.parent.appendChild(elment)
      const len = Math.ceil(Math.random() * this.sizeRange)
      elment.style.width = len + this.elWidth + 'px'
      elment.style.height = len + this.elWidth + 'px'
      elment.style.background = this.color[
        Math.floor(Math.random() * this.color.length)
      ]
      elment.style.position = 'absolute'
      elment.style.borderRadius = '50%'
      elment.innerHTML = text || ''
      // elment.setAttribute("class", "ball_r50");

      return elment
    },
    // 小球撞击
    ballHit(balls, pageWidth, pageHeight) {
      // 检测边缘
      for (let i = 0; i < balls.length; i++) {
        if (
          balls[i].left <= 0 ||
          balls[i].left >= pageWidth - 2 * balls[i].raduis
        ) {
          balls[i].vx *= this.bounce
        }
        if (
          balls[i].top <= 0 ||
          balls[i].top >= pageHeight - 2 * balls[i].raduis
        ) {
          balls[i].vy *= this.bounce
        }
      }
      // 检测小球与小球
      for (let i = 0; i < this.balls.length; i++) {
        const ball1 = this.balls[i]
        ball1.x = ball1.left + ball1.raduis
        ball1.y = ball1.top + ball1.raduis
        for (let j = i + 1; j < this.balls.length; j++) {
          const ball2 = this.balls[j]
          ball2.x = ball2.left + ball2.raduis
          ball2.y = ball2.top + ball2.raduis
          const dx = ball2.x - ball1.x
          const dy = ball2.y - ball1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const misDist = ball1.raduis + ball2.raduis
          if (dist < misDist) {
            const angle = Math.atan2(dy, dx)
            const tx = ball1.x + Math.cos(angle) * misDist
            const ty = ball1.y + Math.sin(angle) * misDist
            const ax = (tx - ball2.x) * this.spring
            const ay = (ty - ball2.y) * this.spring
            ball1.vx -= ax
            ball1.vy -= ay
            ball2.vx += ax
            ball2.vy += ay
          }
        }
      }
      this.moveBall(this.balls)
    },
    // 移动小球
    moveBall(balls) {
      for (let i = 0; i < balls.length; i++) {
        balls[i].left += balls[i].vx
        balls[i].top += balls[i].vy
        balls[i].el.style.left = balls[i].left + 'px'
        balls[i].el.style.top = balls[i].top + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background-image: url(~@/assets/bg01.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  width: 100%;
  height: 100%;
  .wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
  }
  .ball_r50 {
    border-radius: 50% !important;
    overflow: hidden;
  }
}
</style>
