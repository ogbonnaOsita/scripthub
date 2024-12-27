"use client";

import React from "react";
import clsx from "clsx";

const CustomButton = ({
  variant = "primary",
  size = "medium",
  isDisabled = false,
  isFullWidth = false,
  icon = null,
  className = "",
  onClick,
  children,
}) => {
  const baseStyles =
    "flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none transition";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    outline: "border border-black text-black hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-400",
    warning: "bg-orange-500 text-white hover:bg-orange-400",
    success: "bg-green-500 text-white hover:bg-green-400"
  };

  const sizes = {
    small: "text-sm px-3 py-1",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-3",
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        isFullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default CustomButton;
