import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import styles from "../versions/versions.module.css";
import { HolidaysClient } from "./holidays-client";

export const metadata: Metadata = {
  title: "Bobusang 휴일 관리",
};

export default function HolidaysPage() {
  return (
    <ToastProvider>
      <BoShell active="holidays">
        <header className={styles.header} aria-label="휴일 관리">
          <h1>휴일 관리</h1>
        </header>

        <HolidaysClient />
      </BoShell>
    </ToastProvider>
  );
}
