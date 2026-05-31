import type { ReactNode } from "react";

import { SidebarNavigation } from "@/components";
import type { IconName } from "@/components";
import bobusangImage from "@/assets/image/bobusang-image.png";

import styles from "./bo-shell.module.css";

type BoNavKey =
  | "activeStatus"
  | "dashboard"
  | "holidays"
  | "settingAccount"
  | "settingSystem"
  | "services"
  | "serviceVariables"
  | "settings"
  | "versions";

type BoNavItem = {
  href: string;
  icon: IconName;
  key: BoNavKey;
  label: string;
};

const navigationGroups: Array<{
  items: BoNavItem[];
  label: string;
}> = [
  {
    label: "General",
    items: [
      { href: "/dashboard", icon: "dashboard", key: "dashboard", label: "대시보드" },
      { href: "/service-variables", icon: "contractEdit", key: "serviceVariables", label: "서비스 변수" },
      { href: "/holidays", icon: "calendar", key: "holidays", label: "휴일 관리" },
    ],
  },
  {
    label: "Apps",
    items: [
      { href: "/versions", icon: "mobileLoupe", key: "versions", label: "버전 관리" },
      { href: "/active-status", icon: "groups", key: "activeStatus", label: "활성 현황" },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { href: "/setting-account", icon: "manageAccount", key: "settingAccount", label: "계정 관리" },
      { href: "/setting-system", icon: "manageCertificate", key: "settingSystem", label: "시스템 설정" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/services", icon: "addNotes", key: "services", label: "서비스 등록" },
      { href: "/settings", icon: "settings", key: "settings", label: "설정" },
    ],
  },
];

export function BoShell({
  active,
  children,
  overlay,
}: {
  active: BoNavKey;
  children: ReactNode;
  overlay?: ReactNode;
}) {
  const groups = navigationGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      active: item.key === active,
      href: item.href,
      icon: item.icon,
      label: item.label,
    })),
  }));

  return (
    <main className={styles.page}>
      {overlay}
      <SidebarNavigation
        brand="Bobusang"
        brandHref="/dashboard"
        brandImageSrc={bobusangImage.src}
        groups={groups}
        user={{ initial: "S", name: "Sean", role: "Admin" }}
      />
      <section className={styles.content}>{children}</section>
    </main>
  );
}
