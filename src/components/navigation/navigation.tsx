"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { useState } from "react";

import { Dropdown, DropdownDivider } from "@/components/dropdown/dropdown";
import { Icon, type IconName } from "@/components/icon/icon";

type NavItem = {
  active?: boolean;
  href?: string;
  icon?: IconName;
  label: string;
};

type SidebarGroup = {
  items: NavItem[];
  label: string;
};

type UserSummary = {
  initial: string;
  name: string;
  role: string;
};

const defaultSidebarGroups: SidebarGroup[] = [
  {
    label: "General",
    items: [
      { active: true, label: "대시보드" },
      { label: "메시지" },
      { label: "통계" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "서비스 관리" },
      { label: "환경설정" },
    ],
  },
];

const defaultTopbarItems: NavItem[] = [
  { active: true, label: "홈" },
  { label: "서비스" },
  { label: "블로그" },
  { label: "소개" },
];

const defaultMixedTopItems: NavItem[] = [
  { active: true, label: "Console" },
  { label: "Analytics" },
  { label: "Docs" },
];

const defaultMixedGroups: SidebarGroup[] = [
  {
    label: "Console",
    items: [
      { active: true, label: "대시보드" },
      { label: "서비스" },
      { label: "템플릿" },
      { label: "디바이스" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "환경설정" },
      { label: "웹훅" },
    ],
  },
];

const defaultMobileItems: NavItem[] = [
  { active: true, label: "대시보드" },
  { label: "메시지" },
  { label: "통계" },
  { label: "서비스 관리" },
  { label: "환경설정" },
];

const defaultUser: UserSummary = {
  initial: "S",
  name: "Sean",
  role: "Admin",
};

export function TopbarNavigation({
  actions,
  brand = "Brand",
  items = defaultTopbarItems,
}: {
  actions?: ReactNode;
  brand?: string;
  items?: NavItem[];
}) {
  return (
    <div className="demo-topbar">
      <span className="demo-topbar-logo">{brand}</span>
      <nav className="demo-topbar-nav">
        {items.map((item) => (
          <NavAnchor
            active={item.active}
            className="demo-topbar-link"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </NavAnchor>
        ))}
      </nav>
      <div className="demo-topbar-actions">
        {actions ?? (
          <>
            <button className="btn btn-sm btn-secondary" type="button">로그인</button>
            <button className="btn btn-sm btn-primary" type="button">시작하기</button>
          </>
        )}
      </div>
    </div>
  );
}

export function TopbarNavigationPreview() {
  return (
    <div className="demo-topbar-wrap">
      <TopbarNavigation />
      <div className="demo-placeholder">
        <p>Page Content Area</p>
      </div>
    </div>
  );
}

export function SidebarNavigation({
  brand = "Brand",
  brandHref,
  brandImageSrc,
  groups = defaultSidebarGroups,
  user = defaultUser,
}: {
  brand?: string;
  brandHref?: string;
  brandImageSrc?: string;
  groups?: SidebarGroup[];
  user?: UserSummary;
}) {
  const brandContent = (
    <>
      {brandImageSrc ? (
        <Image
          alt=""
          className="demo-sidebar-logo-image"
          height={24}
          src={brandImageSrc}
          width={24}
        />
      ) : null}
      <span>{brand}</span>
    </>
  );

  return (
    <aside className="demo-sidebar">
      {brandHref ? (
        <Link className="demo-sidebar-logo" href={brandHref}>
          {brandContent}
        </Link>
      ) : (
        <div className="demo-sidebar-logo">{brandContent}</div>
      )}
      {groups.map((group) => (
        <div className="demo-sidebar-group" key={group.label}>
          <div className="demo-sidebar-group-label">{group.label}</div>
          {group.items.map((item) => (
            <NavAnchor
              active={item.active}
              className="demo-sidebar-link"
              href={item.href}
              key={item.label}
            >
              {item.icon ? (
                <Icon className="demo-sidebar-icon" name={item.icon} size={18} />
              ) : (
                <div className="demo-sidebar-icon" />
              )}
              {item.label}
            </NavAnchor>
          ))}
        </div>
      ))}
      <div className="demo-sidebar-bottom">
        <Dropdown
          ariaLabel={`${user.name} 관리자 메뉴`}
          label={(
            <>
              <div className="demo-avatar">{user.initial}</div>
              <div className="demo-sidebar-user-info">
                <p>{user.name}</p>
                <span>{user.role}</span>
              </div>
            </>
          )}
          menuClassName="demo-sidebar-user-menu"
          rootClassName="demo-sidebar-user-dropdown"
          triggerClassName="demo-sidebar-user"
          width="trigger"
        >
          <Link className="dropdown-item" href="/settings">
            계정 설정
          </Link>
          <Link className="dropdown-item" href="/swagger">
            사용방법
          </Link>
          <DropdownDivider />
          <Link className="dropdown-item danger" href="/login">
            로그아웃
          </Link>
        </Dropdown>
      </div>
    </aside>
  );
}

