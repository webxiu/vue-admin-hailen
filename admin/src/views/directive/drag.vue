<template>
  <div>
    <div>drag指令:</div>
    <el-button @click="showDialog">显示弹框</el-button>
    <el-dialog
      v-drag
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息: 拖拽标题:</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <hr>
    <el-button v-copy="copyText" type="primary">复制指令</el-button>
    <el-input v-model="msg" style="width: 160px" />
    <hr>
    <el-button v-longpress="longpress" type="primary">长按执行指令</el-button>
    <hr>
    <el-button v-debounce="debounceClick">防抖:多次点击只执行一次</el-button>
    <hr>
    表情喝特殊符号无法输入:<el-input
      v-model="note"
      v-emoji
      style="width: 160px"
      type="text"
    />
    <hr>
    <p>显示:</p>
    <el-button v-permission="'1'">权限按钮1</el-button>
    <p>不显示:</p>
    <el-button v-permission="'10'">权限按钮2</el-button>
    <hr>
    <p>添加水印 & 在可是区域拖拽:</p>
    <div
      v-waterMarker="{
        text: 'lzg版权所有',
        textColor: 'rgba(180, 180, 180, 0.4)'
      }"
      style="height: 100px;position: relative;"
    >
      <div v-draggable style="position:absolute;background: #ccc;">
        点击拖拽(父相对定位, 拖动的当前绝对定位)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragDirective',
  data() {
    return {
      dialogVisible: false,
      msg: '',
      copyText: '我是复制的数据',
      note: ''
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    longpress() {
      alert('长按指令生效')
    },
    debounceClick() {
      console.log('只触发一次')
    }
  }
}
</script>

<style></style>
