import createLogger from 'vuex/dist/logger';
<template>
  <div class="app-container tree-table">
    <el-table
      ref="treeTableRef"
      :data="tableData"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @expand-change="expandChange"
      @select-all="selectAll"
      @select="select"
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TreeTable",
  data() {
    return {
      isSelectAll: false,
      p: [],
      c: [],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 12,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 2,
          date: "三级",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          children: [
            {
              id: 21,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 22,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 221,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                  children: [
                    {
                      id: 2211,
                      date: "2016-05-01",
                      name: "王小虎",
                      address: "上海市普陀区金沙江路 1519 弄",
                    },
                    {
                      id: 2212,
                      date: "2016-05-01",
                      name: "王小虎",
                      address: "上海市普陀区金沙江路 1519 弄",
                    },
                  ],
                },
                {
                  id: 222,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: [
            {
              id: 41,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 42,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
      ],
      columnConfig: [
        { type: "selection", minWidth: "50", align: "center" },
        { prop: "date", label: "日期", minWidth: "100" },
        { prop: "name", label: "姓名", minWidth: "100" },
        { prop: "address", label: "地址", minWidth: "100" },
      ],
    };
  },
  methods: {
    expandChange(row, open) {
      console.log("expandChange===>:", row, open);
    },
    select(select, row) {
      const children = row.children;
      if (children) {
        this.getChildren(children, row, "one");
      } else {
        console.log("叶子ID===>:", row.id);
      }
    },
    getChildren(children, row, type) {
      row.selected = !row.selected;
      console.log("父ID2===>:", row.id);
      // this.p.push({
      //   pid: row.id,
      //   select: row.selected,
      // });
      // console.log("this.p", this.p);
      children.forEach((item) => {
        console.log("下级id===>:", item.id);
        if (type == "all") {
          this.$refs.treeTableRef.toggleRowSelection(item, this.isSelectAll);
        } else {
          this.$refs.treeTableRef.toggleRowSelection(item, row.selected);
        }
        if (item.children) {
          this.getChildren(item.children, item, type);
        }
      });
    },
    selectAll(row) {
      this.isSelectAll = !this.isSelectAll;
      this.tableData.forEach((item) => {
        if (item.children) {
          this.getChildren(item.children, item, "all");
          this.$refs.treeTableRef.toggleRowExpansion(item, item.selected);
        }
      });
      console.log("selectAll===>:", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-table {
  background: #eee;
}
</style>
