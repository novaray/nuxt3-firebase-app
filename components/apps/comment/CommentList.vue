<script setup lang="ts">
interface Props {
  items: any[];
}

defineProps<Props>();
</script>

<template>
  <q-list
    class="q-mt-lg bg-white"
    bordered
    separator
  >
    <AppsCommentItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </q-list>
</template>

<style scoped></style>