export function SidebarNavigationPreview() {
  return (
    <div className="demo-sidebar-wrap">
      <SidebarNavigation />
      <div className="demo-main">
        <div className="demo-main-header">
          <div>
            <div className="demo-main-title">대시보드</div>
            <div className="demo-main-sub">오늘의 현황</div>
          </div>
          <button className="btn btn-sm btn-primary" type="button">+ 추가</button>
        </div>
        <div className="demo-card-grid">
          <MiniCard label="전송량" value="12,450" />
          <MiniCard label="성공률" value="98.2%" />
          <MiniCard label="구독자" value="3,820" />
        </div>
        <SmallTable
          rows={[
            ["SPMS iOS", <span style={{ color: "var(--color-success)" }} key="ios-status">Active</span>, "4,201"],
            ["SPMS Android", <span style={{ color: "var(--color-success)" }} key="android-status">Active</span>, "8,249"],
          ]}
        />
      </div>
    </div>
  );
}

export function MixedNavigation() {
  return (
    <div className="demo-mixed-wrap">
      <div className="demo-mixed-topbar">
        <span className="demo-mixed-logo">Brand</span>
        <div className="demo-mixed-topnav">
          {defaultMixedTopItems.map((item) => (
            <NavAnchor
              active={item.active}
              className="demo-mixed-toplink"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </NavAnchor>
          ))}
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: "var(--space-3)", marginLeft: "auto" }}>
          <span className="badge badge-accent">Pro</span>
          <div className="demo-avatar" style={{ fontSize: 10, height: 28, width: 28 }}>S</div>
        </div>
      </div>
      <div className="demo-mixed-body">
        <div className="demo-mixed-sidebar">
          {defaultMixedGroups.map((group, groupIndex) => (
            <div key={group.label}>
              <div
                className="demo-mixed-sidebar-label"
                style={groupIndex === 0 ? { marginTop: 0 } : undefined}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <NavAnchor
                  active={item.active}
                  className="demo-mixed-link"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </NavAnchor>
              ))}
            </div>
          ))}
        </div>
        <div className="demo-mixed-main">
          <div>
            <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, marginBottom: 4 }}>대시보드</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: 10 }}>Console › 대시보드</div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)", gridTemplateColumns: "1fr 1fr" }}>
            <MiniCard label="전송량" value="12,450" />
            <MiniCard label="성공률" value="98.2%" />
          </div>
          <SmallTable
            headers={["서비스", "상태", "전송"]}
            rows={[
              ["iOS SDK", <span style={{ color: "var(--color-success)" }} key="ios-status">Active</span>, "4,201"],
              ["Android", <span style={{ color: "var(--color-success)" }} key="android-status">Active</span>, "8,249"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function MixedNavigationPreview() {
  return <MixedNavigation />;
}

export function MobileHamburgerNavigation({
  brand = "Brand",
  items = defaultMobileItems,
  user = defaultUser,
}: {
  brand?: string;
  items?: NavItem[];
  user?: UserSummary;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="demo-mobile-outer">
      <div className="demo-mobile">
        <div className="demo-mobile-topbar">
          <span className="demo-mobile-logo">{brand}</span>
          <button
            aria-expanded={isOpen}
            aria-label="메뉴 열기"
            className={["demo-hamburger", isOpen ? "open" : ""].filter(Boolean).join(" ")}
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="demo-mobile-content">
          <h3>메인 콘텐츠</h3>
          <div className="demo-content-block" />
          <div className="demo-content-block" />
          <div className="demo-content-block" />
        </div>
        <div className={["demo-mobile-drawer", isOpen ? "open" : ""].filter(Boolean).join(" ")}>
          {items.map((item, index) => (
            <Fragment key={item.label}>
              {index === 3 ? <div className="demo-drawer-divider" /> : null}
              <NavAnchor
                active={item.active}
                className="demo-drawer-link"
                href={item.href}
              >
                {item.icon ? (
                  <Icon className="demo-drawer-icon" name={item.icon} size={20} />
                ) : (
                  <div className="demo-drawer-icon" />
                )}
                {item.label}
              </NavAnchor>
            </Fragment>
          ))}
          <div className="demo-drawer-footer">
            <div className="demo-drawer-user">
              <div className="demo-avatar">{user.initial}</div>
              <div className="demo-drawer-user-info">
                <p>{user.name}</p>
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileHamburgerNavigationPreview() {
  return <MobileHamburgerNavigation />;
}

function NavAnchor({
  active,
  children,
  className,
  href,
}: {
  active?: boolean;
  children: ReactNode;
  className: string;
  href?: string;
}) {
  const linkClassName = [className, active ? "active" : ""].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link aria-current={active ? "page" : undefined} className={linkClassName} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={linkClassName}>{children}</span>;
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="demo-card-mini">
      <div className="demo-card-mini-label">{label}</div>
      <div className="demo-card-mini-value">{value}</div>
    </div>
  );
}

function SmallTable({
  headers = ["서비스명", "상태", "전송"],
  rows,
}: {
  headers?: [string, string, string];
  rows: Array<[ReactNode, ReactNode, ReactNode]>;
}) {
  return (
    <div className="demo-table-s">
      <div className="demo-table-row head">
        {headers.map((header) => <span key={header}>{header}</span>)}
      </div>
      {rows.map((row, index) => (
        <div className="demo-table-row" key={index}>
          {row.map((cell, cellIndex) => <span key={cellIndex}>{cell}</span>)}
        </div>
      ))}
    </div>
  );
}
