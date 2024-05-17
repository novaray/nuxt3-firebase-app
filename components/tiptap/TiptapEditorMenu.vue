<script setup lang="ts">
// @ts-ignore
import { Editor } from '@tiptap/core';
import { ImageService } from '~/service';

interface Props {
  editor: Editor;
}
const props = defineProps<Props>();

const onClickLink = () => {
  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run();
    return;
  }

  const previousUrl = props.editor.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url == null) {
    return;
  }

  // empty
  if (url === '') {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run();

    return;
  }

  // update link
  props.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
};

const onClickImage = () => {
  const url = window.prompt('URL');

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};

const fileRef = ref<HTMLInputElement>();
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    return;
  }

  ImageService.uploadImage(file).then((url) => {
    props.editor.chain().focus().setImage({ src: url }).run();
  });
  target.value = '';
};
</script>

<template>
  <div
    v-if="editor"
    class="flex q-pa-xs"
  >
    <input
      ref="fileRef"
      type="file"
      accept="*/image"
      style="display: none"
      @change="onFileChange"
    />
    <q-btn
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :color="editor.isActive('bold') ? 'blue' : undefined"
      flat
      dense
      icon="sym_o_format_bold"
      @click="editor.chain().focus().toggleBold().run()"
    />
    <q-btn
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :color="editor.isActive('italic') ? 'blue' : undefined"
      flat
      dense
      icon="sym_o_format_italic"
      @click="editor.chain().focus().toggleItalic().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_strikethrough_s"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('strike') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleStrike().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_link"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('link') ? 'blue' : undefined"
      @click="onClickLink"
    />
    <q-separator
      vertical
      inset
      spaced
    />
    <q-btn
      flat
      dense
      icon="code"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :color="editor.isActive('code') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleCode().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_code_blocks"
      :color="editor.isActive('codeBlock') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_quote"
      :color="editor.isActive('blockquote') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleBlockquote().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_image"
      @click="onClickImage"
    />
    <q-btn
      flat
      dense
      icon="sym_o_photo_library"
      @click="fileRef?.click()"
    />

    <q-btn
      flat
      dense
      icon="sym_o_format_h1"
      :color="editor.isActive('heading', { level: 1 }) ? 'blue' : undefined"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_h2"
      :color="editor.isActive('heading', { level: 2 }) ? 'blue' : undefined"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_h3"
      :color="editor.isActive('heading', { level: 3 }) ? 'blue' : undefined"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_list_bulleted"
      :color="editor.isActive('bulletList') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleBulletList().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_list_numbered"
      :color="editor.isActive('orderedList') ? 'blue' : undefined"
      @click="editor.chain().focus().toggleOrderedList().run()"
    />

    <q-btn
      flat
      dense
      icon="sym_o_horizontal_rule"
      @click="editor.chain().focus().setHorizontalRule().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_undo"
      :disabled="!editor.can().chain().focus().undo().run()"
      @click="editor.chain().focus().undo().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_redo"
      :disabled="!editor.can().chain().focus().redo().run()"
      @click="editor.chain().focus().redo().run()"
    />
  </div>
</template>

<style scoped></style>
