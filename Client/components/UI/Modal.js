import React from "react";

const Modal = ({ isVisible, onClose, children, top = "0px" }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "modalWrapper") onClose();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0  z-50 flex items-center justify-center h-screen  bg-black/30`}
      id="modalWrapper"
      onClick={handleClose}
      style={{ top: `${top}px` }}
    >
      {children}
    </div>
  );
};

export default Modal;
