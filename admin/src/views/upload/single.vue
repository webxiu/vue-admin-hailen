<template>
  <div>
    <div>单文件上传</div>
    <img src="@/assets/logo.png" alt>
    <el-upload
      class="upload-demo"
      drag
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeFile"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <img :src="img">
  </div>
</template>

<script>
/**
 * 文件上传有两套方案:
 *    1.基于文件流(form-data) element-ui上传默认是基于文件流
 *    2.客户端需要把文件转化为base 64
 *
 * 默认上传
 *    格式: multipart/form-data
 *    数据格式: form-data
 *        file 文件流信息
 *        filename 文件名字
 *    上传成功后获取服务器返回信息, 通知on-success回调执行函数
 *    内部封装了ajax
 */

import axios from 'axios'
import qs from 'qs'
import { fileParse } from '@/utils/upload'

export default {
  name: 'SingleUpload',
  data() {
    return {
      img: null
    }
  },
  methods: {
    async changeFile(file) {
      if (!file) return
      file = file.raw
      const result = await fileParse(file, 'base64')
      const res = await axios.post(
        'http://127.0.0.1:8888/upload/single',
        qs.stringify({
          chunk: encodeURIComponent(result),
          filename: file.name
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      const data = res.data
      if (data.code === 0) {
        this.img = data.path
        console.log('data', data)
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const { type, size } = file

      if (!/(png|gif|jpeg|jpg)/g.test(type)) {
        this.$message.error('文件格式不正确')
        return false
      }
      const isJPG = type === 'image/jpeg'
      const isLt2M = size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
