import React, { useEffect, useRef } from "react";
import { Close } from "../../Close";
import { Button } from "../../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  confirmText,
  cancelText,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    dialog?.addEventListener("keydown", handleEscape);

    return () => {
      dialog?.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = () => {
    if (dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} onClick={handleClickOutside}>
      <div className="fixed inset-0 bg-primary backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-terciary p-6 rounded-lg shadow-lg  w-11/12 md:w-3/5 max-w-lg relative"
        >
          <button
            className="absolute top-4 right-4"
            onClick={onClose}
            aria-label="Close"
          >
            <Close />
          </button>
          {title && <h2 className="text-xl mb-4 text-highlight">{title}</h2>}
          <div>{children}</div>
          <div className="flex gap-4 mt-4">
            {cancelText && (
              <Button text={cancelText} type="button" onClick={onClose} />
            )}
            {onConfirm && confirmText && (
              <Button text={confirmText} type="button" onClick={onConfirm} />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};
