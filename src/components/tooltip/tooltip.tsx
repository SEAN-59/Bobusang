import type { ReactNode } from "react";

export function Tooltip({ children, message }: { children: ReactNode; message: string }) {
  return (
    <span className="tooltip-wrap">
      {children}
      <span className="tooltip-box">{message}</span>
    </span>
  );
}
