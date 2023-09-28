// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCoC5Zjcv0TH84hvnC6lBF8Hq5jEoR88S4',
  authDomain: 'user-email-password-auth-11ecf.firebaseapp.com',
  projectId: 'user-email-password-auth-11ecf',
  storageBucket: 'user-email-password-auth-11ecf.appspot.com',
  messagingSenderId: '720044231894',
  appId: '1:720044231894:web:8c4fe87b27f86a7be54d77',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
