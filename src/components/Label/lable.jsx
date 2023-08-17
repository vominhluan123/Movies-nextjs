import React from "react";

export const Lable = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="cursor-pointer font-semibold"
      {...props}
    >
      {children}
    </label>
  );
};
