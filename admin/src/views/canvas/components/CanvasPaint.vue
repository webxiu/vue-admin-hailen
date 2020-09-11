<template>
  <div>
    <canvas ref="canvas" width="400" height="400">当前浏览器不支持Canvas, 请更换浏览器再试</canvas>
    <canvas ref="canvas2">当前浏览器不支持Canvas, 请更换浏览器再试</canvas>
  </div>
</template>

<script>
export default {
  name: "CanvasPaint",
  data() {
    return {
      ctx: null,
      ctx2: null,
      // 桥板
      picArr: [
        {
          p: [
            { x: 0, y: 0 },
            { x: 800, y: 0 },
            { x: 400, y: 400 },
          ],
          color: "#caff67",
        },
        {
          p: [
            { x: 0, y: 0 },
            { x: 400, y: 400 },
            { x: 0, y: 800 },
          ],
          color: "#67becf",
        },
        {
          p: [
            { x: 800, y: 0 },
            { x: 800, y: 400 },
            { x: 600, y: 600 },
            { x: 600, y: 200 },
          ],
          color: "#ef3d6e",
        },
        {
          p: [
            { x: 600, y: 200 },
            { x: 600, y: 600 },
            { x: 400, y: 400 },
          ],
          color: "#f9f51a",
        },
        {
          p: [
            { x: 400, y: 400 },
            { x: 600, y: 600 },
            { x: 400, y: 800 },
            { x: 200, y: 600 },
          ],
          color: "#a594c0",
        },
        {
          p: [
            { x: 200, y: 600 },
            { x: 400, y: 800 },
            { x: 0, y: 800 },
          ],
          color: "#fa8ecc",
        },
        {
          p: [
            { x: 800, y: 400 },
            { x: 800, y: 800 },
            { x: 400, y: 800 },
          ],
          color: "#f6ca29",
        },
      ],
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    const canvas2 = this.$refs.canvas2;
    this.ctx = canvas.getContext("2d");
    this.ctx2 = canvas2.getContext("2d");

    canvas2.width = 800;
    canvas2.height = 800;

    this.init_c1();
    this.init_c2();
  },
  methods: {
    init_c1() {
      // js判断canvas是否支持
      // ctx ? alert("支持") : alert("不支持");
      this.ctx.fillStyle = "#f60";
      this.ctx.fillRect(0, 0, 400, 400);
      for (var i = 0; i < 11; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(i * 30, 30);
        this.ctx.lineTo(i * 30, 300);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(30, i * 30);
        this.ctx.lineTo(300, i * 30);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },
    init_c2() {
      this.ctx2.fillStyle = "#f60";
      for (var i = 0; i < this.picArr.length; i++) {
        this.draw(this.picArr[i], this.ctx2);
      }
    },
    draw(pos, ctx) {
      this.ctx2.beginPath();
      this.ctx2.moveTo(pos.p[0].x, pos.p[0].y);
      for (var i = 1; i < pos.p.length; i++) {
        this.ctx2.lineTo(pos.p[i].x, pos.p[i].y);
      }
      this.ctx2.closePath();
      this.ctx2.fillStyle = pos.color;
      this.ctx2.fill();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
