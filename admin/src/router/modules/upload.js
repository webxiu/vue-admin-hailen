/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const treeRouter = {
  path: '/upload',
  component: Layout,
  redirect: '/upload/single',
  name: 'upload',
  meta: {
    title: '上传',
    icon: 'tree'
  },
  children: [{
    path: 'single',
    component: () => import('@/views/upload/single'),
    name: 'SingleUpload',
    meta: {
      title: '单文件上传',
      icon: 'table'
    }
  },
  {
    path: 'bigFileUpload',
    component: () => import('@/views/upload/bigFileUpload'),
    name: 'BigFileUpload',
    meta: {
      title: '断点续传'
    }
  },
  {
    path: 'qiniu',
    component: () => import('@/views/upload/qiniu'),
    name: 'QiniuUpload',
    meta: {
      title: '七牛上传'
    }
  }
  ]
}
export default treeRouter
