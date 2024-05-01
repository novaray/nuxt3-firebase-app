<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import PlaceHolder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const modelValue = defineModel<string>({ required: true });

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    StarterKit,
    PlaceHolder.configure({
      placeholder: '마크다운을 이용해서 편리하게 글을 작성하세요.'
    }),
    Link,
    Image
  ],
  onUpdate(props) {
    modelValue.value = props.editor.getHTML();
  }
});

watch(modelValue, (value) => {
  if (value !== editor.value?.getHTML()) {
    editor.value?.commands.setContent(value, false);
  }
});
</script>

<template>
  <ClientOnly>
    <q-card
      class="tiptap"
      flat
      bordered
    >
      <TiptapEditorMenu :editor="editor" />
      <q-separator />
      <editor-content
        class="editor__content"
        :editor="editor"
      />
    </q-card>
  </ClientOnly>
</template>

<style scoped lang="scss">
@import 'assets/tiptap.scss';

:deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.editor__content {
  // 추가 start
  flex: 1;
  display: flex;
  overflow-y: auto;
  padding: 16px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 400px;
  // 추가 end
}
</style>
