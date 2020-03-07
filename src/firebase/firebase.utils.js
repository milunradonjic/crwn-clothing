import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyCYn5q_jMim4-Vs0B-ZVhYkwNTC7VW_Sao",
  authDomain: "crwn-db-34131.firebaseapp.com",
  databaseURL: "https://crwn-db-34131.firebaseio.com",
  projectId: "crwn-db-34131",
  storageBucket: "crwn-db-34131.appspot.com",
  messagingSenderId: "131110801569",
  appId: "1:131110801569:web:69c6e247df20bc98ca20e0",
  measurementId: "G-B3WT4F87B9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;