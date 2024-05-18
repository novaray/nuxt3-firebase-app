// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require('firebase-functions');
const { onDocumentCreated, onDocumentDeleted } = require('firebase-functions/v2/firestore');

// The Firebase Admin SDK to access Firestore.
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

const { setGlobalOptions } = require('firebase-functions/v2');
setGlobalOptions({ maxInstances: 10 });

const app = initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore(app);
const region = 'asia-northeast3';

exports.onCreateBookmark = onDocumentCreated(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}' // bookmarkId가 postId이니 postId로 사용.
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteBookmark = onDocumentDeleted(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}'
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(-1)
    });
  }
);

exports.onCreateComment = onDocumentCreated(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}'
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteComment = onDocumentDeleted(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}'
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(-1)
    });
  }
);

exports.onCreateLike = onDocumentCreated(
  {
    region,
    document: 'post_likes/{id}'
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const snapshot = event.data;
    const data = snapshot.data();
    logger.log('data: ', data);
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteLike = onDocumentDeleted(
  {
    region,
    document: 'post_likes/{id}'
  },
  // @ts-ignore 타입을 지정하면 신택스 에러로 인식되어 ignore 처리함.
  (event) => {
    const snapshot = event.data;
    const data = snapshot.data();
    logger.log('data: ', data);
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(-1)
    });
  }
);
