<template>
  <div class="menu-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MenuItem",
};
</script>

<style lang="scss" scoped>
.menu-item {
  line-height: 50px;
  text-align: center;
  &:hover {
    background: #f0f;
  }
}
</style>
