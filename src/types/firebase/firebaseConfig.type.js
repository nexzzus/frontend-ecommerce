import Envs from '../variables/envs.type.js'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: Envs.FIREBASE_API_KEY,
    authDomain: Envs.FIREBASE_AUTH_DOMAIN,
    projectId: Envs.FIREBASE_PROJECT_ID,
    storageBucket: Envs.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Envs.FIREBASE_MESSAGING_SENDER_ID,
    appId: Envs.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export { firebaseConfig };