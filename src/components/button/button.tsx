import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  block?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  block = false,
  children,
  className = "",
  disabled,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${size}`,
    `btn-${variant}`,
    block ? "btn-block" : "",
    isLoading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || undefined}
      className={classes}
      disabled={disabled}
      type={type}
      {...props}
    >
      {isLoading ? <span aria-hidden="true" className="btn-spinner" /> : null}
      {children}
    </button>
  );
}
