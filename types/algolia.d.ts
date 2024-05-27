// types.d.ts
import '@nuxtjs/algolia';
import type { Timestamp } from '@firebase/firestore';

declare module '@nuxtjs/algolia' {
  interface AlgoliaIndices {
    dev_posts: {
      objectID: string;
      title: string;
      content: string;
      category: string;
      tags: string[];
      uid: string;
      createdAt: Timestamp;
      readCount: number;
      likeCount: number;
      bookmarkCount: number;
      commentCount: number;
      _snippetResult: {
        content: {
          value: string;
          matchedWords: string[];
        };
        title: {
          value: string;
          matchedWords: string[];
        };
      };
    };
  }
}
