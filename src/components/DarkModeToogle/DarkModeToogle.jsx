"use client";
import { ThemeContext } from "@/context/ThemContext";
import React, { useContext } from "react";

const DarkModeToogle = () => {
  const { toogle, mode } = useContext(ThemeContext);

  return (
    <div
      className="flex relative w-[60px] h-[24px] border rounded-3xl border-[#53c28b70] items-center cursor-pointer px-2 justify-between border-secondary"
      onClick={toogle}
    >
      <div className="text-xs">🌙</div>
      <div className="text-xs">🔆</div>
      <div
        className={`absolute w-[20px] h-[20px] rounded-full px-2 toogle ${
          mode === "light" ? "left-2" : "right-2"
        }`}
      ></div>
    </div>
  );
};

export default DarkModeToogle;
