<script setup lang="ts">
interface Props {
  code: string;
}
const props = defineProps<Props>();

const errorMessage = computed(() => ErrorMessages.getErrorMessage(props.code));
</script>

<template>
  <div
    v-if="code"
    class="text-red text-center"
  >
    {{ errorMessage }}
  </div>
</template>

<style scoped></style>
