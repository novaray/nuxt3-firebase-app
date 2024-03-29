<script setup lang="ts">
import StickySideBar from '~/components/StickySideBar.vue';
import { getCategories } from '~/service/category';

const categories = getCategories();
</script>

<template>
  <StickySideBar>
    <q-card
      flat
      bordered
    >
      <q-list
        bordered
        separator
      >
        <q-item
          v-ripple
          clickable
          :active="true"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="category in categories"
          :key="category.value"
          v-ripple
          clickable
        >
          <q-item-section>{{ category.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>
