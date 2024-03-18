<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  width: '800px'
});
</script>

<template>
  <q-page padding>
    <AppsPostDetails />
    <q-separator class="q-my-xl" />
    <AppsPostComments />
  </q-page>
</template>

<style scoped lang="scss"></style>
