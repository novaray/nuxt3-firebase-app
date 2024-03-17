<script setup lang="ts"></script>

<template>
  <aside class="sticky-side-bar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sticky-side-bar {
  position: sticky;
  top: 66px;
  z-index: 2;
  height: fit-content !important;
}
</style>
