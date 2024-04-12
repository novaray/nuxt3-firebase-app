<script setup lang="ts">
import { Auth } from '@/service';

interface Emits {
  (event: 'closeDialog'): void;
  (event: 'changeView', view: string): void;
}
const emit = defineEmits<Emits>();

const email = ref('');
const onSubmit = () => {
  Auth.sendPasswordReset(email.value).then(() => {
    Notify.create({
      type: 'positive',
      message: '이메일로 비밀번호 재설정 링크를 보냈어요! 📧'
    });
    emit('closeDialog');
  });
};
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">비밀번호 찾기</div>
    <q-form
      class="q-gutter-y-md"
      @submit.prevent="onSubmit"
    >
      <q-input
        v-model="email"
        placeholder="가입한 이메일"
        outlined
        dense
      />
      <q-btn
        type="submit"
        label="비밀번호 재설정"
        class="full-width"
        unelevated
        color="primary"
      />
      <q-separator />
      <q-btn
        label="로그인하기"
        class="full-width"
        unelevated
        flat
        @click="emit('changeView', 'AuthSignInForm')"
      />
    </q-form>
  </div>
</template>

<style scoped></style>
