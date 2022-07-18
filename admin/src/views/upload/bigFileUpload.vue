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
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <div class="progress">
      <div>上传进度:{{ total | totalText }}</div>
      <el-link
        v-if="total > 0 && total < 100"
        type="primary"
        @click="handleBtn"
        >{{ btn | btnText }}</el-link
      >
    </div>

    <div v-if="video" class="uploadImg">
      <video :src="video" controls />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SparkMD5 from "spark-md5";

import { fileParse } from "@/utils/upload";

export default {
  name: "BigFileUpload",
  filters: {
    btnText(btn) {
      return btn ? "继续" : "暂停";
    },
    totalText(total) {
      return total > 100 ? 100 : total;
    },
  },
  data() {
    return {
      total: 0,
      video: null,
      btn: false,
    };
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
      const buffer = await fileParse(file, "buffer");
      const spark = new SparkMD5.ArrayBuffer();
      let hash;
      let suffix;
      spark.append(buffer);
      hash = spark.end();
      suffix = /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];

      // 开始分片(创建100个切片)
      const partList = [];
      const partsize = file.size / 100; // 每份切片多大
      let cur = 0; // 当前上传数量

      for (let i = 0; i < 100; i++) {
        const item = {
          chunk: file.slice(cur, cur + partsize),
          filename: `${hash}_${i}.${suffix}`,
        };
        console.log(`item`, item);
        cur += partsize;
        partList.push(item);
      }

      this.partList = partList;
      this.hash = hash;
      this.sendRequest();
    },
    async sendRequest() {
      // 根据100个切片创建100个请求(集合)
      const requestList = [];
      this.partList.forEach((item, index) => {
        // 每一个函数都发送一个切片请求
        const fn = () => {
          const formData = new FormData();
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
      // 传递: 并行/串行(此处使用串行, 可以基于标识控制不发送)
      let i = 0;
      const complete = async () => {
        const result = await axios.get("http://127.0.0.1:8888/upload/merge", {
          params: {
            hash: this.hash,
          },
        });
        const data = result.data;
        if (data.code === 0) {
          this.video = data.path;
        }
      };
      const send = async () => {
        // 已经中断则不再上传
        if (this.abort) return;
        if (i >= requestList.length) {
          // 都传完了, 叫后台合并
          complete();
          return;
        }
        await requestList[i]();
        i++;
        send();
      };
      send();
    },
    handleBtn() {
      if (this.btn) {
        // 断点续传
        this.btn = false;
        this.abort = false;
        this.sendRequest();
        return;
      }
      // 暂停上传
      this.btn = true;
      this.abort = true;
    },
  },
};
</script>

<style lang="sass" scoped>
.progress
  background: #ccc
  width: 500px
  line-height: 40px
  border-radius: 2px
</style>
