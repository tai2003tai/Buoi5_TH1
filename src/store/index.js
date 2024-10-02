import { createContext, useContext, useMemo, useReducer } from "react"; 
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Sử dụng Firebase Web
import { getFirestore, doc, onSnapshot, collection } from "firebase/firestore"; // Sử dụng Firebase Web
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "MyContext";

const reducer = (state, action) => { 
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "LOGOUT":
            return { ...state, userLogin: null };
        default: 
            throw new Error("Action not found"); 
    } 
};     

const MyContextControllerProvider = ({ children }) => {
    const initialState = { 
        userLogin: null, 
        services: [], 
    };
    const [controller, dispatch] = useReducer(reducer, initialState); 
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    
    return( 
        <MyContext.Provider value={value}>
            { children } 
        </MyContext.Provider>
    );
};

// Định nghĩa useMyContextController 
const useMyContextController = () => {
    const context = useContext(MyContext);
    if (context == null) 
        throw new Error("useMyContextController must be used within a MyContextControllerProvider"); 
    return context;
};

// Khởi tạo Firestore
const firestore = getFirestore(); 
const USERS = collection(firestore, "USERS"); // Sử dụng collection() từ Firebase Web

const login = (dispatch, email, password) => {
    const auth = getAuth(); // Khởi tạo Auth
    signInWithEmailAndPassword(auth, email, password) 
        .then(response => {
            const userRef = doc(USERS, email); // Sử dụng doc() từ Firebase Web
            onSnapshot(userRef, (u) => {
                if (u.exists()) {
                    dispatch({ type: "USER_LOGIN", value: u.data() });
                } else {
                    Alert.alert("Người dùng không tồn tại");
                }
            });
        })
        .catch(e => Alert.alert("Sai email hoặc mật khẩu")); 
};

const logout = (dispatch) => { 
    const auth = getAuth(); // Khởi tạo Auth
    signOut(auth) 
        .then(() => dispatch({ type: "LOGOUT" }));
}; 

export {
    MyContextControllerProvider, 
    useMyContextController, 
    login, 
    logout 
};
