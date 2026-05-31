import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import styles from "../versions/versions.module.css";
import { ServiceVariablesClient } from "./service-variables-client";

export const metadata: Metadata = {
  title: "Bobusang 서비스 변수",
};

export default function ServiceVariablesPage() {
  return (
    <ToastProvider>
      <BoShell active="serviceVariables">
        <header className={styles.header} aria-label="서비스 변수">
          <h1>서비스 변수</h1>
        </header>

        <ServiceVariablesClient />
      </BoShell>
    </ToastProvider>
  );
}
