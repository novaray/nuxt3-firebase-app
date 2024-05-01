<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

interface Props {
  content?: string;
}
const props = defineProps<Props>();

const editor = useEditor({
  content: props?.content ?? '',
  extensions: [StarterKit, Link, Image],
  editable: false
});

watch(
  () => props.content,
  (value) => {
    if (value == null) {
      return;
    }

    editor.value?.commands.setContent(value);
  }
);
</script>

<template>
  <ClientOnly>
    <div class="tiptap">
      <editor-content
        class="editor__content"
        :editor="editor"
      />
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss"></style>
