import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import { VersionsClient } from "./versions-client";
import styles from "./versions.module.css";

export const metadata: Metadata = {
  title: "Bobusang 버전 관리",
};

export default function VersionsPage() {
  return (
    <ToastProvider>
      <BoShell active="versions">
        <header className={styles.header} aria-label="버전 관리">
          <h1>버전 관리</h1>
        </header>

        <VersionsClient />
      </BoShell>
    </ToastProvider>
  );
}
