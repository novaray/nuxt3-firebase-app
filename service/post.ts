import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QueryStartAtConstraint,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  increment
} from '@firebase/firestore';
import type { CreatePostRequest, PostData, PostForm } from '@/types/post';
import type { PostTag } from '@/types/tag';

export class Post {
  static createPost(data: CreatePostRequest) {
    const db = getFirestore();
    // id 지정, return이 void, 기존에 생성된 것이 있다면 덮어씌움.
    // return await setDoc(
    //   doc(db, 'posts', 'post-id'),
    //   {
    //     title: 'hello world'
    //     // ...data,
    //     // readCount: 0,
    //     // likeCount: 0,
    //     // commentCount: 0,
    //     // bookmarkCount: 0,
    //     // createdAt: serverTimestamp()
    //   },
    //   {
    //     merge: true // 기존에 생성된 것이 있다면 덮어씌움.
    //   }
    // );
    return addDoc(collection(db, 'posts'), {
      ...data,
      readCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      createdAt: serverTimestamp()
    }).then((docRef) => {
      return docRef.id;
    });
  }

  static getPosts(params: Record<string, any>): Promise<any> {
    // 1) 컬렉션에 있는 모든 문서 조회
    // const db = getFirestore();
    //
    // return getDocs(collection(db, 'posts')).then((querySnapshot) => {
    //   return querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //     createdAt: doc.data().createdAt?.toDate()
    //   }));
    // });

    // 2) 컬렉션에 있는 문서를 쿼리로 조회
    const conditions: (QueryConstraint | QueryOrderByConstraint | QueryStartAtConstraint | QueryLimitConstraint)[] = [];
    if (params?.category) {
      conditions.push(where('category', '==', params.category));
    }
    if (params?.tags && params.tags.length > 0) {
      conditions.push(where('tags', 'array-contains-any', params.tags));
    }
    if (params?.sort) {
      conditions.push(orderBy(params.sort, 'desc'));
    }
    if (params?.start) {
      conditions.push(startAfter(params.start));
    }
    if (params?.limit) {
      conditions.push(limit(params.limit));
    }

    const db = getFirestore();
    const q = query(collection(db, 'posts'), ...conditions);
    return getDocs(q).then((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate()
      }));

      return {
        items,
        lastItem: querySnapshot.docs[querySnapshot.docs.length - 1]
      };
    });
  }

  static getPost(id: string): Promise<any> {
    const db = getFirestore();
    return getDoc(doc(db, 'posts', id)).then((docSnap) => {
      if (!docSnap.exists()) {
        throw new Error('Document does not exist');
      }

      const data = docSnap.data();

      return {
        ...data,
        id: docSnap.id,
        createdAt: data!.createdAt?.toDate()
      };
    });
  }

  static incrementReadCount(id: string) {
    const db = getFirestore();
    return updateDoc(doc(db, 'posts', id), {
      readCount: increment(1)
    });
  }

  static getPostDetails(id: string): Promise<{ post: any }> {
    if (import.meta.server) {
      return this.getPost(id).then((post) => {
        return {
          post
        };
      });
    }

    return this.incrementReadCount(id)
      .then(() => this.getPost(id))
      .then((post) => {
        return {
          post
        };
      });
  }

  static updatePost(id: string, form: PostForm) {
    const db = getFirestore();
    return updateDoc(doc(db, 'posts', id), {
      ...form,
      updatedAt: serverTimestamp()
    });
  }

  static deletePost(id: string) {
    const db = getFirestore();
    return deleteDoc(doc(db, 'posts', id));
  }

  static addLike(uid: string, postId: string) {
    const db = getFirestore();
    return setDoc(doc(db, 'post_likes', `${uid}_${postId}`), {
      postId,
      uid,
      createdAt: serverTimestamp()
    });
  }

  static removeLike(uid: string, postId: string) {
    const db = getFirestore();
    return deleteDoc(doc(db, 'post_likes', `${uid}_${postId}`));
  }

  static hasLike(uid: string, postId: string) {
    const db = getFirestore();
    return getDoc(doc(db, 'post_likes', `${uid}_${postId}`)).then((docSnap) => {
      return docSnap.exists();
    });
  }

  static addBookmark(uid: string, postId: string) {
    const db = getFirestore();
    return setDoc(doc(db, 'users', uid, 'bookmarks', postId), {
      createdAt: serverTimestamp()
    });
  }

  static removeBookmark(uid: string, postId: string) {
    const db = getFirestore();
    return deleteDoc(doc(db, 'users', uid, 'bookmarks', postId));
  }

  static hasBookmark(uid: string, postId: string) {
    const db = getFirestore();
    return getDoc(doc(db, 'users', uid, 'bookmarks', postId)).then((docSnap) => {
      return docSnap.exists();
    });
  }

  static getUserBookmarks(uid: string): Promise<PostData[]> {
    const db = getFirestore();
    const q = query(collection(db, 'users', uid, 'bookmarks'), orderBy('createdAt', 'desc'), limit(6));
    return getDocs(q).then((querySnapshot) => {
      return Promise.all(querySnapshot.docs.map((docSnap) => this.getPost(docSnap.id)));
    });
  }

  static getTags() {
    const db = getFirestore();
    const q = query(collection(db, 'tags'), where('count', '>', 0), orderBy('count', 'desc'));

    return getDocs(q).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data() as PostTag);
    });
  }
}
