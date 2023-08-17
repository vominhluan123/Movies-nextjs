import React from "react";
import { useController } from "react-hook-form";
export const Input = ({
  name = "",
  type = "text",
  children,
  hasicon = "false",
  control,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="relative w-full" hasicon={children ? "true" : "false"}>
      <input
        id={name}
        type={type}
        {...field}
        {...props}
        control={control}
        className={`w-full p-4 input outline-none border border-transparent focus:border-blue-500 transition-all text-lg rounded-lg   ${
          children ? "pr-16" : ""
        }`}
      />
      {children}
    </div>
  );
};
