"use client";

import { type ChangeEvent, type InputHTMLAttributes, type ReactNode, useRef, useState } from "react";

type CheckState = "indeterminate" | "checked" | "unchecked";

export function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg height={size} viewBox="0 0 10 10" width={size}>
      <path className="check-path" d="M1.5 5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function Checkbox({
  children,
  className = "",
  disabled,
  defaultChecked,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children: ReactNode;
}) {
  return (
    <label className={["check-item", className].filter(Boolean).join(" ")}>
      <input defaultChecked={defaultChecked} disabled={disabled} type="checkbox" {...props} />
      <span className="check-box">
        <CheckIcon />
      </span>
      <span className={disabled ? "check-label disabled" : "check-label"}>{children}</span>
    </label>
  );
}

export function IndeterminateCheckbox({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  const [state, setState] = useState<CheckState>("indeterminate");
  const inputRef = useRef<HTMLInputElement>(null);

  const next = () => {
    setState((current) => {
      if (current === "indeterminate") return "checked";
      if (current === "checked") return "unchecked";
      return "indeterminate";
    });
  };

  const boxClass = [
    "check-box",
    state === "indeterminate" ? "check-box-indeterminate" : "",
    state === "checked" ? "check-box-checked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="check-item indeterminate-item">
      <input
        checked={state === "checked"}
        className="is-indeterminate"
        disabled={disabled}
        onChange={next}
        ref={(node) => {
          inputRef.current = node;
          if (node) node.indeterminate = state === "indeterminate";
        }}
        type="checkbox"
      />
      <span className={boxClass} style={disabled ? { opacity: 0.4 } : undefined}>
        <svg height="10" viewBox="0 0 10 10" width="10">
          <path className="check-path" d="M1.5 5l2.5 2.5 4.5-5" />
          <line className="indeterminate-path" stroke="#fff" strokeLinecap="round" strokeWidth="2" x1="2" x2="8" y1="5" y2="5" />
        </svg>
      </span>
      <span className={disabled ? "check-label disabled" : "check-label"}>{children}</span>
    </label>
  );
}

export function Radio({
  children,
  className = "",
  disabled,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children: ReactNode;
}) {
  return (
    <label className={["check-item", className].filter(Boolean).join(" ")}>
      <input disabled={disabled} type="radio" {...props} />
      <span className="radio-box">
        <span className="radio-dot" />
      </span>
      <span className={disabled ? "check-label disabled" : "check-label"}>{children}</span>
    </label>
  );
}

export function CardCheckbox({
  children,
  defaultChecked,
  disabled,
}: {
  children: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="card-check">
      <input defaultChecked={defaultChecked} disabled={disabled} type="checkbox" />
      <div className="card-check-inner" style={disabled ? { opacity: 0.4 } : undefined}>
        {children}
        <span className="card-check-indicator">
          <span className="check-box" style={{ height: 16, width: 16 }}>
            <CheckIcon size={9} />
          </span>
        </span>
      </div>
    </label>
  );
}

export function CardRadio({
  children,
  defaultChecked,
  name,
}: {
  children: ReactNode;
  defaultChecked?: boolean;
  name: string;
}) {
  return (
    <label className="card-radio">
      <input defaultChecked={defaultChecked} name={name} type="radio" />
      <div className="card-check-inner">
        {children}
        <span className="card-check-indicator">
          <span className="radio-box" style={{ height: 16, width: 16 }}>
            <span className="radio-dot" style={{ height: 5, width: 5 }} />
          </span>
        </span>
      </div>
    </label>
  );
}

export function useCheckGroupChange(handler?: (event: ChangeEvent<HTMLInputElement>) => void) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    handler?.(event);
  };
}
