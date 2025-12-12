import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import auth from "../firebase/firebase.config";
import AuthContext from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dashRef = useRef();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (cur) => {
      setUser(cur);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const emailRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const update = (cur, displayName, photoURL) => {
    return updateProfile(cur, { displayName, photoURL });
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const signOutuser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    theme,
    setTheme,
    user,
    setUser,
    loading,
    setLoading,
    googleSignIn,
    emailRegister,
    emailSignIn,
    update,
    resetPassword,
    signOutuser,
    dashRef,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
