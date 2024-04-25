<script setup lang="ts">
import type { PostData } from '~/types/post';

interface Props {
  items: PostData[];
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
