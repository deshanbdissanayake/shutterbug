import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD8Sr0ebvxT2gd2vhALZl77s8UdGMevclU",
    authDomain: "shutterbug-b5799.firebaseapp.com",
    projectId: "shutterbug-b5799",
    storageBucket: "shutterbug-b5799.appspot.com",
    messagingSenderId: "468789154578",
    appId: "1:468789154578:web:4292593a7bc63f8e1859cb",
    measurementId: "G-S8N2LS6HXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db