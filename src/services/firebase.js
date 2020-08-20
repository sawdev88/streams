import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyChJp6wI1pZGHGKRS_9nLcwr_VT0VZVRc4",
    authDomain: "streams-a8869.firebaseapp.com",
    databaseURL: "https://streams-a8869.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();