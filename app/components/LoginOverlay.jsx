"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LoginOverlay = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="h-screen fixed w-full top-0 left-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
      <div className="text-center text-white mx-4">
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          Login to Access This Page
        </h2>
        <button
          onClick={handleLoginClick}
          className="bg-white text-black py-2 px-6 rounded-sm hover:bg-gray-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginOverlay;
