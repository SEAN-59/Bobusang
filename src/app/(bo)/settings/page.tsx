import type { Metadata } from "next";

import { Button, Card } from "@/components";

import packageJson from "../../../../package.json";
import { BoShell } from "../_components/bo-shell";
import pageStyles from "../versions/versions.module.css";
import styles from "./settings.module.css";

export const metadata: Metadata = {
  title: "Bobusang 설정",
};

const accountItems = [
  { label: "계정 ID", value: "sean.admin" },
  { label: "사용자 이름", value: "Sean" },
  { label: "이메일", value: "sean@bobusang.local" },
] as const;
const projectVersion = `v${packageJson.version.split("-")[0]}`;

export default function SettingsPage() {
  return (
    <BoShell active="settings">
      <header className={pageStyles.header} aria-label="설정">
        <h1>설정</h1>
      </header>

      <section className={styles.settingsStack} aria-label="설정 정보">
        <Card className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>계정</h2>
              <p>현재 로그인한 관리자 정보입니다.</p>
            </div>
          </div>

          <dl className={styles.infoList}>
            {accountItems.map((item) => (
              <div className={styles.infoRow} key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
            <div className={styles.infoRow}>
              <dt>비밀번호</dt>
              <dd>
                <Button size="sm" variant="secondary">
                  비밀번호 수정
                </Button>
              </dd>
            </div>
          </dl>
        </Card>

        <Card className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>프로젝트 정보</h2>
              <p>운영 연락처와 현재 버전을 확인합니다.</p>
            </div>
          </div>
          <dl className={styles.infoList}>
            <div className={styles.infoRow}>
              <dt>관리자 연락처</dt>
              <dd>ksg3452@gmail.com</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>프로젝트 버전</dt>
              <dd>{projectVersion}</dd>
            </div>
          </dl>
        </Card>

        <footer className={styles.copyright}>
          Copyright SEAN
        </footer>
      </section>
    </BoShell>
  );
}
