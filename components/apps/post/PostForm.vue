<script setup lang="ts">
import { getCategories } from '@/service/category';
import { ValidationRules } from '@/utils/validationRules';

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

interface Props {
  loading: boolean;
}
defineProps<Props>();

interface Emits {
  (event: 'submit'): void;
}
const emit = defineEmits<Emits>();

const titleModel = defineModel<string>('title', { required: true });
const categoryModel = defineModel<string>('category', { required: true });
const contentModel = defineModel<string>('content', { required: true });
const tagsModel = defineModel<string[]>('tags', { required: true });

const removeTag = (index: number) => {
  tagsModel.value.splice(index, 1);
};

const categories = getCategories();

const onSubmit = () => {
  if (!contentModel.value) {
    return Notify.create({
      type: 'negative',
      message: '내용을 작성하세요.'
    });
  }

  emit('submit');
};

const tagField = ref('');
const onRegisterTag = () => {
  const tagValue = tagField.value.replace(/ /g, '');
  if (!tagValue) {
    return;
  }

  if (tagsModel.value.length >= 10) {
    return Notify.create({
      type: 'negative',
      message: '태그는 10개까지만 등록할 수 있습니다.'
    });
  }

  if (!tagsModel.value.includes(tagValue)) {
    tagsModel.value.push(tagValue);
  }

  tagField.value = '';
};
</script>

<template>
  <q-form @submit.prevent="onSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[ValidationRules.validateRequired]"
      />
      <q-select
        v-model="categoryModel"
        :options="categories"
        outlined
        emit-value
        map-options
        :rules="[ValidationRules.validateRequired]"
      >
        <template
          v-if="!categoryModel"
          #selected
        >
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <q-input
        v-model="tagField"
        prefix="#"
        outlined
        placeholder="태그를 입력해주세요 (입력 후 Enter)."
        @keydown.enter.prevent="onRegisterTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        outline
        dense
        color="teal"
        removable
        @remove="removeTag(index)"
      >
        {{ tag }}
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
          :loading="loading"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<style scoped></style>
