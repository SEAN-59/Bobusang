import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import styles from "../versions/versions.module.css";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Bobusang 서비스 등록",
};

export default function ServicesPage() {
  return (
    <ToastProvider>
      <BoShell active="services">
        <header className={styles.header} aria-label="서비스 등록">
          <h1>서비스 등록</h1>
        </header>

        <ServicesClient />
      </BoShell>
    </ToastProvider>
  );
}
