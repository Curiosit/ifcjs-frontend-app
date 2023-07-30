import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Your web app's Firebase configuration
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
initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
