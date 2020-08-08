/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/base-form',
  name: 'Form',
  meta: { title: '表单', icon: 'nested' },
  children: [
    {
      path: 'base-form',
      component: () => import('@/views/form/base-form'),
      name: 'FormConfig',
      meta: { title: '配置表单' }
    },
    {
      path: 'common',
      component: () => import('@/views/form/common'),
      name: 'FormCommon',
      meta: { title: '通用表单' }
    }
  ]
}
export default formRouter
