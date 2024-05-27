import type { Ref } from 'vue';

interface UseTagOptions {
  tags: Ref<string[]>;
  updateTags: (tags: string[]) => void;
  maxLengthMessage: string;
}

export const useTag = (options: UseTagOptions) => {
  const { tags, updateTags, maxLengthMessage } = options;
  const tagField = ref('');

  const addTag = (searchTag?: string) => {
    const tagValue = searchTag || tagField.value.replace(/ /g, '');
    if (!tagValue) {
      return;
    }

    if (tags.value.length >= 10) {
      return Notify.create({
        type: 'negative',
        message: maxLengthMessage
      });
    }

    if (!tags.value.includes(tagValue)) {
      updateTags([...tags.value, tagValue]);
    }

    tagField.value = '';
  };

  const removeTag = (index: number) => {
    const model = [...tags.value];
    model.splice(index, 1);
    updateTags(model);
  };

  return {
    tagField,
    addTag,
    removeTag
  };
};
