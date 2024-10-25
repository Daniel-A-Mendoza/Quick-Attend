/*
  This file will be used to store the Firebase project
  configuration and initialize the Firebase services.
   It will offer the following services:
    - Authentication Service
    - Google Provider Service
    - Firestore Database Service
*/

import { initializeApp } from "../../frontend/node_modules/firebase/app";
import {getAuth, GoogleAuthProvider} from "../../frontend/node_modules/firebase/auth";
import { getFirestore } from '../../frontend/node_modules/firebase/firestore'; // Import required function


// Firebase Web Application Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx3NQhKbSUogyDD6h4PBF6OTj5udOqT0k",
  authDomain: "senior-design-58a64.firebaseapp.com",
  projectId: "senior-design-58a64",
  storageBucket: "senior-design-58a64.appspot.com",
  messagingSenderId: "526881036126",
  appId: "1:526881036126:web:52f2864b1b2b5e29b3a1cf",
  measurementId: "G-P18HXWS445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieves the Authentication Services
export const auth = getAuth(app);

// Retrieves the Google Authentication Provider
/*
  Sets the custom parameters to prompt the user to select an account
  This is useful if you only have one account signed in and you want to have the chance to
  add another google account.
  If this is not used, the user will be automatically signed in with the account that is already signed in
  which is undesirable if a user wants to use a different account.
*/
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

// Retrieves the Firestore Database Services
export const db = getFirestore(app);



