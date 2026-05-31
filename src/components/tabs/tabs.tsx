"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

export type TabItem = {
  content: ReactNode;
  icon?: ReactNode;
  label: string;
};

export function SlidingTabs({ items }: { items: TabItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    const active = itemRefs.current[activeIndex];
    if (!list || !active) return;

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicator({ left: activeRect.left - listRect.left, width: activeRect.width });
  }, [activeIndex, items]);

  return (
    <div className="tabs tabs-sliding">
      <div className="tabs-list" ref={listRef} style={{ position: "relative" }}>
        <div className="tab-sliding-indicator" style={{ left: indicator.left, width: indicator.width }} />
        {items.map((item, index) => (
          <button
            className={[
              "tab-item",
              item.icon ? "tab-icon" : "",
              index === activeIndex ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={item.label}
            onClick={() => setActiveIndex(index)}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            type="button"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div className={index === activeIndex ? "tab-panel active" : "tab-panel"} key={item.label}>
          {item.content}
        </div>
      ))}
    </div>
  );
}

export function VerticalTabs({ items }: { items: TabItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ height: 0, top: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    const active = itemRefs.current[activeIndex];
    if (!list || !active) return;

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicator({ height: activeRect.height, top: activeRect.top - listRect.top });
  }, [activeIndex, items]);

  return (
    <div className="tabs-vertical">
      <div className="tabs-vertical-list" ref={listRef}>
        <div className="tab-v-indicator" style={{ height: indicator.height, top: indicator.top }} />
        {items.map((item, index) => (
          <button
            className={index === activeIndex ? "tab-v-item active" : "tab-v-item"}
            key={item.label}
            onClick={() => setActiveIndex(index)}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-vertical-content">
        {items.map((item, index) => (
          <div className={index === activeIndex ? "tab-v-panel active" : "tab-v-panel"} key={item.label}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
