"use client";

import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/skeleton-loading/skeleton-loading";

import styles from "./app-route-loading.module.css";

const minimumTransitionMs = 200;
const loadingFallbackMs = 500;

export function AppRouteLoading({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const didMountRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearLoadingTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishLoading = useCallback(() => {
    clearLoadingTimer();
    setIsLoading(false);
  }, [clearLoadingTimer]);

  const beginLoading = useCallback(() => {
    clearLoadingTimer();
    setIsLoading(true);
    timerRef.current = window.setTimeout(finishLoading, loadingFallbackMs);
  }, [clearLoadingTimer, finishLoading]);

  const handleRouteClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;

      if (!(target instanceof HTMLAnchorElement) || target.target || target.hasAttribute("download")) {
        return;
      }

      const nextUrl = new URL(target.href);

      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

      if (currentPath === nextPath) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      beginLoading();

      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
      }

      navigationTimerRef.current = window.setTimeout(() => {
        router.push(nextPath);
        navigationTimerRef.current = null;
      }, minimumTransitionMs);
    },
    [beginLoading, router],
  );

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    }

    const hideTimer = window.setTimeout(finishLoading, 0);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [pathname, finishLoading]);

  useEffect(
    () => () => {
      clearLoadingTimer();

      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
        navigationTimerRef.current = null;
      }
    },
    [clearLoadingTimer],
  );

  const overlayClassName = pathname === "/login" ? styles.overlayFull : styles.overlay;

  return (
    <div className={styles.root} onClickCapture={handleRouteClick}>
      {children}
      {isLoading ? (
        <div className={overlayClassName}>
          <RouteSkeleton />
        </div>
      ) : null}
    </div>
  );
}

function RouteSkeleton() {
  return (
    <div aria-label="페이지를 불러오는 중" className={styles.page} role="status">
      <Skeleton className={styles.title} />
      <div className={styles.summary}>
        <div>
          <Skeleton className={styles.heading} />
          <Skeleton className={styles.textShort} />
        </div>
        <Skeleton className={styles.button} />
      </div>
      <div className={styles.search} />
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <Skeleton className={styles.heading} />
          <Skeleton className={styles.textShort} />
        </div>
        <div className={styles.table}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className={styles.tableRow} key={index}>
              <Skeleton className={styles.cellLarge} />
              <Skeleton className={styles.cell} />
              <Skeleton className={styles.cell} />
              <Skeleton className={styles.cell} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
