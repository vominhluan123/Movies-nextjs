"use client";
import React from "react";
import { createContext, useState } from "react";
export const ThemeContext = createContext();
export const Themeprovider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("theme");
    return storedMode ? storedMode : "light";
  });
  const toogle = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode);
  };
  return (
    <ThemeContext.Provider value={{ toogle, darkMode }}>
      <div className={`theme ${darkMode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
