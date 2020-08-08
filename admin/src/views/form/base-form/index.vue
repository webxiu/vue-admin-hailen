<template>
  <div>
    <BaseForm :form-congfig="formCongfig" />

    <Button @click="getMixin">获取mixin</Button>

    <div>
      <p>
        上传预览:
        <input type="file" multiple accept="image/*" @change="change">
      </p>
      <div>
        <img v-for="(item, index) in imgs" :key="index" :src="item" height="200">
      </div>
    </div>
    <div>
      <p>
        上传裁剪:
        <input type="file" @change="changeCut">
      </p>
      <p>canvas图片裁剪:</p>
      <div class="cut-box">
        <canvas ref="canvas" height="200" style="border: 1px solid;">默认图片</canvas>
        <div class="mask" />移动端头像裁剪:
        <img :src="headerImg" class="header-img" width="50" height="50" alt>
      </div>
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm'
import formMixins from '@/mixins/formMixins'

import Clipic from 'clipic'
const clipic = new Clipic()
export default {
  name: 'Forms',
  components: { BaseForm },
  mixins: [formMixins],
  data() {
    return {
      abc: '组件中的数据',
      imgs: [],
      headerImg: require('@/assets/logo.png'),
      formCongfig: {
        formItem: [
          {
            type: 'button',
            label: '配置的返回',
            handle: function() {
              alert('88889')
            }
          },
          { id: 'date', type: 'datepicker', label: '统计时间' },
          {
            id: 'select1',
            type: 'select',
            label: '全部类型',
            placeholder: '请选择公牛奶',
            options: [
              { value: '选项1', label: '黄金糕' },
              { value: '选项2', label: '黄金糕2' }
            ]
          },
          {
            id: 'select2',
            type: 'select',
            label: '选择母牛奶',
            placeholder: '请输母牛奶',
            options: [
              { value: '选项1', label: '黄金3' },
              { value: '选项2', label: '黄金糕4' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.getInfo()
    if (window.performance.navigation.type === 1) {
      console.log('刷新页面')
      return
    }
    console.log('首次打开页面')
  },
  methods: {
    getInfo() {
      console.log('组件方法后执行', this.formCongfig)
    },
    getMixin() {
      console.log('this', this)
    },
    // 多图片预览
    change(e) {
      const files = e.target.files
      if (files[0]) {
        this.imgs = []
      }
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const file = files[key]
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.onload = (e) => {
            const url = e.target.result
            this.imgs.push(url)
          }
        }
      }
    },
    // 单个图片裁剪
    changeCut(e) {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        const url = e.target.result
        this.loadImg(url).then((res) => {
          const cv = this.$refs.canvas
          const ctx = cv.getContext('2d')
          ctx.clearRect(0, 0, cv.width, cv.height)
          ctx.drawImage(res, 0, 0, cv.width, cv.height)

          clipic.getImage({
            width: 500,
            height: 500,
            src: url,
            onDone: (base64) => {
              // 这里就是上传完成的回调函数，可以在这里请求接口上传至服务器
              this.headerImg = base64
              // console.log(this.headerImg); //图片上传完成后生成的base64
            }
          })
        })
      }
    },
    // 根据地址返回图片
    loadImg(url) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          console.log('一张图片加载完成')
          resolve(img)
        }
        img.onerror = () => {
          reject(new Error('Could not load image at' + url))
        }
        img.src = url
      })
    }
  }
}
</script>

<style scoped>
.cut-box {
  position: relative;
}

.mask {
  position: absolute;
}
.header-img {
  border-radius: 50%;
}
</style>
