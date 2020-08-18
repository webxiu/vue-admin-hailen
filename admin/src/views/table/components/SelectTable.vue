import createLogger from 'vuex/dist/logger';
<template>
  <div class="app-container tree-table">
    <el-table
      ref="treeTableRef"
      :data="tableData"
      row-key="id"
      :tree-props="treeProps"
      @expand-change="expandChange"
      @select-all="selectAll"
      @select="selectRow"
    >
      <el-table-column
        v-for="column in columnConfig"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :width="column.width"
        :formatter="column.render"
        :sortable="column.sortable"
        :type="column.type"
        :fixed="column.fixed"
        :align="column.align"
        :class-name="column.className"
        :header-align="column.headerAlign"
        :selectable="column.selectable"
        :show-overflow-tooltip="true"
        @click="(value)=> bindThis(value, column.handle)"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SelectTable',
  props: {
    columnConfig: Array,
    tableData: Array,
    treeProps: Object
  },
  data() {
    const self = this
    return {
      isSelectAll: false,
      allMove: [] // 批量迁移数组
    }
  },
  methods: {
    bindThis(data, handle) {
      return handle && handle.call(this, data)
    },
    expandChange(row, open) {
      console.log('expandChange===>:', row, open)
    },

    // 添加与删除
    unique(val) {
      var index = this.allMove.indexOf(val)
      if (index > -1) {
        this.allMove.splice(index, 1)
      } else {
        this.allMove.push(val)
      }
      console.log('this.allMove', this.allMove)
    },
    // 删除迁移id
    deleteNow(id) {
      const index = this.allMove.indexOf(id)
      if (index > -1) {
        this.allMove.splice(index, 1)
      }
    },
    // 表格选中一行
    selectRow(select, row) {
      console.log('select,row', select, row)
      const children = row.children
      this.unique(row.id)
      if (children && children.length) { // 不判断会报错
        this.getChildren(children)
      } else {
        row.child = 'child'
      }
    },
    // 遍历子项
    getChildren(children, row, type) {
      const slef = this
      children.forEach((item) => {
        item.child = ''
        item.selected = !item.selected
        const child = item.children
        slef.deleteNow(item.id)
        this.$refs.treeTableRef.toggleRowSelection(item, item.selected)
        if (child && child.length) { // 不判断会报错
          this.getChildren(child)
        }
      })
    },
    // 选中所有
    selectAll(row) {
    //   this.isSelectAll = !this.isSelectAll;
    //   this.tableData.forEach((item) => {
    //     if (item.children) {
    //       this.getChildren(item.children, item, "all");
    //       this.$refs.treeTableRef.toggleRowExpansion(item, item.selected);
    //     }
    //   });
      console.log('selectAll===>:', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-table {
  background: #eee;
}
</style>
