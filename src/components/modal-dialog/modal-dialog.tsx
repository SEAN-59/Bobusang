"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { Icon } from "@/components/icon/icon";

type OverlayProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({
  children,
  isOpen,
  onClose,
}: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayEffects(isOpen, panelRef, onClose);

  return (
    <div className={isOpen ? "modal-overlay open" : "modal-overlay"} onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} ref={panelRef}>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="modal-header">
      <p className="modal-title">{children}</p>
      <button aria-label="닫기" className="modal-close" onClick={onClose} type="button">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

export function ModalBody({ children, scroll = false }: { children: ReactNode; scroll?: boolean }) {
  if (scroll) {
    return <div className="modal-body-scroll">{children}</div>;
  }
  return <div className="modal-body">{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className="modal-footer">{children}</div>;
}

export function BottomSheet({ children, isOpen, onClose }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayEffects(isOpen, panelRef, onClose);

  return (
    <div className={isOpen ? "sheet-overlay open" : "sheet-overlay"} onClick={onClose}>
      <div className="sheet" onClick={(event) => event.stopPropagation()} ref={panelRef}>
        <div className="sheet-handle" />
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="sheet-header">
      <p className="modal-title">{children}</p>
      <button aria-label="닫기" className="modal-close" onClick={onClose} type="button">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

export function SheetBody({ children }: { children: ReactNode }) {
  return <div className="sheet-body">{children}</div>;
}

export function SideDrawer({ children, isOpen, onClose }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayEffects(isOpen, panelRef, onClose);

  return (
    <div className={isOpen ? "drawer-overlay open" : "drawer-overlay"} onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()} ref={panelRef}>
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="drawer-header">
      <p className="modal-title">{children}</p>
      <button aria-label="닫기" className="modal-close" onClick={onClose} type="button">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

export function DrawerBody({ children }: { children: ReactNode }) {
  return <div className="drawer-body">{children}</div>;
}

export function DrawerFooter({ children }: { children: ReactNode }) {
  return <div className="drawer-footer">{children}</div>;
}

function useOverlayEffects(
  isOpen: boolean,
  panelRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      target?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, panelRef]);
}
