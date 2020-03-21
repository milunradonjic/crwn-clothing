import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    // get collections ref from firestore with id (key) 'collections'
    const collectionsRef = firestore.collection('collections');

    // yield is simillar to aysnc/await
    // the value get returnd in promised form that is resolved with a value of our collectionsRef, which is our snapshot
    // so no need for .then() because it's already resolved 
    const snapshot = yield collectionsRef.get();

    // Creates an Effect description that instructs the middleware to call the function fn with args as arguments.
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    // put behaves same as dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}