/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const chartsRouter = {
  path: "/charts",
  component: Layout,
  redirect: "noRedirect",
  name: "Charts",
  meta: {
    title: "图表",
    icon: "chart"
  },
  children: [
    {
      path: "keyboard",
      component: () => import("@/views/default/charts/keyboard"),
      name: "KeyboardChart",
      meta: { title: "键盘图表", noCache: true }
    },
    {
      path: "line",
      component: () => import("@/views/default/charts/line"),
      name: "LineChart",
      meta: { title: "线图表", noCache: true }
    },
    {
      path: "mix-chart",
      component: () => import("@/views/default/charts/mix-chart"),
      name: "MixChart",
      meta: { title: "混合图表", noCache: true }
    }
  ]
};

export default chartsRouter;
