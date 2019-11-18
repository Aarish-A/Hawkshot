import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyABccszQPRBBbUulYjrKR76wr3G6xawf8Y",
    authDomain: "hawkshot-e7e56.firebaseapp.com",
    databaseURL: "https://hawkshot-e7e56.firebaseio.com",
    projectId: "hawkshot-e7e56",
    storageBucket: "hawkshot-e7e56.appspot.com",
    messagingSenderId: "1007231773971",
    appId: "1:1007231773971:web:006a7e6bc52ecce70e7ee6",
    measurementId: "G-S1G64C987D"
  };

class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (email, password) =>
    this.auth.signOut();
}

export default Firebase;
