<script setup lang="ts">
import { Notify } from 'quasar';
import { Auth } from '@/service';
import type { SignUp } from '@/types/sign';

interface Emits {
  (event: 'changeView', view: string): void;
  (event: 'closeDialog'): void;
}
const emit = defineEmits<Emits>();

const form = ref<SignUp>({
  nickname: '',
  email: '',
  password: ''
});

const onSubmit = () => {
  Auth.signUpWithEmail(form.value).then(() => {
    Notify.create({
      type: 'positive',
      message: '가입을 환영합니다! 🎉'
    });
    emit('closeDialog');
  });
};
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form
      class="q-gutter-y-md"
      @submit.prevent="onSubmit"
    >
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
      />
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
      />
      <q-btn
        type="submit"
        label="가입하기"
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
        @click="$emit('changeView', 'AuthSignInForm')"
      />
    </q-form>
  </div>
</template>

<style scoped></style>
