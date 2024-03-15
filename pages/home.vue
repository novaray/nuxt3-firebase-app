<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  width: '600px'
});
</script>

<template>
  <q-page padding>
    <div class="text-h4">Home</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <q-card
        v-for="id in 100"
        :key="id"
      >
        <q-card-section>{{ id }}번 게시글</q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<style scoped></style>
