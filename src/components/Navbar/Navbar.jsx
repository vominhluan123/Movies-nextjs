"use client";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import DarkModeToogle from "../DarkModeToogle/DarkModeToogle";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Movies",
    url: "/movies",
  },
];

const Navbar = () => {
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const [open, Setopen] = useState(false);
  const handleLinkClick = (link) => {
    setActiveLink(link.id);
  };
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <>
      <nav className="sticky top-0 left-0 w-full text-primary flex justify-between items-center z-[100] px-10 h-5 py-10 backdrop-blur-3xl">
        <div>
          <Link href="/">
            <div className="relative text-2xl font-bold">Movies</div>
          </Link>
        </div>
        <div className="relative flex items-center gap-5 font-bold text-1xl">
          <DarkModeToogle />
          {links.map((link) => (
            <Link key={link.id} href={link.url}>
              <div
                onClick={() => handleLinkClick(link)}
                className={`hover:text-active ${
                  link.id === activeLink ? "active" : ""
                }`}
              >
                {link.title}
              </div>
            </Link>
          ))}
          {!user ? (
            <Link
              href="/auth/login"
              onClick={() => handleLinkClick({ id: "login" })} // Thêm một id cho mục "Login"
              className={`hover:text-active ${
                activeLink === "login" ? "active" : "" // Kiểm tra trạng thái active
              }`}
            >
              Login
            </Link>
          ) : (
            <>
              <span
                className="cursor-pointer hover:text-active"
                onClick={() => Setopen(!open)}
              >
                {user?.displayName}
              </span>
              {open && (
                <button
                  onClick={handleSignOut}
                  className="absolute right-0 w-20 rounded-lg outline-none top-7 bg-slate-400"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
