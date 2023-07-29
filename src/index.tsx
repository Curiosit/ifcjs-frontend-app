import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);






// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrJrn7iUKxdQJIPBqfWB9pqipzMLSS06E",
  authDomain: "ifcjs-frontend-app-31656.firebaseapp.com",
  projectId: "ifcjs-frontend-app-31656",
  storageBucket: "ifcjs-frontend-app-31656.appspot.com",
  messagingSenderId: "781898325855",
  appId: "1:781898325855:web:8a9a60aff4950e631620ea",
  measurementId: "G-ZCE1PYWQ87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


