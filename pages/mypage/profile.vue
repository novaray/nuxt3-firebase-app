<script setup lang="ts">
import { Auth } from '@/service';

const displayName = ref('');
const disableUpdateDisplayName = computed(() => !displayName.value);
const onSubmitProfile = () => {
  Auth.updateUserProfile(displayName.value)
    .then(() => {
      Notify.create({
        message: '프로필이 변경되었습니다.'
      });
    })
    .catch((error) => {
      Notify.create({
        type: 'negative',
        message: error.message
      });
    });
};

const email = ref('');
const disableUpdateEmail = computed(() => !email.value);
const onSubmitEmail = () => {
  Auth.updateUserEmail(email.value)
    .then(() => {
      Notify.create({
        message: '이메일이 변경되었습니다.'
      });
    })
    .catch((error) => {
      Notify.create({
        type: 'negative',
        message: error.message
      });
    });
};

const authStore = useAuthStore();
watchEffect(() => {
  displayName.value = authStore.user?.displayName ?? '';
  email.value = authStore.user?.email ?? '';
});
</script>

<template>
  <div class="q-gutter-y-md">
    <AppsBaseCard>
      <q-form @submit.prevent="onSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input
            v-model="displayName"
            label="닉네임"
            outlined
            dense
          />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn
            type="submit"
            label="저장하기"
            color="primary"
            flat
            :disable="disableUpdateDisplayName"
          />
        </q-card-actions>
      </q-form>
    </AppsBaseCard>
    <AppsBaseCard>
      <q-form @submit.prevent="onSubmitEmail">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input
            v-model="email"
            label="이메일"
            outlined
            dense
          />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn
            type="submit"
            label="저장하기"
            color="primary"
            flat
            :disable="disableUpdateEmail"
          />
        </q-card-actions>
      </q-form>
    </AppsBaseCard>
  </div>
</template>

<style scoped></style>
