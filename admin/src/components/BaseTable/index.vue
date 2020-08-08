<template>
  <div>
    999
    <el-table
      :data="tableData"
      :border="propConfig.border"
      :size="propConfig.size"
      :fit="propConfig.fit"
      :show-summary="propConfig.showSummary"
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
        :show-overflow-tooltip="true"
      />
      <slot />
    </el-table>
    <div v-if="pagineConfig.show" class="pagine">
      <el-pagination
        :background="pagineConfig.background"
        :layout="pagineConfig.layout"
        :small="pagineConfig.small"
        :page-sizes="pageSizes"
        :current-page.sync="initPage"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: { required: true, type: Array, default: () => [] },
    propConfig: { required: false, type: Object, default: () => {} },
    pagineConfig: { required: false, type: Object, default: () => {} },
    columnConfig: { required: true, type: Array, default: () => [] },
    pagination: { type: Boolean, default: true },
    getData: { type: Function, default: () => {} },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    total: { type: Number, default: 0 }
  },
  data() {
    return {
      limit: 10,
      initPage: 1,
      props: this.props
    }
  },
  methods: {
    handleSizeChange(size) {
      this.limit = size
      this.initPage = 1
      this.getData(1, this.limit)
    },
    handleCurrentChange(page) {
      this.getData(page, this.limit)
    },
    async refreshTable(isReset = true) {
      if (isReset) {
        this.initPage = 1
      }
      await this.getData(this.initPage, this.limit)
    },
    // 复选框选择事件
    handleSelectionChange(val) {
      const selectData = []
      for (const item of val) {
        selectData.push(item.w_id)
      }
      this.$emit('selectionChange', selectData)
    }
  }
}
</script>
<style scoped>
.pagine {
  margin-top: 20px;
}
</style>
