import React from "react";

export const Field = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-5 items-start mb-10 last:mb-0">
      {children}
    </div>
  );
};
