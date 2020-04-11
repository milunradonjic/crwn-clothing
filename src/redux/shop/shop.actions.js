import ShopActionTypes from './shop.types';

// Left from thunk
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// Left from thunk
// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     // get collections ref from firestore with id (key) 'collections'
//     const collectionsRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart());

//     // subscribe to listener
//     // when the snapshot changes it will fire
//     collectionsRef.onSnapshot(async snapshot => {
//       // transform snapshot to map
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       // put it in a reducer
//       dispatch(fetchCollectionsSuccess(collectionsMap));
//     }, error => dispatch(fetchCollectionsFailure(error.message)));
//   }
// };