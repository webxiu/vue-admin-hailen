<template>
  <div class="tree">
    <div>数据组合树</div>
    <my-tree
      :tree-data="treeData"
      :default-props="defaultProps"
      :file-drop="fileDrop"
      :directory-drop="directoryDrop"
      :delete="deleteTreeRow"
    />
  </div>
</template>

<script>
import MyTree from './component/MyTree'
export default {
  components: { MyTree },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      fileDrop: [{ text: 'rm', value: '删除文件' }],
      directoryDrop: [
        { text: 'rn', value: '修改名字' },
        { text: 'rm', value: '删除文件夹' }
      ],
      oData: {
        child: [
          // 文件
          { name: '文件1', pid: 1, id: 10001 },
          { name: '文件2', pid: 1, id: 10002 },
          { name: '文件2-1', pid: 2, id: 10003 },
          { name: '文件2-2', pid: 2, id: 10004 },
          { name: '文件1-1-1', pid: 4, id: 10005 },
          { name: '文件2-1-1', pid: 5, id: 10006 },
          { name: '文件2-1-2', pid: 5, id: 100061 },
          { name: '文件3-1-1', pid: 6, id: 10007 },
          { name: '文件3-1-1-1', pid: 7, id: 100071 }
        ],
        parent: [
          // 文件夹
          { name: '文件夹1', pid: 0, id: 1 },
          { name: '文件夹2', pid: 0, id: 2 },
          { name: '文件夹3', pid: 0, id: 3 },
          { name: '文件夹1-1', pid: 1, id: 4 },
          { name: '文件夹2-1', pid: 2, id: 5 },
          { name: '文件夹3-1', pid: 3, id: 6 },
          { name: '文件夹3-1-1', pid: 6, id: 7 }
        ]
      },
      treeData: []
    }
  },
  mounted() {
    this.formatTreeData()
  },
  methods: {
    // 处理数据为树形数据
    formatTreeData() {
      this.oData.parent.forEach((p) => (p.type = 'parent'))
      const allData = [...this.oData.parent, ...this.oData.child]
      // 将两个数组合并为一个 键为id 值为整个对象
      const treeMapList = allData.reduce((prev, current) => {
        prev[current.id] = current
        return prev
      }, {})
      // 生成树结构
      const res = allData.reduce((arr, current) => {
        const pid = current.pid
        const parent = treeMapList[pid] // 获取父对象数据
        if (parent) {
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current])
        } else if (pid === 0) {
          // 顶级tree
          arr.push(current)
        }
        return arr
      }, [])
      this.treeData = res
    },
    // 删除树
    deleteTreeRow(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ status: 0, msg: '删除成功' })
        }, 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
