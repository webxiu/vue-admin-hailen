<template>
  <div>
    <!--图片预览列表-->
    <div
      v-for="(data, index) in imageDataList"
      :key="index + '_'"
      class="img-uploader-preview"
    >
      <div class="preview-img">
        <img :src="data" />
      </div>
      <!--标题横条-->
      <div class="img-uploader-mask" v-if="hasImages">
        <!--<p class="img-uploader-file-size">10MB</p>-->
        <div class="progrss">
          <!-- 图片标题 -->
          <p
            class="img-uploader-file-name"
            :title="
              fileNameList[index].name + ' (' + fileNameList[index].size + ')'
            "
          >
            {{
              fileNameList[index].name + " (" + fileNameList[index].size + ")"
            }}
          </p>
          <!-- 上传进度条 -->
          <p
            class="progrss-bar"
            :style="{ width: fileNameList[index].progress + '%' }"
          ></p>
          <p class="progrss-percent" v-if="fileNameList[index].progress">
            {{ fileNameList[index].progress }}%
          </p>
        </div>
      </div>
      <img
        src="../../assets/round_close.svg"
        class="img-uploader-delete-btn"
        @click="deleteImg(fileNameList[index].cancel, index)"
      />
    </div>

    <!-- 添加 -->
    <div
      class="img-uploader"
      @drop="handleDrop"
      ref="uploader"
      placeholder="选择或拖放图片"
    >
      <!--没有图片显示点击上传-->
      <p class="img-uploader-placeholder">选择或拖放图片</p>

      <label :for="inputId" class="img-uploader-label"></label>

      <!-- input-->
      <input
        style="display: none"
        :id="inputId"
        ref="input"
        type="file"
        accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
        multiple="multiple"
        @change="handleFileChange"
        @click="openInput()"
      />

      <!--错误提示-->
      <div class="img-uploader-error" v-if="errorText.length">
        {{ errorText }}
      </div>

      <!--文件数-->
      <div class="img-uploader-count" v-if="fileNameList.length">
        {{ fileNameList.length }}
      </div>
    </div>
    <button @click="uploading">立即上传</button>
    <button @click="cancelHandle">取消</button>
  </div>
</template>

<script>
// *******************拖入 + 点击提交*********************************
import resizeImage from "./resize";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;
export default {
  name: "KuaActivity",
  props: {
    maxSize: {
      default: 10485760, //10M
      type: Number
    }
  },
  data() {
    return {
      // input 的id
      inputId: "",
      //提交上传的图片
      files: [],
      //进度条
      progress: [],
      // 预览图片地址
      imageDataList: [],
      // 文件名
      fileNameList: [],
      // 错误提示
      errorText: ""
    };
  },
  computed: {
    // 是否有图片
    hasImages() {
      //图片数量
      return this.imageDataList.length > 0;
    }
  },
  mounted() {
    this.inputId = this.id || Math.floor(Math.random() * 100000);
    // console.log(this.inputId)
    ["drop", "dragenter", "dragover", "dragleave"].forEach(eventName => {
      this.preventDefaultEvent(eventName);
    });
  },
  methods: {
    //阻止默认事件
    preventDefaultEvent(eventName) {
      console.log(eventName);
      document.addEventListener(
        eventName,
        function(e) {
          e.preventDefault();
        },
        false
      );
    },
    //点击上传
    handleFileChange() {
      this.errorText = ""; //清空错误提示
      let input = this.$refs.input;
      let files = input.files;
      this.handFile(files);
      // console.log('点击获取', files);
    },
    //拖动上传
    handleDrop(e) {
      let files = e.dataTransfer.files;
      this.handFile(files); //图片信息
      // console.log('拖动获取', files);
    },
    //点击&拖动执行的公共方法
    handFile(files) {
      //遍历图片信息
      for (let i = 0; i < files.length; i++) {
        //接收图片信息
        let imgObj = {};
        let size = files[i].size; //字节

        if (!/image\/\w+/.test(files[i].type)) {
          this.errorText = `Error,文件类型错误!`;
          return false;
        }

        if (size > this.maxSize) {
          this.errorText = `文件大小不能超过${this.sizeFomate()}`;
          return false;
        }
        // console.log('上传格式',files)
        //给提交做准备
        this.files.push(files[i]);

        //需要格式化处理
        imgObj.uid = new Date().getTime(); //id
        imgObj.name = files[i].name; //文件名
        imgObj.size = this.fileFomate(size); //文件大小
        imgObj.mTime =
          files[i].lastModifiedDate.toLocaleDateString() +
          " " +
          files[i].lastModifiedDate.toTimeString().split(" ")[0];

        console.log("图片参数", files);

        //循环填入图片信息
        this.fileNameList.push(imgObj);
      }

      this.preview(files);
    },
    // 获取图片的url
    preview(files) {
      let _this = this;
      if (!files || !window.FileReader) return;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();
        reader.onload = function(e) {
          // console.log(888888,e.target.result)
          // _this.imageDataList.push(e.target.result);
          resizeImage(e.target.result, 150, 150, function(result) {
            _this.imageDataList.push(result);
          });
        };
        reader.readAsDataURL(file);
      }
    },

    //文件大小不能超多少
    sizeFomate() {
      let result = 0;
      if (this.maxSize < 102400) {
        result = this.maxSize + "KB";
      } else {
        result = (this.maxSize / 1024 / 1024).toFixed(1) + "M";
      }
      return result;
    },
    //保留2位小数,不四舍五入
    fomate(data) {
      let twoFixed = data.toFixed(3);
      return twoFixed.substring(0, twoFixed.length - 2);
    },
    //文件大小单位转换
    fileFomate(file) {
      //传入字节
      //计算文件大小
      let kb = file / 1024;
      let mb = kb / 1024;
      let gb = mb / 1024;
      let size;
      if (kb > 1 && kb < 1024) {
        return this.fomate(kb) + "KB";
      } else if (mb >= 1 && mb < 1024) {
        return this.fomate(mb) + "M";
      } else if (gb > 1 && gb < 1024) {
        return this.fomate(gb) + "G";
      } else {
        return file + "字节";
      }
    },
    //删除图片
    deleteImg(cancel, index) {
      console.log(99999, this.fileNameList);
      this.imageDataList.splice(index, 1); //删图片url
      this.fileNameList.splice(index, 1); //删图片信息
      cancel();
    },
    openInput() {
      this.errorText = "";
    },
    //提交上传
    uploading() {
      let _this = this;
      if (this.fileNameList.length == 0 && this.imageDataList.length == 0) {
        this.errorText = "您还没有上传图片";
        return false;
      }
      //遍历图片流
      // let fd = new FormData();
      this.files.forEach((item, i) => {
        //单例模式
        var Dragfiles = (function() {
          var instance;
          return function() {
            if (!instance) {
              instance = new FormData();
            }
            return instance;
          };
        })();
        fd = Dragfiles();
        var fd = new FormData();
        // fd.append("file" + i, item);
        fd.append("file", item);
        axios
          .request({
            url: "http://localhost/html/kjb/upload.php",
            method: "post",
            data: fd,
            headers: { "Content-Type": "multipart/form-data" },
            cancelToken: new CancelToken(c => {
              cancel = c;
              this.fileNameList[i].cancel = c;
            }),
            onUploadProgress: e => {
              let progress = e.total
                ? Math.floor((e.loaded / e.total) * 100)
                : 0;
              this.$set(this.fileNameList[i], "progress", progress);
              console.log("progress", e);
            }
          })
          .then(res => {
            console.log("res===", res);
          });
      });
    },
    cancelHandle() {
      cancel();
    }
  }
};
</script>

