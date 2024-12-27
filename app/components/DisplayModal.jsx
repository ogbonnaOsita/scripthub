"use client";

import React from "react";
import { useModal } from "./ModalProvider";
import DemoModal from "./DemoModal";

const DisplayModal = () => {
  const { isModalOpen, closeModal, videoUrl } = useModal();
  return (
    <DemoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={videoUrl} />
  );
};

export default DisplayModal;
