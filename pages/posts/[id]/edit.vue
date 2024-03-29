<script setup lang="ts">
definePageMeta({
  width: '800px'
});

const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
});

const form = ref(getInitialForm());
</script>

<template>
  <q-page padding>
    <AppsBaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <AppsPostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
      >
        <template #actions>
          <q-btn
            v-close-popup
            flat
            label="취소"
          />
          <q-btn
            type="submit"
            flat
            label="수정"
            color="primary"
          />
        </template>
      </AppsPostForm>
    </AppsBaseCard>
  </q-page>
</template>

<style scoped></style>
