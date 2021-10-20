import firebase from 'firebase/compat';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC2bCk1HvOWca226Obr3OpS0JdtgPV4dhI",
    authDomain: "cleveroad-5aa11.firebaseapp.com",
    projectId: "cleveroad-5aa11",
    storageBucket: "cleveroad-5aa11.appspot.com",
    messagingSenderId: "494800201990",
    appId: "1:494800201990:web:17ff106d1cb6f3e757d687"
};
const fireBase = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();
export  {fireBase, storage, firestore, auth}