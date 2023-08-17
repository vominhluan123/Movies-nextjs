"use client";
import React from "react";
import { createContext, useState } from "react";
export const ThemeContext = createContext();
export const Themeprovider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
    return storedMode ? storedMode : "light";
  });
  const toogle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };
  return (
    <ThemeContext.Provider value={{ toogle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
