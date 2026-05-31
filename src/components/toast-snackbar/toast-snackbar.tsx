"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Icon, type IconName } from "@/components/icon/icon";

type ToastType = "success" | "warning" | "danger" | "info";
type ToastItem = {
  id: number;
  message: string;
  removing?: boolean;
  title: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (type: ToastType, title: string, message: string) => void;
};

const TOAST_LIMIT = 4;
const TOAST_EXIT_MS = 240;
const ToastContext = createContext<ToastContextValue | null>(null);

const toastIcons: Record<ToastType, IconName> = {
  danger: "error",
  info: "feedback",
  success: "starFill",
  warning: "error",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const queueRef = useRef<ToastItem[]>([]);
  const finishRemoveRef = useRef<(id: number) => void>(() => undefined);
  const idRef = useRef(0);
  const startRemoveRef = useRef<(id: number) => void>(() => undefined);
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const startRemove = useCallback((id: number) => {
    setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, removing: true } : toast)));
    const timer = timersRef.current.get(id);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(id);

    setTimeout(() => {
      finishRemoveRef.current(id);
    }, TOAST_EXIT_MS);
  }, []);

  const finishRemove = useCallback((id: number) => {
    setToasts((current) => {
      const next = current.filter((toast) => toast.id !== id);
      const queued = queueRef.current.shift();
      if (!queued) return next;

      timersRef.current.set(queued.id, setTimeout(() => startRemoveRef.current(queued.id), 4000));
      return [...next, queued];
    });
  }, []);

  useEffect(() => {
    startRemoveRef.current = startRemove;
    finishRemoveRef.current = finishRemove;
  }, [finishRemove, startRemove]);

  const showToast = useCallback(
    (type: ToastType, title: string, message: string) => {
      const nextToast = { id: idRef.current + 1, message, title, type };
      idRef.current += 1;

      setToasts((current) => {
        if (current.length >= TOAST_LIMIT) {
          queueRef.current.push(nextToast);
          const oldest = current.find((toast) => !toast.removing);
          if (oldest) {
            queueMicrotask(() => startRemoveRef.current(oldest.id));
          }
          return current;
        }

        timersRef.current.set(nextToast.id, setTimeout(() => startRemoveRef.current(nextToast.id), 4000));
        return [...current, nextToast];
      });
    },
    [],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport onClose={startRemove} toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

export function ToastViewport({
  onClose,
  toasts,
}: {
  onClose: (id: number) => void;
  toasts: ToastItem[];
}) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div className={toast.removing ? "toast removing" : "toast toast-entering"} key={toast.id}>
          <div className={`toast-icon ${toast.type}`}>
            <Icon name={toastIcons[toast.type]} size={12} />
          </div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-msg">{toast.message}</div>
          </div>
          <button aria-label="토스트 닫기" className="toast-close" onClick={() => onClose(toast.id)} type="button">
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function StaticToast({
  message,
  title,
  type,
}: {
  message: string;
  title: string;
  type: ToastType;
}) {
  return (
    <div className="toast">
      <div className={`toast-icon ${type}`}>
        <Icon name={toastIcons[type]} size={12} />
      </div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-msg">{message}</div>
      </div>
      <button aria-label="토스트 닫기" className="toast-close" type="button">
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
