import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

// all takes an array of sagas, and call them concurrently
export default function* rootSaga() {
  yield all([
    // individual call for every saga we want
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ]);
}