<script setup lang="ts">
interface Props {
  flat?: boolean;
  bordered?: boolean;
}
withDefaults(defineProps<Props>(), {
  flat: true,
  bordered: true
});
</script>

<template>
  <q-card
    :flat="flat"
    :bordered="bordered"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots">
      {{ name }}
      <slot :name="name"></slot>
    </template>
  </q-card>
</template>

<style scoped></style>
