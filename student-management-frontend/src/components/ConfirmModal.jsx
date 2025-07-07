import React, { useEffect, useRef } from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  cancelColor = "bg-gray-200 hover:bg-gray-300",
  icon = null,
}) {
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Click outside to close
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Autofocus cancel button when modal opens
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center animate-fade-in"
      onMouseDown={handleClickOutside}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm animate-slide-up"
        onMouseDown={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {icon && <div className="text-center text-3xl mb-2">{icon}</div>}
        <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">{title}</h3>
        <p className="mb-6 text-gray-700 text-center">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            ref={cancelButtonRef}
            onClick={onClose}
            className={`px-4 py-2 rounded ${cancelColor} text-gray-800`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
