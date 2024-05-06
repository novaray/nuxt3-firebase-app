export const usePostQuery = () => {
  const route = useRoute();
  const router = useRouter();

  const category = computed({
    get: () => (route.query.category ?? '') as string,
    set: (value) => {
      return router.replace({
        query: {
          ...route.query,
          category: value
        }
      });
    }
  });

  const sort = computed({
    get: () => (route.query.sort ?? 'createdAt') as string,
    set: (value) => {
      return router.replace({
        query: {
          ...route.query,
          sort: value
        }
      });
    }
  });

  const tags = computed({
    get: () => (route.query.tags?.split(',') ?? []) as string[],
    set: (value) => {
      return router.replace({
        query: {
          ...route.query,
          tags: value.length === 0 ? undefined : value.join(',')
        }
      });
    }
  });

  return {
    category,
    sort,
    tags
  };
};
