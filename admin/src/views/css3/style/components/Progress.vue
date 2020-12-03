<template>
  <div class="abc">
    <div class="dev" :style="{ width: percent + 'px' }">
      <span class="num">{{ percent }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Progress",
  data() {
    return {
      percent: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.percent++;
      if (this.percent > 100) {
        this.percent = 0;
      }
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
.abc {
  width: 100px;
  background-color: #f0f;
  position: relative;
  height: 30px;
}
.dev {
  background-image: linear-gradient(to right, blue, #ccc);
  position: absolute;
  height: 100%;
  text-align: center;
  line-height: 30px;
  top: 0px;
  left: 0px;
}
.num {
  position: absolute;
  bottom: -24px;
  right: 0px;
}
</style>
