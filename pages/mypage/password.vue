<script setup lang="ts">
import { Auth } from '@/service';

const form = ref({
  newPassword: '',
  newPasswordConfirm: ''
});

const onSubmit = () => {
  Auth.updateUserPassword(form.value.newPassword)
    .then(() => {
      Notify.create({
        type: 'positive',
        message: '비밀번호가 변경되었습니다.'
      });

      form.value.newPassword = '';
      form.value.newPasswordConfirm = '';
    })
    .catch((error) => {
      Notify.create({
        type: 'negative',
        message: error.message
      });
    });
};
</script>

<template>
  <AppsBaseCard>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-md">
        <div class="text-h6">비밀번호 변경</div>
        <q-input
          v-model="form.newPassword"
          type="password"
          label="새로운 비밀번호"
          outlined
          dense
        />
        <q-input
          v-model="form.newPasswordConfirm"
          type="password"
          label="새로운 비밀번호 확인"
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
        />
      </q-card-actions>
    </q-form>
  </AppsBaseCard>
</template>

<style scoped></style>
