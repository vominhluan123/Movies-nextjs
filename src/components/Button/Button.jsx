import Link from "next/link";
import React from "react";
import { LoadingSpiner } from "../Loading/LoadingSpiner";

const Button = ({
  children,
  url,
  className,
  onClick = () => {},
  type = "button",
  ...props
}) => {
  const { isloading } = props;
  const child = !!isloading ? <LoadingSpiner className="max-h-10" /> : children;
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`button disabled:opacity-50 py-3 px-6 text-xl rounded-lg text-white font-medium ${className}`}
    >
      {child}
    </button>
  );
};

export default Button;
