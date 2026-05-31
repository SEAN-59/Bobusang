import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import { ActiveStatusClient } from "./active-status-client";
import styles from "../versions/versions.module.css";

export const metadata: Metadata = {
  title: "Bobusang 활성 현황",
};

export default function ActiveStatusPage() {
  return (
    <ToastProvider>
      <BoShell active="activeStatus">
        <header className={styles.header} aria-label="활성 현황">
          <h1>활성 현황</h1>
        </header>

        <ActiveStatusClient />
      </BoShell>
    </ToastProvider>
  );
}
