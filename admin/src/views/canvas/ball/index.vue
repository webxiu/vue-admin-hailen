
<template>
  <div>
    <div v-for="(item, index) in lists" :key="index">
      <div class="line">{{ item.title }}</div>
      <component :is="item.component" />
    </div>
  </div>
</template>

<script>
import Clock from './components/Clock'
import NowTime from './components/NowTime'
import BallMove from './components/BallMove'
export default {
  name: 'Ball',
  components: { Clock, NowTime, BallMove },
  data() {
    return {
      lists: [
        {
          title: '数字时间:',
          component: 'NowTime'
        },
        {
          title: 'canvas时钟:',
          component: 'Clock'
        },
        {
          title: '运动小球:',
          component: 'BallMove'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.line {
  border-top: 1px solid #ccc;
  padding-top: 15px;
  margin: 15px 0;
  &:first-child {
    border-top: none;
  }
}
</style>
