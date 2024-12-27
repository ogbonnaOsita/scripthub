"use client";

import React, { useState, useEffect } from "react";
import { IoMdVideocam } from "react-icons/io";
import { MdOutlineLockOpen, MdOutlineLogin } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useModal } from "./ModalProvider";
import CustomButton from "./CustomButton";
import DemoModal from "./DemoModal";
import { limitText } from "../lib/utilFunctions";

const ScriptCard = ({
  imageUrl,
  title = "Product Title",
  bought = false,
  price,
  demoVideoUrl,
  description,
  isLoggedIn = false,
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleDemoClick = () => {
    if (demoVideoUrl) {
      openModal(demoVideoUrl);
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden border rounded-md border-gray-300 bg-white shadow-md h-full">
      <div className="relative h-44">
        <img
          className="w-full h-full object-cover"
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={title || "Product Image"}
        />
        {!bought && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            ${price}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 gap-2 justify-between">
        <h5 className="tracking-tight text-black font-semibold">
          {title}
        </h5>
        <p className="text-sm mb-2">{limitText(description, 100)}</p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          {bought ? (
            isLoggedIn ? (
              <CustomButton
                variant="primary"
                size="medium"
                // isDisabled
                className="w-full"
                icon={<MdOutlineLockOpen className="text-white" />}
              >
                Open
              </CustomButton>
            ) : (
              <CustomButton
                variant="primary"
                size="medium"
                onClick={handleLoginClick}
                icon={<MdOutlineLogin className="text-white" />}
                className="w-full"
              >
                Login
              </CustomButton>
            )
          ) : (
            <CustomButton
              variant="warning"
              size="medium"
              className="w-full"
              icon={<RiLock2Fill className="text-white" />}
            >
              Unlock
            </CustomButton>
          )}
          <CustomButton
            variant="outline"
            size="medium"
            onClick={handleDemoClick}
            icon={<IoMdVideocam className="" />}
            className="w-full"
          >
            Demo
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;
