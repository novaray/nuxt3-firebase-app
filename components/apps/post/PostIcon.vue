<script setup lang="ts">
interface Props {
  name: string;
  label?: string;
  tooltip?: string;
}

defineProps<Props>();
</script>

<template>
  <q-icon
    :name="name"
    color="grey"
    size="xs"
    v-bind="$attrs"
  />
  <span
    v-if="label"
    class="text-grey q-ml-xs text-body2"
    >{{ label }}</span
  >
  <q-tooltip
    v-if="tooltip"
    :offset="[0, 4]"
  >
    {{ tooltip }}
  </q-tooltip>
</template>

<style scoped></style>
