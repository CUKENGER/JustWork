import { cn } from "../lib";
import { ReactNode, useEffect, useRef } from "react";

interface PropTypes {
  isOpen: boolean;
  children: ReactNode;
  handleClose: () => void;
}

export const SideModal = ({ isOpen, children, handleClose }: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ease-in-out will-change-opacity",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
      <div
        ref={modalRef}
        className={cn(
          "fixed top-0 left-0 h-full w-[18rem] bg-background z-[1000] transform transition-transform duration-300 ease-in-out will-change-transform isolate",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div id="sidebar-title" className="sr-only">
          Мобильное меню
        </div>
        {children}
      </div>
    </div>
  );
};
