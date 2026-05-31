"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Icon } from "@/components/icon/icon";

type DropdownContextValue = {
  close: () => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function Dropdown({
  ariaLabel,
  children,
  label,
  menuClassName,
  rootClassName,
  triggerClassName = "btn btn-md btn-secondary",
  width = "min",
}: {
  ariaLabel?: string;
  children: ReactNode;
  label: ReactNode;
  menuClassName?: string;
  rootClassName?: string;
  triggerClassName?: string;
  width?: "min" | "trigger";
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 180 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const positionMenu = useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger || !menu) return;

    const margin = 8;
    const rect = trigger.getBoundingClientRect();
    const availableWidth = Math.max(120, window.innerWidth - margin * 2);
    const desiredWidth = width === "trigger" ? rect.width : Math.max(rect.width, 180);
    const menuWidth = Math.min(desiredWidth, availableWidth);
    const preferredLeft = rect.left + rect.width / 2 - menuWidth / 2;
    const maxLeft = Math.max(margin, window.innerWidth - menuWidth - margin);
    const left = Math.min(Math.max(preferredLeft, margin), maxLeft);
    const menuHeight = menu.scrollHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight + margin && rect.top > menuHeight + margin;
    const preferredTop = openUp ? rect.top - menuHeight - 4 : rect.bottom + 4;
    const maxTop = Math.max(margin, window.innerHeight - Math.min(menuHeight, window.innerHeight - margin * 2) - margin);
    const top = Math.min(Math.max(preferredTop, margin), maxTop);

    setPosition({ left, top, width: menuWidth });
  }, [width]);

  useEffect(() => {
    if (!open) return;
    positionMenu();

    const onGlobalClose = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("scroll", onGlobalClose, true);
    window.addEventListener("wheel", onGlobalClose, { passive: true });
    window.addEventListener("resize", onGlobalClose);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onGlobalClose, true);
      window.removeEventListener("wheel", onGlobalClose);
      window.removeEventListener("resize", onGlobalClose);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, positionMenu]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const context = useMemo(() => ({ close }), [close]);

  return (
    <span className={["dropdown", rootClassName].filter(Boolean).join(" ")}>
      <button
        aria-expanded={open}
        aria-label={ariaLabel}
        className={open ? `${triggerClassName} is-open` : triggerClassName}
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        {label}
      </button>
      <DropdownContext.Provider value={context}>
        <div
          className={["dropdown-menu", open ? "open" : "", menuClassName].filter(Boolean).join(" ")}
          ref={menuRef}
          style={{
            left: position.left,
            maxHeight: "calc(100vh - 16px)",
            overflowY: "auto",
            top: position.top,
            width: position.width,
          }}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    </span>
  );
}

export function DropdownItem({
  active = false,
  children,
  danger = false,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
}) {
  const context = useContext(DropdownContext);

  return (
    <button
      className={["dropdown-item", danger ? "danger" : "", active ? "active" : ""].filter(Boolean).join(" ")}
      onClick={() => {
        onClick?.();
        context?.close();
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="dropdown-divider" />;
}

export function DropdownSectionLabel({ children }: { children: ReactNode }) {
  return <div className="dropdown-section-label">{children}</div>;
}

export function SelectArrow() {
  return (
    <span aria-hidden="true" className="select-arrow">
      <Icon name="arrowDown" size={16} />
    </span>
  );
}
