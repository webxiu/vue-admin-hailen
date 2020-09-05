import Layout from '@/layout'

const canvasRouter = {
  path: '/canvas',
  component: Layout,
  name: 'Canvas',
  redirect: '/canvas/index',
  meta: {
    title: 'Canvas',
    icon: 'chart'
  },
  children: [{
    path: '/index',
    name: 'CanvasAnimate',
    meta: {
      title: 'canvas集合',
      icon: 'example',
      noCache: true
    },
    component: () => import('@/views/canvas/index')
  },
  {
    path: '/write',
    name: 'CanvasWrite',
    meta: {
      title: '写字板',
      icon: 'skill',
      noCache: true
    },
    component: () => import('@/views/canvas/write')
  },
  {
    path: '/jsball',
    name: 'CollideBall',
    meta: {
      title: 'JS小球运动',
      icon: 'skill',
      noCache: true
    },
    component: () => import('@/views/canvas/jsball')
  },
  {
    path: '/ball',
    name: 'Ball',
    meta: {
      title: '小球动画',
      icon: 'skill',
      noCache: true
    },
    component: () => import('@/views/canvas/ball')
  }
  ]
}

export default canvasRouter
