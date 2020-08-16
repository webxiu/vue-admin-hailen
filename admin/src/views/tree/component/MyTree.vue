<template>
  <div class="tree">
    <el-tree
      :data="data"
      :props="defaultProps"
      show-checkbox
      :default-expand-all="true"
      :expand-on-click-node="false"
      :render-content="render"
      @check-change="handleCheckChange"
    />
  </div>
</template>

<script>
export default {
  name: "CustomTree",
  props: {
    treeData: { type: Array, default: () => [] },
    defaultProps: { type: Object, default: () => {} },
    fileDrop: { type: Array, default: () => [] },
    directoryDrop: { type: Array, default: () => [] },
    deleteTree: Function,
    updateTree: Function,
  },
  data() {
    return {
      data: this.treeData, // 使用data接收父组件数据
      currentId: "", //当前编辑树的id
      currentCont: "", //当前编辑树的内容
    };
  },
  watch: {
    // 需要监听父组件传过来的treeData属性, 确保更新渲染el-tree组件
    treeData(data) {
      this.data = data;
    },
  },
  methods: {
    isParent(data) {
      return data.type == "parent";
    },
    // 下拉菜单删除/修改判断
    handleCommand(data, item) {
      if (item.text === "rn") {
        this.handleRename(data);
      } else if (item.text === "rm") {
        this.handleRemove(data);
      }
    },
    // 重命名
    handleRename(data) {
      this.currentCont = data.name;
      this.currentId = data.id;
    },

    // 删除文件
    handleRemove(data) {
      this.$confirm(`请确认是否删除:${data.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 用户传递了删除方法直接调用, 没有就直接删除
          this.deleteTree;
          this.deleteTree
            ? this.deleteTree(data.id)
                .then((res) => {
                  console.log("res", res);
                  this.remove(data.id);
                })
                .catch((err) => {
                  console.log("删除失败", err);
                })
            : this.remove(data.id);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 执行删除方法
    del(arr, id) {
      console.log("删除ID:", id);
      arr.forEach((item, index) => {
        if (item.id === id) {
          arr.splice(index, 1);
          this.$message.success("修改成功!");
        } else if (item.id !== id && item.children) {
          this.del(item.children, id);
        }
      });
    },
    // 删除页面的内容
    remove(id) {
      // 深拷贝数据
      const list = JSON.parse(JSON.stringify(this.data));
      this.del(list, id); // 删除
      // 更新数据
      this.$emit("update:tree-data", list);
      //   this.data = list;
    },

    // 修改输入框可输入处理
    handleInput(val) {
      this.currentCont = val;
    },
    // 执行修改方法
    mod(arr, id) {
      arr.forEach((item, index) => {
        if (item.id === id) {
          item.name = this.currentCont;
          this.currentId = ""; //隐藏输入框
          this.$message.success("修改成功!");
        } else if (item.id !== id && item.children) {
          this.mod(item.children, id);
        }
      });
    },
    // 修改树名称
    ok(data) {
      const list = JSON.parse(JSON.stringify(this.data));
      // 用户传递了修改方法直接调用, 没有就直接修改
      this.updateTree
        ? this.updateTree(this.currentCont, this.currentCont)
            .then((res) => {
              console.log("修改成功", res);
              this.mod(list, data.id);
            })
            .catch((err) => {
              console.log("修改失败", err);
            })
        : this.mod(list, data.id);
      // 更新修改后的数据
      this.$emit("update:tree-data", list);
    },
    // 取消修改
    cancel() {
      this.currentId = "";
    },
    // 自定义渲染树显示内容
    render(h, { node, data, store }) {
      const list = this.isParent(data) ? this.directoryDrop : this.fileDrop;
      return (
        <div class="custom-tree-node">
          {this.isParent(data) ? (
            node.expanded ? (
              <i class="el-icon-folder-opened"></i>
            ) : (
              <i class="el-icon-folder"></i>
            )
          ) : (
            <i class="el-icon-document"></i>
          )}
          {/**修改树名称输入框 */}
          {data.id === this.currentId ? (
            <el-input
              size="mini"
              value={this.currentCont}
              on-input={this.handleInput}
            ></el-input>
          ) : (
            <span style="color: #f60"> {node.label}</span>
          )}
          {
            // on-command={(value) => {
            //   this.handleCommand(data, value);
            // }}
            // bind 绑定时候, 会把原来的参数向后移动
          }
          {data.id !== this.currentId ? (
            <el-dropdown
              trigger="click"
              on-command={this.handleCommand.bind(this, data)}
              placement="bottom-end"
            >
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {list.map((item) => (
                  <el-dropdown-item command={item}>
                    {item.value}
                  </el-dropdown-item>
                ))}
              </el-dropdown-menu>
            </el-dropdown>
          ) : (
            <span style={{ float: "right" }}>
              <el-button size="mini" type="text" on-click={() => this.ok(data)}>
                修改
              </el-button>
              <el-button size="mini" type="text" on-click={() => this.cancel()}>
                取消
              </el-button>
            </span>
          )}
        </div>
      );
    },
    // 勾选树获取数据
    handleCheckChange(data) {
      console.log("勾选树:", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree {
  ::v-deep .el-tree .custom-tree-node,
  ::v-deep .el-tree .el-tree-node__content {
    width: 380px;
    margin: 2px 0;
  }
  ::v-deep .el-dropdown {
    float: right;
  }
  ::v-deep .el-input--mini {
    width: 60%;
    margin: 0 10px;
    line-height: 16px;
  }
}
</style>