<style scoped>
.img-uploader {
  position: relative;
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background: #ebebeb;
}

.img-uploader-placeholder {
  margin: 0;
  position: absolute;
  font-size: 15px;
  width: 100%;
  color: #aaa;
  text-align: center;
  top: 50%;
  transform: translate(0%, -50%);
}

.img-uploader-preview-list {
  margin: 5px 10px;
  height: calc(150px + 18px * 2);
  /*width: 100%;*/
  white-space: nowrap;
  overflow: hidden;
  overflow-x: auto;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  text-align: center;
}

.img-uploader-preview {
  display: inline-block;
  z-index: 2;
  min-height: 150px;
  margin: 10px;
  border-radius: 10px;
  background: #333;
  transition: 0.3s cubic-bezier(0.3, 0, 0.2, 1);
  position: relative;
}

.img-uploader-preview:hover {
  transform: scale(1.02);
}

/* .img-uploader-preview:hover .img-uploader-mask {
  display: block;
} */

.img-uploader-preview:hover .img-uploader-delete-btn {
  display: block;
}

.img-uploader-preview .preview-img {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.img-uploader-label {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  margin-bottom: 0;
}

.img-uploader-mask {
  /* display: none; */
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 1px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
}

.img-uploader-delete-btn {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  width: 25px;
  height: 25px;
}
.progrss {
  height: 16px;
  width: 100%;
  line-height: 16px;
  position: relative;
}
/* 百分比进度条 */
.progrss-bar {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 16px;
  background: rgba(239, 236, 113, 0.5);
  text-align: right;
}
/* 百分比 */
.progrss-percent {
  position: absolute;
  right: 0px;
  color: #fff;
  font-size: 12px;
  width: 30px;
}
/* 图片标题 */
.img-uploader-file-name {
  position: absolute;
  left: 0px;
  top: 0px;
  color: white;
  font-size: 5px;
  line-height: 16px;
  width: 100%;
  padding-right: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
}

.img-uploader-error {
  color: #e55;
  font-size: 12px;
  position: absolute;
  bottom: 6px;
  width: 100%;
  text-align: center;
}

.img-uploader-count {
  font-size: 12px;
  position: absolute;
  top: 2px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background: #da836c;
  color: #fff;
  border-radius: 50%;
}
</style>
