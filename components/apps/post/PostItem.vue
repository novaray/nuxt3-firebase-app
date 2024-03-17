<script setup lang="ts">
interface Props {
  id: string;
  title: string;
  content: string;
  category: string;
  createTime: Date;
  tags: string[];
  uid: string;
  readCount?: number;
  commentCount?: number;
  likeCount?: number;
  bookmarkCount?: number;
}

withDefaults(defineProps<Props>(), {
  readCount: 0,
  commentCount: 0,
  likeCount: 0,
  bookmarkCount: 0
});
</script>

<template>
  <!-- q-item 컴포넌트는 기본적으로 div 태그이나, to props를 사용하면 a(앵커) 태그로 변환됨.-->
  <q-item
    class="bg-white q-pt-md"
    clickable
    :to="`/posts/${id}`"
  >
    <q-item-section
      avatar
      top
    >
      <q-avatar>
        <img
          src="https://cdn.quasar.dev/img/boy-avatar.png"
          alt=""
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>닉네임 &middot;&nbsp;3일 전</span>
        <q-chip
          class="q-ml-sm"
          dense
          color="primary"
          text-color="white"
        >
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span
          v-for="tag in tags"
          :key="tag"
          class="q-mr-sm"
        >
          #{{ tag }}&nbsp;
        </span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">
        {{ content }}
      </div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon
              name="sym_o_visibility"
              color="grey"
              size="xs"
            />
            <span class="text-grey q-ml-xs text-body2">{{ readCount }}</span>
            <q-tooltip :offset="[0, 4]">조회수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon
              name="sym_o_sms"
              color="grey"
              size="xs"
            />
            <span class="text-grey q-ml-xs text-body2">{{ commentCount }}</span>
            <q-tooltip :offset="[0, 4]">댓글수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent
            >
              <q-icon
                name="sym_o_favorite"
                color="grey"
                size="xs"
              />
              <span class="text-grey q-ml-xs text-body2">{{ likeCount }}</span>
              <q-tooltip :offset="[0, 4]">좋아요</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent
            >
              <q-icon
                name="sym_o_bookmark"
                color="grey"
                size="xs"
              />
              <span class="text-grey q-ml-xs text-body2">{{ bookmarkCount }}</span>
              <q-tooltip :offset="[0, 4]">북마크</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
