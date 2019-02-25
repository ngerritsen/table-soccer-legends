import firebase from 'firebase/app';
import app from './firebase';

export function getLoggedInUser() {
  return new Promise(resolve => {
    firebase.auth(app).onAuthStateChanged(resolve);
  });
}

export function login() {
  const provider = new firebase.auth.GithubAuthProvider();

  firebase.auth(app).signInWithRedirect(provider);
}
