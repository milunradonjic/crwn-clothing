import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

// all takes an array of sagas, and call them concurrently
export default function* rootSaga() {
  yield all([
    // individual call for every saga we want
    call(fetchCollectionsStart),
    call(userSagas)
  ]);
}