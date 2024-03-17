<script setup lang="ts">
interface Props {
  items: any[];
}

defineProps<Props>();
</script>

<template>
  <q-list
    bordered
    separator
  >
    <AppsPostItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
    />
  </q-list>
</template>

<style scoped></style>
