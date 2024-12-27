"use client";

import React from "react";
import clsx from "clsx";

/**
 * A reusable custom button component.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.variant - The button style variant (e.g., "primary", "secondary", "outline", "danger").
 * @param {string} props.size - The size of the button (e.g., "small", "medium", "large").
 * @param {boolean} props.isDisabled - Whether the button is disabled.
 * @param {boolean} props.isFullWidth - Whether the button should span the full width.
 * @param {React.ReactNode} props.icon - Optional icon to display in the button.
 * @param {string} props.className - Additional custom classes.
 * @param {function} props.onClick - Function to handle button click.
 * @param {React.ReactNode} props.children - Button content.
 */
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
