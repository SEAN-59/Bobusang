"use client";

import { useMemo, useState } from "react";

import { Icon, type IconName } from "@/components/icon/icon";

const WINDOW_SIZE = 5;
const pageIconMap: Record<"first" | "prev" | "next" | "last", IconName> = {
  first: "doubleLeft",
  last: "doubleRight",
  next: "chevronForward",
  prev: "chevronBackward",
};

export function Pagination({
  current,
  onChange,
  total,
  windowStart,
  onWindowChange,
}: {
  current: number;
  onChange: (page: number) => void;
  total: number;
  windowStart: number;
  onWindowChange: (page: number) => void;
}) {
  const windowEnd = Math.min(windowStart + WINDOW_SIZE - 1, total);
  const lastWindowStart = Math.max(1, total - WINDOW_SIZE + 1);
  const pages = useMemo(() => {
    const result = [];
    for (let page = windowStart; page <= windowEnd; page += 1) {
      result.push(page);
    }
    return result;
  }, [windowEnd, windowStart]);

  if (total <= 0) return null;

  return (
    <nav className="pagination">
      <PageArrow disabled={windowStart === 1} icon="first" label="처음" onClick={() => onWindowChange(1)} />
      <PageArrow
        disabled={windowStart === 1}
        icon="prev"
        label="이전"
        onClick={() => onWindowChange(Math.max(1, windowStart - WINDOW_SIZE))}
      />
      {pages.map((page) => (
        <button
          className={page === current ? "page-btn active" : "page-btn"}
          key={page}
          onClick={() => onChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <PageArrow
        disabled={windowStart + WINDOW_SIZE > total}
        icon="next"
        label="다음"
        onClick={() => onWindowChange(windowStart + WINDOW_SIZE)}
      />
      <PageArrow
        disabled={windowStart >= lastWindowStart}
        icon="last"
        label="마지막"
        onClick={() => onWindowChange(lastWindowStart)}
      />
    </nav>
  );
}

export function PaginationDemo({ total }: { total: number }) {
  const [page, setPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1);

  const moveWindow = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  return (
    <Pagination
      current={page}
      onChange={setPage}
      onWindowChange={moveWindow}
      total={total}
      windowStart={windowStart}
    />
  );
}

function PageArrow({
  disabled,
  icon,
  label,
  onClick,
}: {
  disabled: boolean;
  icon: "first" | "prev" | "next" | "last";
  label: string;
  onClick: () => void;
}) {
  return (
    <button aria-label={label} className="page-btn arrow" disabled={disabled} onClick={onClick} title={label} type="button">
      <PageIcon name={icon} />
    </button>
  );
}

function PageIcon({ name }: { name: "first" | "prev" | "next" | "last" }) {
  return <Icon className="page-icon" name={pageIconMap[name]} size={16} />;
}
