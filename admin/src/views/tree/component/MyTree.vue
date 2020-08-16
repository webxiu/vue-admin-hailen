import { Dropdown } from 'antd';
import { watch } from '../../../../../../Example/资料/五子棋/hhh/pro/scripts/node';
<template>
  <div class="tree">
    <el-tree
      :data.sync="data"
      :props="defaultProps"
      show-checkbox
      :default-expand-all="true"
      :expand-on-click-node="false"
      :render-content="render"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomTree',
  props: {
    treeData: { type: Array, default: () => [] },
    defaultProps: { type: Object, default: () => {} },
    fileDrop: { type: Array, default: () => [] },
    directoryDrop: { type: Array, default: () => [] },
    delete: Function
  },
  data() {
    return {
      data: this.treeData // 使用data接收父组件数据
    }
  },
  watch: {
    // 需要监听父组件传过来的treeData属性, 确保更新渲染el-tree组件
    treeData(data) {
      this.data = data
    }
  },
  methods: {
    isParent(data) {
      return data.type == 'parent'
    },
    handleRename(data) {
      // 重命名
      console.log('data', data)
    },
    // 执行删除方法
    del(arr, id) {
      console.log('删除ID:', id)
      arr.forEach((item, index) => {
        if (item.id === id) {
          arr.splice(index, 1)
        } else if (item.id !== id && item.children) {
          this.del(item.children, id)
        }
      })
    },
    // 删除页面的内容
    remove(id) {
      // 深拷贝数据
      const list = JSON.parse(JSON.stringify(this.data))
      console.log('所有节点树:', list)
      this.del(list, id) // 删除
      //   this.$emit("update:data", list);
      this.data = list // 更新数据
    },

    handleRemove(data) {
      // 删除文件
      console.log('删除data', data)
      this.$confirm(`请确认是否删除:${data.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 用户传递了删除方法直接调用, 没有就直接删除
          this.delete
            ? this.delete(data.id)
              .then((res) => {
                console.log('res', res)
                this.remove(data.id)
                this.$message.success('删除成功!')
              })
              .catch((err) => {
                console.log('删除失败', err)
              })
            : this.remove(data.id)
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleCommand(data, item) {
      if (item.text === 'rn') {
        this.handleRename(data)
      } else if (item.text === 'rm') {
        this.handleRemove(data)
      }
    },
    // render
    render(h, { node, data, store }) {
      const list = this.isParent(data) ? this.directoryDrop : this.fileDrop
      return (
        <div class='custom-tree-node'>
          {this.isParent(data) ? (
            node.expanded ? (
              <i class='el-icon-folder-opened'></i>
            ) : (
              <i class='el-icon-folder'></i>
            )
          ) : (
            <i class='el-icon-document'></i>
          )}
          <span style='color: #f60'> {node.label}</span>
          {
            // <span>
            //   <el-button
            //     size="mini"
            //     type="text"
            //     on-click={() => this.append(data)}
            //   >
            //     Append
            //   </el-button>
            //   <el-button
            //     size="mini"
            //     type="text"
            //     on-click={() => this.remove(node, data)}
            //   >
            //     Delete
            //   </el-button>
            // </span>
            // on-command={(value) => {
            //   this.handleCommand(data, value);
            // }}
          }
          {/* bind 绑定时候, 会把原来的参数向后移动 */}
          <el-dropdown
            trigger='click'
            on-command={this.handleCommand.bind(this, data)}
            placement='bottom-end'
          >
            <span class='el-dropdown-link'>
              下拉菜单<i class='el-icon-arrow-down el-icon--right'></i>
            </span>
            <el-dropdown-menu slot='dropdown'>
              {list.map((item) => (
                <el-dropdown-item command={item}>{item.value}</el-dropdown-item>
              ))}
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      )
    },
    // 点击树获取数据
    handleNodeClick(data) {
      console.log('点击', data)
    },
    // 勾选树获取数据
    handleCheckChange(data) {
      console.log('勾选', data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree .custom-tree-node,
::v-deep .el-tree .el-tree-node__content {
  width: 360px;
}
::v-deep .el-dropdown {
  float: right;
}
</style>
