<script setup lang="ts">
import StickySideBar from '~/components/StickySideBar.vue';
import { getCategories } from '~/service/category';

const modelValue = defineModel<string | null>({ required: true });

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
          :active="modelValue === null"
          clickable
          @click="modelValue = null"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="category in categories"
          :key="category.value"
          v-ripple
          :active="modelValue === category.value"
          clickable
          @click="modelValue = category.value"
        >
          <q-item-section>{{ category.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>
