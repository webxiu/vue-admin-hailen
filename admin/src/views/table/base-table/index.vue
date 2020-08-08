<template>
  <div>
    <BaseTable
      :table-data="tableData"
      :prop-config="propConfig"
      :pagine-config="pagineConfig"
      :column-config="columnConfig"
      :get-data="getTableData"
      :total="total"
      @selectionChange="selectionChange"
    >
      <template>
        <el-table-column label="插槽-右" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="line"
              size="small"
              @click="clickHandle(scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </template>
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
export default {
  name: 'Tables',
  components: { BaseTable },
  data() {
    return {
      total: 10,
      tableData: [],
      propConfig: {
        pagination: true, // 是否显示分页
        border: true,
        fit: true
      },
      pagineConfig: {
        show: true, // 是否显示分页
        small: true, // 小型分页
        background: true, // 按钮背景
        layout: 'total,prev, pager, next, sizes, jumper'
      },
      columnConfig: [
        { type: 'selection', label: '序号', minWidth: '100' },
        { prop: 'w_id', label: '序号', minWidth: '100' },
        {
          prop: 'w_order_num',
          label: '订单号',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_username',
          label: '用户名',
          minWidth: '100',
          sortable: true
        },
        { prop: 'w_phone', label: '手机号', minWidth: '120', sortable: true },
        { prop: 'w_address', label: '地址', minWidth: '180', sortable: true },
        { prop: 'w_detail', label: '详情', minWidth: '100', sortable: true },
        { prop: 'w_product', label: '产品', minWidth: '100', sortable: true },
        {
          prop: 'w_import_date',
          label: '导入日期',
          minWidth: '100',
          sortable: true
        },
        { prop: 'w_img_url', label: '地址', minWidth: '100', sortable: true },
        {
          prop: 'w_update_status',
          label: '订单状态',
          minWidth: '100',
          sortable: true,
          render: function(row, column, cellValue) {
            if (row.w_update_status === 0) {
              return <span style='color: #f60'>{row.w_update_status}</span>
            } else if (row.w_update_status === 1) {
              return <span style='color: #f0f'>{row.w_update_status}</span>
            } else if (row.w_update_status === 2) {
              return <span style='color: #0f0'>{row.w_update_status}</span>
            }
          }
        },
        {
          prop: 'w_trackingmore_request',
          label: '物流状态',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_paging_request',
          label: '分页请求',
          minWidth: '100',
          sortable: true
        },
        { prop: 'w_wl_status', label: '状态', minWidth: '100', sortable: true },

        {
          prop: 'w_modify_date',
          label: '修改日期',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_isShow',
          label: '显示订单',
          minWidth: '100',
          sortable: true,
          render: function(row, column, cellValue) {
            if (row.status === 0) {
              return <span style='color: #f60'>{row.w_isShow}</span>
            } else if (row.w_isShow === 1) {
              return <span style='color: #f0f'>{row.w_isShow}</span>
            } else if (row.w_isShow === 2) {
              return <span style='color: #0f0'>{row.w_isShow}</span>
            }
          }
        },
        {
          prop: 'w_isShow_date',
          label: '是否显示日期',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_delete_date',
          label: '删除日期',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_praise',
          label: '是否点赞过',
          minWidth: '100',
          sortable: true
        },
        {
          prop: 'w_praise_date',
          label: '点赞日期',
          minWidth: '100',
          align: 'right',
          headerAlign: 'left',
          sortable: true
        }
      ]
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData(page = 1, page_size = 10) {
      fetch(
        'http://127.0.0.1/api/user.php?page=' + page + '&page_size=' + page_size
      )
        .then(res => res.json())
        .then(res => {
          this.tableData = res.data
          this.total = res.total
          console.log('数据', res)
        })
    },
    clickHandle(row) {
      console.log(998, row)
    },
    selectionChange(row) {
      console.log('选择框', row)
    }
  }
}
</script>
<style scoped>
.address {
  color: #00f;
}
</style>
