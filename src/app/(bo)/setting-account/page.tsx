import type { Metadata } from "next";

import { ToastProvider } from "@/components";

import { BoShell } from "../_components/bo-shell";
import styles from "../versions/versions.module.css";
import { SettingAccountClient } from "./setting-account-client";

export const metadata: Metadata = {
  title: "Bobusang 계정 관리",
};

export default function SettingAccountPage() {
  return (
    <ToastProvider>
      <BoShell active="settingAccount">
        <header className={styles.header} aria-label="계정 관리">
          <h1>계정 관리</h1>
        </header>

        <SettingAccountClient />
      </BoShell>
    </ToastProvider>
  );
}
