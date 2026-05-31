"use client";

import { useEffect, useState } from "react";

import styles from "../dashboard.module.css";

const revealStorageKey = "bobusang:dashboard-reveal";
const revealDuration = 1150;

export function DashboardReveal() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.sessionStorage.getItem(revealStorageKey) === "1";
  });

  useEffect(() => {
    if (!isVisible) return undefined;

    window.sessionStorage.removeItem(revealStorageKey);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, revealDuration);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return <div aria-hidden="true" className={styles.revealCurtain} />;
}
