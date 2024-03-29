<script setup lang="ts">
import { getCategories } from '~/service/category';
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
});

const categories = getCategories();
const form = ref(getInitialForm());
const tagField = ref('');

const removeTag = () => {
  console.log('removeTag');
};

const onHide = () => {
  form.value = getInitialForm();
  tagField.value = '';
};
</script>

<template>
  <q-dialog
    v-bind="$attrs"
    persistent
    @hide="onHide"
  >
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
        />
      </q-toolbar>
      <q-separator />
      <q-form class="q-pa-md q-gutter-y-sm">
        <q-input
          v-model="form.title"
          outlined
          placeholder="제목"
        />
        <q-select
          v-model="form.category"
          :options="categories"
          outlined
        >
          <template
            v-if="!form.category"
            #selected
          >
            <span class="text-grey-7">카테고리를 선택하세요.</span>
          </template>
        </q-select>
        <q-input
          v-model="form.content"
          type="textarea"
          outlined
          placeholder="내용을 작성해주세요."
        />
        <q-input
          v-model="tagField"
          prefix="#"
          outlined
          placeholder="태그를 입력해주세요 (입력 후 Enter)."
        />
        <q-chip
          outline
          dense
          color="teal"
          removable
          @remove="removeTag"
        >
          vuejs
        </q-chip>
      </q-form>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="취소하기"
        />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
