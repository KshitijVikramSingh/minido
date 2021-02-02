import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBGmYEniMxHGFDmpC1cFd6yIgrqxM5CaQ8",
    authDomain: "minido-7bde5.firebaseapp.com",
    projectId: "minido-7bde5",
    storageBucket: "minido-7bde5.appspot.com",
    messagingSenderId: "220123854231",
    appId: "1:220123854231:web:1bb1a4c5286304be8640d2",
    measurementId: "G-R3KES8HTMX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;