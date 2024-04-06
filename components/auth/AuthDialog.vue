<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true });

const viewMode = ref('AuthSignInForm'); // 'AuthSignInForm' | 'AuthSignUpForm' | 'AuthFindPasswordForm'
const changeViewMode = (mode: string) => (viewMode.value = mode);

// Nuxt 폴더구조상 Auth prefix가 붙기에 AuthSignInForm, AuthSignUpForm, AuthFindPasswordForm으로 설정.
const authViewComponents: Record<string, object> = {
  AuthSignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  AuthSignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
  AuthFindPasswordForm: defineAsyncComponent(() => import('./FindPasswordForm.vue'))
};

const onCloseDialog = () => {
  modelValue.value = false;
};
</script>

<template>
  <q-dialog
    v-model="modelValue"
    transition-show="none"
    transition-hide="none"
    @hide="changeViewMode('AuthSignInForm')"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <!-- v-if 조건부 렌더링 -->
        <!--<AuthSignInForm-->
        <!--  v-if="viewMode === 'AuthSignInForm'"-->
        <!--  @change-view="changeViewMode"-->
        <!--/>-->
        <!--<AuthSignUpForm-->
        <!--  v-else-if="viewMode === 'AuthSignUpForm'"-->
        <!--  @change-view="changeViewMode"-->
        <!--/>-->
        <!--<AuthFindPasswordForm-->
        <!--  v-else-->
        <!--  @change-view="changeViewMode"-->
        <!--/>-->
        <!-- 동적 비동기 컴포넌트 -->
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
          @close-dialog="onCloseDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
