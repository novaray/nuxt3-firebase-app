<script setup lang="ts">
import { Post } from '@/service';
import type { PostTag } from '@/types/tag';

interface Props {
  tags: string[];
}
const props = defineProps<Props>();

interface Emits {
  (event: 'openWriteDialog'): void;
  (event: 'update:tags', title: string[]): void;
}
const emit = defineEmits<Emits>();

const { tagField, addTag, removeTag } = useTag({
  tags: toRef(props, 'tags'),
  updateTags: (tags) => emit('update:tags', tags),
  maxLengthMessage: '태그는 10개까지만 등록할 수 있습니다.'
});

const postTags = ref<PostTag[]>([]);
const tagsLoading = ref(false);
const getTags = () => {
  tagsLoading.value = true;
  postTags.value = [];
  Post.getTags()
    .then((tags) => (postTags.value = tags))
    .catch(useFireStoreError)
    .finally(() => (tagsLoading.value = false));
};
getTags();
</script>

<template>
  <StickySideBar>
    <q-btn
      padding="8px 12px 8px 8px"
      unelevated
      color="primary"
      text-color="white"
      class="full-width"
      @click="$emit('openWriteDialog')"
    >
      <q-avatar
        class="q-mr-sm"
        color="white"
        text-color="primary"
        size="22px"
      >
        <q-icon
          name="edit"
          size="14px"
        />
      </q-avatar>
      <span class="text-weight-bold">새 포스트 작성하기</span>
    </q-btn>
    <q-card
      class="q-mt-md bg-grey-1"
      bordered
      flat
    >
      <q-card-section class="flex items-center q-pb-none">
        <div class="text-weight-bold">태그</div>
        <q-space />
        <q-btn
          icon="refresh"
          dense
          size="sm"
          flat
          round
          color="grey"
          @click="getTags"
        />
      </q-card-section>
      <q-card-section class="q-mb-sm">
        <q-card
          class="q-px-sm"
          bordered
          flat
          square
        >
          <q-input
            v-model="tagField"
            borderless
            dense
            input-style="font-size: 12px"
            placeholder="태그로 검색해보세요"
            @keydown.enter.prevent="addTag"
          />
          <div class="q-gutter-sm q-pb-sm">
            <q-btn
              v-for="(tag, index) in tags"
              :key="tag"
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
              @click="removeTag(index)"
            >
              {{ tag }}
              <q-icon
                name="clear"
                size="12px"
                color="grey"
              />
            </q-btn>
          </div>
        </q-card>
      </q-card-section>
      <div
        v-if="tagsLoading"
        class="flex flex-center"
      >
        loading...
      </div>
      <q-list padding>
        <q-item
          v-for="{ name, count } in postTags"
          :key="name"
          v-ripple
          clickable
          dense
          @click="addTag(name)"
        >
          <q-item-section class="text-teal text-caption">{{ name }}</q-item-section>
          <q-item-section
            side
            class="text-teal text-caption"
          >
            {{ count }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<style scoped></style>
