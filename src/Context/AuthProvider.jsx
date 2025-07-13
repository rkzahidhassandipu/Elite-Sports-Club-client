import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext"; // adjust path if needed
import axios from "axios";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userProfileUpdated = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const createUserWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        const userData = { email: currentUser.email };
        const res = await axios.post(
          "http://localhost:5000/jwt", // 👈 Localhost backend
          userData,
          { withCredentials: true }   // 👈 Important for sending/receiving cookies
        );
        console.log("JWT cookie set:", res.data);
      } catch (err) {
        console.error("JWT fetch error:", err);
      }
    } else {
      // Optional: clear JWT cookie on logout
      await axios.get("http://localhost:5000/logout", { withCredentials: true });
    }

    console.log("Auth state changed:", currentUser);
  });

  return () => unsubscribe();
}, []);


  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    userProfileUpdated,
    logOut,
    login,
    createUserWithGoogle,
  };

  return (
    <AuthContext.Provider value={{ authInfo }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
