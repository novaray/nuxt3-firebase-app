<script setup lang="ts">
import { getCategories } from '~/service/category';

// interface Props {
//   title: string;
//   category: string;
//   content: string;
//   tags: string[];
// }
// const props = defineProps<Props>();

// interface Emits {
//   (event: 'update:title', title: string): void;
//   (event: 'update:category', title: string): void;
//   (event: 'update:content', title: string): void;
//   (event: 'update:tags', title: string[]): void;
// }
// const emit = defineEmits<Emits>();
//
// const titleModel = computed({
//   get: () => props.title,
//   set: (value) => emit('update:title', value)
// });
// const categoryModel = computed({
//   get: () => props.title,
//   set: (value) => emit('update:title', value)
// });
// const contentModel = computed({
//   get: () => props.title,
//   set: (value) => emit('update:title', value)
// });

const titleModel = defineModel<string>('title', { required: true });
const categoryModel = defineModel<string>('category', { required: true });
const contentModel = defineModel<string>('content', { required: true });
const tagsModel = defineModel<string[]>('tags', { required: true });

const tagField = ref('');

const removeTag = () => {
  console.log('removeTag');
};

const categories = getCategories();
</script>

<template>
  <q-form>
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
      />
      <q-select
        v-model="categoryModel"
        :options="categories"
        outlined
        emit-value
        map-options
      >
        <template
          v-if="!categoryModel"
          #selected
        >
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <q-input
        v-model="contentModel"
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
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
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
      </slot>
    </q-card-actions>
  </q-form>
</template>

<style scoped></style>
