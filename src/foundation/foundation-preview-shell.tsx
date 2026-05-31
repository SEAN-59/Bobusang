"use client";

import { type ReactNode, useEffect, useState } from "react";

const DEFAULT_ACCENT = "#2f6f5e";

const navGroups = [
  {
    label: "Foundation",
    items: [
      { href: "#s-color", label: "Color" },
      { href: "#s-typography", label: "Typography" },
      { href: "#s-spacing", label: "Spacing" },
      { href: "#s-radius", label: "Radius & Shadow" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { href: "#s-topbar", label: "Topbar" },
      { href: "#s-sidebar", label: "Sidebar" },
      { href: "#s-mixed", label: "Topbar + Sidebar" },
      { href: "#s-mobile", label: "Mobile Hamburger" },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "#s-button", label: "Button" },
      { href: "#s-badge", label: "Badge" },
      { href: "#s-card", label: "Card" },
      { href: "#s-checkbox", label: "Checkbox & Radio" },
      { href: "#s-toggle", label: "Toggle / Switch" },
      { href: "#s-tabs", label: "Tabs" },
      { href: "#s-table", label: "Table" },
      { href: "#s-breadcrumb", label: "Breadcrumb" },
      { href: "#s-pagination", label: "Pagination" },
      { href: "#s-dropdown", label: "Dropdown" },
      { href: "#s-tooltip", label: "Tooltip" },
      { href: "#s-modal", label: "Modal / Dialog" },
      { href: "#s-toast", label: "Toast / Snackbar" },
      { href: "#s-skeleton", label: "Skeleton / Loading" },
      { href: "#s-empty", label: "Empty State" },
      { href: "#s-form", label: "Form" },
    ],
  },
];

export function FoundationPreviewShell({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const [activeHref, setActiveHref] = useState("#s-color");
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "";
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [darkMode]);

  useEffect(() => {
    const updateActiveNav = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".gl-section"));
      const threshold = window.innerHeight * 0.25;
      let current = "#s-color";

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + threshold >= top) {
          current = `#${section.id}`;
        }
      });

      setActiveHref(current);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  return (
    <div className="gl-wrap">
      <aside className={navOpen ? "gl-nav open" : "gl-nav"} aria-label="Foundation navigation">
        <div className="gl-nav-header">
          <h2>Design System</h2>
          <p>Bobusang v2</p>
        </div>

        <div className="gl-nav-picker">
          <label htmlFor="foundation-accent">Accent</label>
          <input
            id="foundation-accent"
            type="color"
            value={accent}
            onChange={(event) => setAccent(event.target.value)}
          />
          <span>{accent}</span>
        </div>

        <button className="dark-mode-btn" type="button" onClick={() => setDarkMode((value) => !value)}>
          <span className="dark-mode-icon" aria-hidden="true">
            {darkMode ? "D" : "L"}
          </span>
          <span className="dark-mode-label">Dark mode</span>
          <span className="dark-mode-status">{darkMode ? "on" : "off"}</span>
        </button>

        {navGroups.map((group) => (
          <nav aria-label={`${group.label} sections`} className="gl-nav-group" key={group.label}>
            <p className="gl-nav-group-label">{group.label}</p>
            {group.items.map((item) => (
              <a
                className={activeHref === item.href ? "gl-nav-link active" : "gl-nav-link"}
                href={item.href}
                key={item.href}
                onClick={() => {
                  setActiveHref(item.href);
                  setNavOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ))}
      </aside>

      <main className="gl-content">
        <div className="gl-content-inner">{children}</div>
      </main>

      <button
        aria-label="메뉴 열기"
        className="gl-mobile-fab"
        type="button"
        onClick={() => setNavOpen((value) => !value)}
      >
        ☰
      </button>
    </div>
  );
}

function applyAccent(hex: string) {
  const root = document.documentElement;

  if (hex.toLowerCase() === DEFAULT_ACCENT) {
    root.style.setProperty("--accent-h", "164");
    root.style.setProperty("--accent-s", "40%");
    root.style.setProperty("--color-accent", "#2f6f5e");
    root.style.setProperty("--color-accent-hover", "#245748");
    root.style.setProperty("--color-accent-light", "#eaf4f0");
    root.style.setProperty("--color-accent-subtle", "#f6fbf9");
    root.style.setProperty("--color-accent-border", "#b8d8cc");
    root.style.setProperty("--color-accent-text", "#245748");
    return;
  }

  const { h, s } = hexToHsl(hex);
  root.style.setProperty("--accent-h", String(h));
  root.style.setProperty("--accent-s", `${s}%`);
  root.style.setProperty("--color-accent", hex);
  root.style.setProperty("--color-accent-hover", `hsl(${h}, ${s}%, 40%)`);
  root.style.setProperty("--color-accent-light", `hsl(${h}, ${s}%, 94%)`);
  root.style.setProperty("--color-accent-subtle", `hsl(${h}, 30%, 97%)`);
  root.style.setProperty("--color-accent-border", `hsl(${h}, ${s}%, 82%)`);
  root.style.setProperty("--color-accent-text", `hsl(${h}, ${s}%, 35%)`);
}

function hexToHsl(hex: string) {
  const normalized = hex.replace("#", "");
  const red = parseInt(normalized.slice(0, 2), 16) / 255;
  const green = parseInt(normalized.slice(2, 4), 16) / 255;
  const blue = parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0 };
  }

  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return { h: Math.round((hue / 6) * 360), s: Math.round(saturation * 100) };
}
