/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const directivesRouter = {
  path: "/directive",
  component: Layout,
  redirect: "noRedirect",
  name: "Directives",
  meta: {
    title: "指令",
    icon: "lock"
  },
  children: [
    {
      path: "drag",
      component: () => import("@/views/directive/drag"),
      name: "DragDirective",
      meta: { title: "拖拽指令", icon: "lock" }
    },
    {
      path: "load-img",
      component: () => import("@/views/directive/load-img"),
      name: "LoadImgDirective",
      meta: { title: "图片加载指令", icon: "lock" }
    },
    {
      path: "height-light",
      component: () => import("@/views/directive/height-light"),
      name: "HeightLight",
      meta: { title: "代码高亮指令", icon: "lock" }
    }
  ]
};

export default directivesRouter;
