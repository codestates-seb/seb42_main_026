import React, { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";

const ChecklistPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <DeleteModal isOpen={isModalOpen} onClose={closeModal}></DeleteModal>
    </>
  );
};

export default ChecklistPage;
