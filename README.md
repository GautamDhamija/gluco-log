# Gluco-Log
## Configuring Firebase Firestore
create a file at src/firebase/init.js
enter your keys you get from firebase

```
import firebase from "firebase/app";
import firestore from "firebase/firestore";
import authentication from "firebase/auth"
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore()
const auth=firebaseApp.auth()

export {db,auth}

```
