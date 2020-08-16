/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const treeRouter = {
  path: '/tree',
  component: Layout,
  redirect: '/tree/default',
  name: 'tree',
  meta: { title: '树', icon: 'tree' },
  children: [
    {
      path: 'default',
      component: () => import('@/views/tree/default'),
      name: 'DefaultTree',
      meta: { title: '默认树' }
    },
    {
      path: 'custom',
      component: () => import('@/views/tree/custom'),
      name: 'CustomTree',
      meta: { title: '数据组合树' }
    }
  ]
}
export default treeRouter
