import createLogger from 'vuex/dist/logger';
<template>
  <div class="app-container tree-table">
    <SelectTable :table-data="tableData" :column-config="columnConfig" :tree-props="treeProps" />
  </div>
</template>

<script>
import SelectTable from '../components/SelectTable'
export default {
  name: 'TreeTable',
  components: {
    SelectTable
  },
  data() {
    const self = this
    return {
      treeProps: { children: 'children', hasChildren: 'hasChildren' },
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          children: [
            {
              id: 11,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 12,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 2,
          date: '三级',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          children: [
            {
              id: 21,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 22,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 221,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [
                    {
                      id: 2211,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                      id: 2212,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }
                  ]
                },
                {
                  id: 222,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          children: [
            {
              id: 41,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 42,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        }
      ],
      columnConfig: [
        {
          type: 'selection',
          minWidth: '50',
          align: 'center',
          selectable: function(row, index) {
            // console.log('this', row, index, self)
            let flag = true
            for (let i = 0; i < self.tableData.length; i++) {
              if (
                row.parentId !== 0 &&
                row.selected === true &&
                row.child != 'child'
              ) {
                flag = false
              }
            }
            return flag
          }
        },
        { prop: 'date', label: '日期', minWidth: '100', handle: function() {
          console.log('arguments', arguments)
        } },
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'address', label: '地址', minWidth: '100' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
