import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "accent" | "success" | "warning" | "danger" | "neutral";

export function Badge({
  children,
  className = "",
  variant = "accent",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span className={["badge", `badge-${variant}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </span>
  );
}
