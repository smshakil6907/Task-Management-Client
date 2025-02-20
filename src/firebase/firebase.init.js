// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAVTo_6FEXkBqKeD0_CzsXbq41vujv0r8",
  authDomain: "task-management-c082c.firebaseapp.com",
  projectId: "task-management-c082c",
  storageBucket: "task-management-c082c.firebasestorage.app",
  messagingSenderId: "122598779355",
  appId: "1:122598779355:web:9ecd5c52b08ecb7239dffe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;