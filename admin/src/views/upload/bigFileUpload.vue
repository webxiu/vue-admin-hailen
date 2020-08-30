<template>
  <div>
    <div>断点续传</div>
    <el-upload
      class="upload-demo"
      drag
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <div class="progress">
      <div>上传进度:{{ total|totalText }}</div>
      <el-link type="primary" v-if="total > 0 && total < 100" @click="handleBtn">{{ btn|btnText }}</el-link>
    </div>

    <div class="uploadImg" v-if="video">
      <video :src="video" controls></video>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SparkMD5 from "spark-md5";

import { fileParse } from "@/utils/upload";

export default {
  name: "BigFileUpload",
  data() {
    return {
      total: 0,
      video: null,
      btn: false,
    };
  },
  filters: {
    btnText(btn) {
      return btn ? "继续" : "暂停";
    },
    totalText(total) {
      return total > 100 ? 100 : total;
    },
  },
  methods: {
    // 解析为Buffer数据
    /**
     * 切片处理:
     *    把一个文件分割成好几个部分(固定数量/固定大小)
     *    每一个切片有自己的部分数据和自己的名字
     *    HASH_1.mp4
     *    HASH_2.mp4
     *    ...
     */
    async changeFile(file) {
      if (!file) return;
      file = file.raw;
      let buffer = await fileParse(file, "buffer"),
        spark = new SparkMD5.ArrayBuffer(),
        hash,
        suffix;
      spark.append(buffer);
      hash = spark.end();
      suffix = /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];

      // 开始分片(创建100个切片)
      let partList = [],
        partsize = file.size / 100, //每份切片多大
        cur = 0; //当前上传数量

      for (let i = 0; i < 100; i++) {
        let item = {
          chunk: file.slice(cur, cur + partsize),
          filename: `${hash}_${i}.${suffix}`,
        };
        cur += partsize;
        partList.push(item);
      }

      this.partList = partList;
      this.hash = hash;
      this.sendRequest();
    },
    async sendRequest() {
      // 根据100个切片创建100个请求(集合)
      let requestList = [];
      this.partList.forEach((item, index) => {
        // 每一个函数都发送一个切片请求
        let fn = () => {
          let formData = new FormData();
          formData.append("chunk", item.chunk);
          formData.append("filename", item.filename);
          return axios
            .post("http://127.0.0.1:8888/upload/bigfile", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              const data = res.data;
              if (data.code === 0) {
                this.total += 1;
                // 传完切片我们把它移出掉
                this.partList.splice(index, 1);
              }
            });
        };

        requestList.push(fn);
      });
      // 传递: 并行/串行(此处使用串行)
      let i = 0;
      let complete = async () => {
        let result = await axios.get("merge", {
          params: this.hash,
        });
        const data = result.data;
        if (data.code === 0) {
          this.video = data.path;
        }
      };
      let send = async () => {
        if (i >= requestList.length) {
          // 都传完了, 叫后台合并
          // complete();
          return;
        }
        await requestList[i]();
        i++;
        send();
      };
      send();
    },
    handleBtn() {},
  },
};
</script>

<style lang="sass" scoped>
</style>
