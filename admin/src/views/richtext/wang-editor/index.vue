<template>
  <div class="egit_box">
    <p>富文本编辑器试用</p>
    <div
      class="text_box"
      style="width: 100%;display: flex;justify-content: center;"
    >
      <vue-egdit
        ref="editor"
        id="editor"
        v-model="initContent"
        :menus="meaus"
      ></vue-egdit>
    </div>
    <div class="btn" style="margin-top: 30px;">
      <el-button type="primary" @click="setContent">设置富文本内容</el-button>
      <el-button type="primary" @click="getContent">获取富文本内容</el-button>
      <el-button type="primary" @click="goNextPage">跳转页面</el-button>
    </div>
  </div>
</template>
<script>
//参考文档 https://www.npmjs.com/package/vue-wangeditor
import vueEgdit from "vue-wangeditor";
export default {
  name: "WangEditor",
  components: {
    vueEgdit
  },
  data() {
    return {
      initContent: "初始化富文本内容",
      meaus: [
        "source", // 源码模式
        "|",
        "bold", // 粗体
        "underline", // 下划线
        "italic", // 斜体
        "strikethrough", // 中线
        "eraser", // 清空格式
        "forecolor", // 文字颜色
        "bgcolor", // 背景颜色
        "|",
        "quote", // 引用
        "fontfamily", // 字体
        "fontsize", // 字号
        "head", // 标题
        "unorderlist", // 无序列表
        "orderlist", // 有序列表
        "alignleft", // 左对齐
        "aligncenter", // 居中
        "alignright", // 右对齐
        "|",
        "link", // 链接
        "unlink", // 取消链接
        "table", // 表格
        "emotion", // 表情
        "|",
        "img", // 图片
        "video", // 视频
        "insertcode", // 插入代码
        "|",
        "undo", // 撤销
        "redo", // 重做
        "fullscreen" // 全屏
      ]
    };
  },
  mounted() {
    console.log(555555411, this.$refs.editor);
  },
  methods: {
    setContent() {
      this.initContent = "设置好的内容";
      this.$refs.editor.setHtml(this.initContent); //如设置：后台返回来的固定内容
      console.log(this.initContent, "设置编辑器内容");
    },
    getContent() {
      this.initContent = this.$refs.editor.getHtml(this.initContent);
      console.log(this.initContent, "获取编辑器当前内容的html代码片段");
    },
    //vue 跳转
    goNextPage() {
      this.$router.push({
        name: "testEgdit"
      });
    }
  }
};
</script>
