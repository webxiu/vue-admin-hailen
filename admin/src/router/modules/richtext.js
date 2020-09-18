/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const richtextRouter = {
  path: '/richtext',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Richtexts',
  meta: {
    title: '富文本',
    icon: 'education'
  },
  children: [
    {
      path: 'wang-editor',
      component: () => import('@/views/richtext/wang-editor'),
      name: 'WangEditor',
      meta: { title: 'WangEditor', icon: 'education' }
    },
    {
      path: 'tinymce',
      component: () => import('@/views/components/tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'Tinymce', icon: 'education' }
    }
  ]
}

export default richtextRouter
