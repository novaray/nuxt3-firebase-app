<script setup lang="ts">
const { data, pending, error, refresh, execute } = useAsyncData(
  'test1',
  () => $fetch('https://jsonplaceholder.typicode.com/todos/1'),
  {
    immediate: false
  }
);

const onClickRefresh = () => {
  refresh();
  execute();
};
</script>

<template>
  <q-page padding>
    <div class="text-h4">useAsyncData</div>
    <q-separator />

    <p>data: {{ data }}</p>
    <p>pending: {{ pending }}</p>
    <p>error: {{ error }}</p>
    <p>refresh: {{ refresh }}</p>
    <button @click="onClickRefresh">refresh</button>
  </q-page>
</template>

<style scoped></style>
