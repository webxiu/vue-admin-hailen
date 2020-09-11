<template>
  <div class="xh-menu">
    <tree-menu>
      <template v-for="item of menu">
        <menu-item class="menu-item" v-if="!item.children" :key="item.id">{{ item.title }}</menu-item>
        <re-sub-menu v-else :key="item.id" :data="item"></re-sub-menu>
      </template>
    </tree-menu>
  </div>
</template>

<script>
import TreeMenu from "./TreeMenu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import ReSubMenu from "./ReSubMenu";

export default {
  name: "Menu",
  components: { TreeMenu, MenuItem, SubMenu, ReSubMenu },
  data() {
    return {
      menu: [
        {
          id: 456,
          title: "一级菜单1",
          children: [
            {
              id: 43,
              title: "二级菜单1",
              children: [
                {
                  id: 633,
                  title: "二级菜单3",
                  children: [
                    { id: 543, title: "二级菜单1" },
                    { id: 545, title: "二级菜单2" },
                    { id: 445355, title: "二级菜单3" },
                  ],
                },
              ],
            },
            { id: 23434, title: "二级菜单2" },
            {
              id: 890,
              title: "二级菜单3",
              children: [
                { id: 23, title: "二级菜单1" },
                { id: 5, title: "二级菜单2" },
                { id: 45, title: "二级菜单3" },
              ],
            },
          ],
        },
        { id: 233424, title: "一级菜单2" },
        { id: 34234, title: "一级菜单3" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.xh-menu {
  width: 160px;

  background: #f60;
  position: relative;
  line-height: 50%;

  // .xh-sub-menu {
  //   position: absolute;
  //   left: 100%;
  //   top: 0;
  //   width: 160px;
  //   .xh-sub-menu_item {
  //     padding: 10px 0;
  //     background: #f0f;
  //     &:hover {
  //       background: #f60;
  //     }
  //   }
  // }
}
</style>
