import React from "react";

export const LoadingSpiner = ({ className }) => {
  return (
    <div className={`flex justify-center items-center h-screen ${className}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 inline-block border-b-2 border-gray-800"></div>
    </div>
  );
};
