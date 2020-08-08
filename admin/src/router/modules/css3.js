/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/css3',
  component: Layout,
  redirect: 'noRedirect',
  name: 'CSS3',
  meta: {
    title: 'CSS3',
    icon: 'chart'
  },
  children: [
    {
      path: 'animation',
      component: () => import('@/views/css3/animation'),
      name: 'CssAnimation',
      meta: { title: 'CSS动画', noCache: true }
    },
    {
      path: 'style',
      component: () => import('@/views/css3/style'),
      name: 'CssStyle',
      meta: { title: 'CSS样式', noCache: true }
    }
  ]
}

export default chartsRouter
