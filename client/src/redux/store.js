import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';
// root saga
import rootSaga from './root-saga';

// const middlewares = [thunk];

const sagaMiddleware = createSagaMiddleware(); // it can take a configuration object as param

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };