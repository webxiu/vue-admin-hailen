import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

import defaultRoutes from './defaultRoutes'

const modulesFiles = require.context('./modules', true, /\.js$/)
const routerModules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  // modules[moduleName] = value.default
  modules.push(value.default)
  return modules
}, [])

/**
 * 提示: 子菜单仅在路由 children.length >= 1 时出现
 * 详情查看 see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则不会在侧边栏中显示该项（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路径时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了noRedirect，则noRedirect将不会在breadcrumb中重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               在侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 在侧边栏中显示的图标
    noCache: true                如果设置为true，则不会缓存该页（默认值为false）
    affix: true                  如果设置为true，则标签将在tags视图中粘贴(不能删除)
    breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * 常量路由Routes
 * 没有权限要求的基本页面, 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * 异步路由Routes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 模块化路由
  ...routerModules,

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 将总是显示根菜单
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      roles: ['admin', 'editor'] // 你可以在根导航中设置角色
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/default/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // 或者只能在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/default/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // 如果不设置角色，则表示:此页面不需要权限
        }
      },
      {
        path: 'role',
        component: () => import('@/views/default/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: { title: '错误页面', icon: '404' },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: '错误日志', icon: 'bug' }
      }
    ]
  },
  // 项目默认存在的路由页面
  ...defaultRoutes,
  // 404 页面必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
