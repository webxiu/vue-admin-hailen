/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const qiniuRouter = {
  path: "/qiniu",
  component: Layout,
  redirect: "/qiniu/upload",
  name: "Table",
  meta: { title: "七牛", icon: "table" },
  children: [
    {
      path: "upload",
      component: () => import("@/views/default/qiniu/upload"),
      name: "QiniuUpload",
      meta: { title: "七牛上传" }
    }
  ]
};
export default qiniuRouter;
