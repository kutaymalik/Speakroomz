// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getApp, getApps, initializeApp }from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore'
import {FIREBASE_APIKEY} from '@env';
import config from './config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = config;


getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db};