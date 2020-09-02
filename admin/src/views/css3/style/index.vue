import * as child from 'child_process';
<template>
  <div>
    <div>css样式</div>
    <div class="train-wrap">
      <div class="train-item" v-for="item in trainList" :key="item.tid">
        <div class="train-left">
          <el-button class="first-btn">{{ item.ltitle }}</el-button>
        </div>
        <div class="train-middle">
          <div class="train-middle-title">{{ item.mtitle }}</div>
          <template v-if="item.children">
            <div
              class="train-border"
              :class="{first: cell.flag}"
              v-for="cell in item.children"
              :key="cell.kid"
            >
              <div class="train-input">
                <el-input type="text" v-model="cell.value" placeholder="请输入二级科目名称" />
                <el-button class="del-btn" size="small" @click="del(cell)">-</el-button>
              </div>
            </div>
          </template>
        </div>
        <div class="train-right">
          <el-button class="first-btn" @click="add(item)">{{ item.rtitle }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CssStyle",
  data() {
    return {
      trainList: [
        {
          tid: Math.random(),
          ltitle: "一级训练科目",
          mtitle: "水上专项训练",
          rtitle: "增加二级科目",
          children: [
            { kid: Math.random(), value: "", flag: true },
            { kid: Math.random(), value: "" },
          ],
        },
        {
          tid: Math.random(),
          ltitle: "一级训练科目",
          mtitle: "陆上专项训练(测功仪)",
          rtitle: "增加二级科目",
          children: [
            { kid: Math.random(), value: "", flag: true },
            { kid: Math.random(), value: "" },
          ],
        },
        {
          tid: Math.random(),
          ltitle: "一级训练科目",
          mtitle: "陆上力量训练",
          rtitle: "增加二级科目",
          children: [
            { kid: Math.random(), value: "", flag: true },
            { kid: Math.random(), value: "" },
          ],
        },
      ],
    };
  },
  methods: {
    add(value) {
      this.trainList.forEach((item) => {
        if (item.tid == value.tid) {
          item.children.push({ kid: Math.random(), value: "" });
        }
      });
    },
    del(value) {
      this.trainList.forEach((item) => {
        item.children.forEach((cell) => {
          if (cell.kid == value.kid) {
            const index = item.children.findIndex((m) => m.kid == value.kid);
            item.children.splice(index, 1);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.train-wrap {
  width: 100%;
  padding: 25px;
  .first-btn {
    width: 80%;
  }
  .train-item {
    display: flex;
    margin-bottom: 50px;
    .train-left {
      flex: 2.5;
      text-align: right;
      // background: #ccc;
    }
    .train-middle {
      flex: 5;
      margin-left: 5px;
      margin-right: 50px;
      flex-direction: column;
      display: flex;
      transform: translateY(-25px);
      .train-middle-title {
        width: 90%;
        line-height: 50px;
        background: #aaa;
        color: #fff;
        font-weight: 700;
        align-self: flex-end;
        text-align: center;
        transform: translateY(25px);
        z-index: 9;
      }
      .train-border {
        border-left: 1px solid #cecece;
        border-bottom: 1px solid #cecece;
        width: 100%;
        height: 60px;
        position: relative;
        &.first {
          height: 70px;
          border-top: 1px solid #cecece !important;
        }
        .train-input {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 85%;
          text-align: right;
          transform: translateY(20px);
          .del-btn {
            position: absolute;
            right: -50px;
            top: 4px;
          }
        }
      }
    }
    .train-right {
      flex: 2.5;
      // background: #efc;
    }
  }
}
</style>
