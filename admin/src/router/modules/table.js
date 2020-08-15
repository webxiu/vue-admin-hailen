/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/base-table',
  name: 'Table',
  meta: { title: '表格', icon: 'table' },
  children: [
    {
      path: 'base-table',
      component: () => import('@/views/table/base-table'),
      name: 'BaseTable',
      meta: { title: '配置表格' }
    },
    {
      path: 'tree-table',
      component: () => import('@/views/table/tree-table'),
      name: 'TreeTable',
      meta: { title: '表格树' }
    },
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table'),
      name: 'DynamicTable',
      meta: { title: '动态表格' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: '拖拽表格' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '行内编辑' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '复杂表格' }
    }
  ]
}
export default tableRouter
