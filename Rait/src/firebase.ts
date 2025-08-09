import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOGHPjgifzFhIIs2c81P6L7MeNLBc1dn0",
  authDomain: "annadata-3fba1.firebaseapp.com",
  projectId: "annadata-3fba1",
  storageBucket: "annadata-3fba1.appspot.com", // Corrected
  messagingSenderId: "302229408469",
  appId: "1:302229408469:web:e766c40bfee6bf3cf7b05c",
  measurementId: "G-06D4EFW3Z8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);