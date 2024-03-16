<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true });

const viewMode = ref('AuthSignInForm'); // 'AuthSignInForm' | 'AuthSignUpForm' | 'AuthFindPasswordForm'
const changeViewMode = (mode: string) => (viewMode.value = mode);
</script>

<template>
  <q-dialog
    v-model="modelValue"
    transition-show="none"
    transition-hide="none"
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
        <AuthSignInForm
          v-if="viewMode === 'AuthSignInForm'"
          @change-view="changeViewMode"
        />
        <AuthSignUpForm
          v-else-if="viewMode === 'AuthSignUpForm'"
          @change-view="changeViewMode"
        />
        <AuthFindPasswordForm
          v-else
          @change-view="changeViewMode"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
