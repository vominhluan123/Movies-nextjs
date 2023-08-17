"use client";
import React from "react";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext } from "react";
const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = React.useState({});
  const [darkMode, setDarkMode] = React.useState(false);
  const value = { user, setUser, darkMode, setDarkMode };
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
