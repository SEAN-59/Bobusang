import type { Metadata } from "next";

import { Badge, Card } from "@/components";

import { BoShell } from "../_components/bo-shell";
import { DashboardReveal } from "./_components/dashboard-reveal";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Bobusang 대시보드",
};

const statusCards = [
  {
    label: "API 상태",
    value: "정상",
    meta: "평균 응답 82ms · 에러율 0.02%",
    status: "운영 중",
    variant: "success",
  },
  {
    label: "총 외부 호출",
    value: "12,480",
    meta: "오늘 누적 요청",
    status: "+8.4%",
    variant: "accent",
  },
] as const;

const callRows = [
  { label: "앱 버전 조회", percent: 64, value: "5,842" },
  { label: "서비스 변수 조회", percent: 48, value: "4,210" },
  { label: "휴일 조회", percent: 17, value: "1,524" },
  { label: "인증 요청", percent: 10, value: "904" },
];

export default function DashboardPage() {
  return (
    <BoShell active="dashboard" overlay={<DashboardReveal />}>
        <header className={styles.header} aria-label="대시보드">
          <h1>대시보드</h1>
        </header>

        <section className={styles.statusGrid} aria-label="전체 상태">
          {statusCards.map((item) => (
            <Card className={styles.statusCard} key={item.label}>
              <div className={styles.cardTopline}>
                <span className={styles.cardLabel}>{item.label}</span>
                <Badge variant={item.variant}>{item.status}</Badge>
              </div>
              <strong className={styles.cardValue}>{item.value}</strong>
              <span className={styles.cardMeta}>{item.meta}</span>
            </Card>
          ))}
        </section>

        <section className={styles.dashboardGrid} aria-label="운영 현황">
          <Card className={styles.callCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>외부 호출 현황</h2>
              </div>
              <Badge variant="neutral">오늘</Badge>
            </div>

            <div className={styles.callList}>
              {callRows.map((row) => (
                <div className={styles.callRow} key={row.label}>
                  <div className={styles.callInfo}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                  <div className={styles.callTrack} aria-hidden="true">
                    <span style={{ width: `${row.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
    </BoShell>
  );
}
