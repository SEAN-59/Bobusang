"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

export function Switch({
  defaultChecked,
  disabled,
  label,
}: {
  defaultChecked?: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div className="toggle-item">
      <label className="toggle">
        <input defaultChecked={defaultChecked} disabled={disabled} type="checkbox" />
        <div className="toggle-track" />
      </label>
      <span className="toggle-label" style={disabled ? { color: "var(--color-text-disabled)" } : undefined}>
        {label}
      </span>
    </div>
  );
}

export function ButtonToggle({
  children,
  defaultActive = false,
  disabled = false,
  dot = false,
}: {
  children: ReactNode;
  defaultActive?: boolean;
  disabled?: boolean;
  dot?: boolean;
}) {
  const [active, setActive] = useState(defaultActive);

  return (
    <button
      className={active ? "btn-toggle active" : "btn-toggle"}
      disabled={disabled}
      onClick={() => setActive((value) => !value)}
      type="button"
    >
      {dot ? <span className="btn-toggle-dot" /> : null}
      {children}
    </button>
  );
}

export function SegmentedToggle({ items }: { items: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const group = groupRef.current;
    const active = buttonRefs.current[activeIndex];
    if (!group || !active) return;

    const groupRect = group.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicator({ left: activeRect.left - groupRect.left, width: activeRect.width });
  }, [activeIndex, items]);

  return (
    <div className="btn-toggle-group" ref={groupRef}>
      <div className="btn-toggle-indicator" style={{ left: indicator.left, width: indicator.width }} />
      {items.map((item, index) => (
        <button
          className={index === activeIndex ? "btn-toggle-seg active" : "btn-toggle-seg"}
          key={item}
          onClick={() => setActiveIndex(index)}
          ref={(node) => {
            buttonRefs.current[index] = node;
          }}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
