<template>
  <sub-menu>
    <template #title>{{ data.title }}</template>
    <template v-for="c of data.children">
      <menu-item :key="c.id" v-if="!c.children">{{ c.title }}</menu-item>
      <re-sub-menu v-else :key="c.id" :data="c"></re-sub-menu>
    </template>
  </sub-menu>
</template>

<script>
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import ReSubMenu from "./ReSubMenu";
export default {
  name: "ReSubMenu",
  props: { data: Object },
  components: { SubMenu, MenuItem, ReSubMenu },
};
</script>

<style lang="scss" scoped>
.sub-menu {
  position: relative;
  .title {
    line-height: 50px;
    text-align: center;
    .icon {
      position: absolute;
      top: 0;
      right: 15px;
    }
  }
  .sub-item {
    position: absolute;
    left: 100%;
    top: 0;
    width: 100%;
    background-color: #f98;
  }
}
</style>
