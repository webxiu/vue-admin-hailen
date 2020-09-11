<template>
  <div class="tree-menu">
    <slot />
    <!-- <div class="xh-menu" v-for="(item,index) in menu" :key="index">
      <span>{{item.title}}</span>
      <span>></span>
      <div class="xh-sub-menu" v-if="item.children">
        <div v-for="(cell,i) in item.children" :key="i" class="xh-sub-menu_item">
          <span>{{item.title}}</span>
          <span>></span>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "TreeMenu",
};
</script>

<style lang="scss" scoped>
.tree-menu {
  width: 160px;
  .xh-menu {
    background: #f60;
    padding: 10px 0;
    position: relative;
    &:hover {
      background: #f0f;
    }
    .xh-sub-menu {
      position: absolute;
      left: 100%;
      top: 0;
      width: 160px;
      .xh-sub-menu_item {
        padding: 10px 0;
        background: #f0f;
        &:hover {
          background: #f60;
        }
      }
    }
  }
}
</style>
