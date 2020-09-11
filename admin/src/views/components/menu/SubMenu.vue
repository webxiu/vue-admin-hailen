import BetItem from 'components/lottery-hc/common/bet-item';
<template>
  <div class="sub-menu" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="title">
      <slot name="title" />
      <span class="icon">&gt;</span>
    </div>
    <div class="sub-item" v-show="subShow">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  data() {
    return {
      subShow: false,
    };
  },
  methods: {
    mouseenter() {
      this.subShow = true;
    },
    mouseleave() {
      this.subShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-menu {
  position: relative;
  .title {
    line-height: 50px;
    text-align: center;
    &:hover {
      background: #f0f;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 15px;
    }
  }
  .sub-item {
    position: absolute;
    left: 100%;
    top: 0;
    width: 100%;
    background-color: #f98;
  }
}
</style>
