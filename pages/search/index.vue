<script setup lang="ts">
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPanel,
  AisRefinementList,
  AisPagination,
  AisConfigure
} from 'vue-instantsearch/vue3/es';
import type { PostData } from '~/types/post';

const indexName = 'dev_posts';
const algolia = useAlgoliaRef();

const transformItems = (items: any[]) => {
  return items.map(
    (item) =>
      <PostData>{
        id: item.objectID,
        title: item._snippetResult.title.value,
        content: item._snippetResult.content.value,
        category: item.category,
        tags: item.tags,
        uid: item.uid,
        createdAt: item.createdAt,
        readCount: item.readCount,
        likeCount: item.likeCount,
        bookmarkCount: item.bookmarkCount,
        commentCount: item.commentCount
      }
  );
};
</script>

<template>
  <q-page>
    <ais-instant-search
      :index-name="indexName"
      :search-client="algolia"
    >
      <ais-configure :hits-per-page.camel="8" />
      <div class="row q-col-gutter-x-lg">
        <section class="col-3">
          <q-card
            flat
            bordered
            class="q-pa-md"
          >
            <ais-panel>
              <template #header>카테고리</template>
              <template #default>
                <ais-refinement-list attribute="category" />
              </template>
            </ais-panel>
          </q-card>
          <q-card
            flat
            bordered
            class="q-pa-md q-mt-md"
          >
            <ais-panel>
              <template #header>태그</template>
              <template #default>
                <ais-refinement-list attribute="tags" />
              </template>
            </ais-panel>
          </q-card>
        </section>
        <section class="col-9">
          <ais-search-box />
          <q-separator spaced />
          <ais-hits :transform-items="transformItems">
            <template v-slot="{ items }">
              <template
                v-for="item in items"
                :key="item.id"
              >
                <AppsPostItem v-bind="item" />
              </template>
            </template>
          </ais-hits>

          <div class="pagination flex flex-center q-mt-md">
            <ais-pagination />
          </div>
        </section>
      </div>
    </ais-instant-search>
  </q-page>
</template>

<style scoped></style>
