"use client";

import React, { useRef, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const DemoModal = ({ isOpen, onClose, videoUrl }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000040] flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg max-w-4xl w-full relative mx-3"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-black z-40 hover:text-gray-800 text-2xl focus:outline-none"
          onClick={onClose}
        >
          <IoMdCloseCircle className="bg-white text-black" />
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-md"
            src={videoUrl}
            title="Video Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
