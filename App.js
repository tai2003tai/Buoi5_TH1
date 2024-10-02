import React, { useEffect } from "react";
import { MyContextControllerProvider } from "./src/store";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Auth functions
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/store/routers/Router";
import { app } from "./firebaseConfig"; // Import app từ firebaseConfig

// Khởi tạo Firestore và Auth
const firestore = getFirestore(app);
const auth = getAuth(app);

const App = () => {
  const admin = {
    fullName: "Admin",
    email: "vanhuudhsp@gmail.com",
    password: "123456",
    phone: "0913131732",
    address: "Bình Dương",
    role: "admin"
  };

  useEffect(() => {
    // Đăng ký tài khoản admin
    const userRef = doc(firestore, "USERS", admin.email);
    onSnapshot(userRef, (u) => {
      if (!u.exists()) {
        createUserWithEmailAndPassword(auth, admin.email, admin.password)
          .then((response) => {
            // Lưu thông tin admin vào Firestore
            setDoc(userRef, admin)
              .then(() => {
                console.log("Đã thêm tài khoản admin");
              });
          })
          .catch((error) => {
            console.error("Lỗi khi tạo tài khoản:", error);
          });
      }
    });
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

export default App;
