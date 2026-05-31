import type { Metadata } from "next";

import { Button, Card } from "@/components";

import { BoShell } from "../_components/bo-shell";
import styles from "../versions/versions.module.css";
import localStyles from "./setting-system.module.css";

export const metadata: Metadata = {
  title: "Bobusang 시스템 설정",
};

export default function SettingSystemPage() {
  return (
    <BoShell active="settingSystem">
      <header className={styles.header} aria-label="시스템 설정">
        <h1>시스템 설정</h1>
      </header>

      <section className={styles.bodyStack} aria-label="시스템 설정 작업">
        <Card className={styles.summaryCard} aria-label="시스템 설정 안내">
          <div>
            <h2>시스템 설정</h2>
            <p>프로젝트에 필요한 설정을 관리합니다.</p>
          </div>
        </Card>

        <Card className={localStyles.settingActionCard} aria-label="휴일 관리 설정">
          <strong>휴일 관리</strong>
          <Button>등록하기</Button>
        </Card>
      </section>
    </BoShell>
  );
}
