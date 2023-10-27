import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';;


// Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyC2qp0kl2FIdw2aBE4XI62HrFnATJZvs_A", //ProjectSetting in Firebase
    authDomain: "jbtdevelopementprojectsum200.firebaseapp.com",
    //databaseURL: 'https://project-id.firebaseio.com',
    projectId: "jbtdevelopementprojectsum200", //ProjectSetting in Firebase
    storageBucket: "jbtdevelopementprojectsum200.appspot.com",
    messagingSenderId: "230433277111", //Firebase Cloud Messaging API (V1) 
    appId: "1:230433277111:android:56db98a6f363e7875b7932", //ProjectSetting in Firebase in Apps
    //measurementId: 'G-measurement-id',
};

// Check if Firebase is not initialized, then initialize it
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // if already initialized, use that one
}
// Initialize Firebase Auth with AsyncStorage as the persistence layer
const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(AsyncStorage));

// Initialize Firestore
const firestore = getFirestore(app);

export const FIREBASE_AUTH = auth;
export const FIRESTORE_DB = firestore;

