import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
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
  startAfter,
  startAt,
  updateDoc,
  where
} from '@firebase/firestore';
import type { CreatePostRequest, PostForm } from '@/types/post';

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
        createdAt: data!.createdAt?.toDate()
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
}
