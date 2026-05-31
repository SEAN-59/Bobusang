import type { ReactNode } from "react";

export type BreadcrumbItem = {
  current?: boolean;
  label: string;
};

export function Breadcrumb({ items, separator = "/" }: { items: BreadcrumbItem[]; separator?: ReactNode }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} style={{ display: "contents" }}>
          <span className={item.current ? "breadcrumb-item current" : "breadcrumb-item"}>{item.label}</span>
          {index < items.length - 1 ? <span className="breadcrumb-sep">{separator}</span> : null}
        </span>
      ))}
    </nav>
  );
}
