import Layout from "@/layout";

// 有权限的路由配置
export default [
  {
    path: "/default",
    component: Layout,
    redirect: "/default/page",
    alwaysShow: true, // 将总是显示根菜单
    name: "Default",
    meta: {
      title: "默认菜单",
      icon: "lock",
      roles: ["admin", "editor"] // 你可以在根导航中设置角色
    },
    children: [
      {
        path: "documentation",
        component: () => import("@/views/default/documentation/index"),
        name: "Documentation",
        meta: { title: "文档", icon: "documentation", affix: true }
      },
      {
        path: "upload",
        component: () => import("@/views/default/qiniu/upload"),
        name: "QiniuUpload",
        meta: { title: "七牛上传", icon: "table" }
      },
      {
        path: "profile",
        component: () => import("@/views/default/profile/index"),
        name: "Profile",
        meta: { title: "简介", icon: "user", noCache: true }
      },
      {
        path: "menu1",
        component: () => import("@/views/default/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "菜单1", icon: "nested" },
        redirect: "/nested/menu1/menu1-1",
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/default/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "菜单1-1", icon: "nested" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/default/nested/menu1/menu1-2"),
            name: "Menu1-2",
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "菜单1-2", icon: "nested" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/default/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "菜单1-2-1", icon: "nested" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/default/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "菜单1-2-2", icon: "nested" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/default/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "菜单1-3", icon: "nested" }
          }
        ]
      },
      {
        path: "menu2",
        name: "Menu2",
        component: () => import("@/views/default/nested/menu2/index"),
        meta: { title: "菜单2", icon: "nested" }
      },
      {
        path: "icon",
        component: () => import("@/views/default/icons/index"),
        name: "Icons",
        meta: { title: "图标", icon: "icon", noCache: true }
      },
      {
        path: "create",
        component: () => import("@/views/default/example/create"),
        name: "CreateArticle",
        meta: { title: "创建文章", icon: "edit" }
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/default/example/edit"),
        name: "EditArticle",
        meta: {
          title: "编辑文章",
          noCache: true,
          activeMenu: "/example/list"
        },
        hidden: true
      },
      {
        path: "list",
        component: () => import("@/views/default/example/list"),
        name: "ArticleList",
        meta: { title: "文章列表", icon: "list" }
      },
      {
        path: "tab",
        component: () => import("@/views/default/tab/index"),
        name: "Tab",
        meta: { title: "选项卡", icon: "tab" }
      },
      {
        path: "export-excel",
        component: () => import("@/views/default/excel/export-excel"),
        name: "ExportExcel",
        meta: { title: "导出Excel", icon: "pdf" }
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/default/excel/select-excel"),
        name: "SelectExcel",
        meta: { title: "导出选定项", icon: "pdf" }
      },
      {
        path: "export-merge-header",
        component: () => import("@/views/default/excel/merge-header"),
        name: "MergeHeader",
        meta: { title: "合并页眉", icon: "pdf" }
      },
      {
        path: "upload-excel",
        component: () => import("@/views/default/excel/upload-excel"),
        name: "UploadExcel",
        meta: { title: "上传Excel", icon: "pdf" }
      },
      {
        path: "download",
        component: () => import("@/views/default/zip/index"),
        name: "ExportZip",
        meta: { title: "导出Zip", icon: "pdf" }
      },
      {
        path: "pdf",
        component: () => import("@/views/default/pdf/index"),
        name: "PDF",
        meta: { title: "PDF文档", icon: "pdf" }
      },
      {
        // 下载隐藏
        path: "/pdf/download",
        component: () => import("@/views/default/pdf/download"),
        hidden: true
      },
      {
        path: "theme",
        component: () => import("@/views/default/theme/index"),
        name: "Theme",
        meta: { title: "主题", icon: "theme" }
      },
      {
        path: "clipboard",
        component: () => import("@/views/default/clipboard/index"),
        name: "ClipboardDemo",
        meta: { title: "剪切板", icon: "clipboard" }
      },
      {
        path: "https://github.com/PanJiaChen/vue-element-admin",
        meta: { title: "外部链接", icon: "link" }
      },
      {
        path: "guide",
        component: () => import("@/views/default/guide/index"),
        name: "Guide",
        meta: { title: "指南", icon: "guide", noCache: true }
      }
    ]
  }
];
