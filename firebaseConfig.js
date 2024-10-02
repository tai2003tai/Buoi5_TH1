import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4q19B8tzO5i4e3lKkyLdB86OIRkgPw-8",
  authDomain: "buoi5-th3-4de42.firebaseapp.com",
  databaseURL: "https://buoi5-th3-4de42-default-rtdb.firebaseio.com",
  projectId: "buoi5-th3-4de42",
  storageBucket: "buoi5-th3-4de42.appspot.com",
  messagingSenderId: "1038805518766",
  appId: "1:1038805518766:web:b4ace9e8fe5df63dd9a03f",
  measurementId: "G-VXR6HQ8SWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
