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

  // Function to set token in cookie
  const setTokenInCookie = async (token) => {
    try {
      await fetch(`${import.meta.env.VITE_server}/set-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error("Error setting token cookie:", error);
    }
  };

  // Function to clear token from cookie
  const clearTokenCookie = async () => {
    try {
      await fetch(`${import.meta.env.VITE_server}/clear-token`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error clearing token cookie:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Get fresh token and set in cookie
          const token = await currentUser.getIdToken();
          await setTokenInCookie(token);
        } catch (error) {
          console.error("Error getting/setting token:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await setTokenInCookie(token);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const emailRegister = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await result.user.getIdToken();
      await setTokenInCookie(token);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const emailSignIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      await setTokenInCookie(token);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = (cur, displayName, photoURL) => {
    return updateProfile(cur, { displayName, photoURL });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signOutuser = async () => {
    setLoading(true);
    try {
      await clearTokenCookie();
      return await signOut(auth);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
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
    setTokenInCookie,
    clearTokenCookie,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
