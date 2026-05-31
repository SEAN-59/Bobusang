"use client";

import { useMemo, useState } from "react";

import {
  Badge,
  Card,
  Icon,
  Pagination,
  SearchInputDemo,
  useToast,
} from "@/components";

import styles from "../versions/versions.module.css";
import localStyles from "./active-status.module.css";

type UserStatus = "normal" | "dormant" | "suspended";
type UserRow = {
  device: string;
  lastAccessAt: Date;
  os: "Android" | "iOS";
  status: UserStatus;
  uuid: string;
  version: string;
};
type SortDirection = "asc" | "desc";

const PAGE_SIZE = 8;
const TABLE_COLUMN_COUNT = 6;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const serviceSuggestions = [
  "Bobusang",
  "Bobsang",
  "Bobusang Admin",
  "Bobusang Partner",
  "Bundleman",
  "Wondercart",
] as const;

const accessOffsets = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  10,
  12,
  14,
  15,
  16,
  18,
  20,
  22,
  25,
  28,
  31,
  34,
  37,
  40,
  45,
  50,
  55,
  3,
  9,
  13,
  19,
  1,
  6,
  14,
  27,
  42,
];

const devices = [
  "iPhone 15",
  "Galaxy S24",
  "iPhone 14 Pro",
  "Galaxy Z Flip5",
  "Pixel 8",
  "iPad Air",
] as const;

const versions = ["0.9.8", "1.0.0", "1.0.1", "1.1.0", "1.2.4", "2.0.0"] as const;

const statusMeta: Record<UserStatus, { label: string; variant: "danger" | "success" | "warning" }> = {
  dormant: { label: "휴면", variant: "warning" },
  normal: { label: "정상", variant: "success" },
  suspended: { label: "정지", variant: "danger" },
};

export function ActiveStatusClient() {
  const { showToast } = useToast();
  const [osSortDirection, setOsSortDirection] = useState<SortDirection | null>(null);
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [uuidKeyword, setUuidKeyword] = useState("");
  const [windowStart, setWindowStart] = useState(1);
  const userRows = useMemo(() => buildUserRows(getToday()), []);

  const filteredRows = useMemo(() => {
    const keyword = uuidKeyword.trim().toLowerCase();

    if (!keyword) return userRows;

    return userRows.filter((row) => row.uuid.toLowerCase().includes(keyword));
  }, [userRows, uuidKeyword]);

  const sortedRows = useMemo(() => {
    if (!osSortDirection) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const result = a.os.localeCompare(b.os);

      return osSortDirection === "asc" ? result : -result;
    });
  }, [filteredRows, osSortDirection]);

  const visibleRows = useMemo(() => (
    sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  ), [page, sortedRows]);

  const hasSelectedService = selectedService.length > 0;
  const totalPages = Math.ceil(sortedRows.length / PAGE_SIZE);
  const emptyRows = Math.max(PAGE_SIZE - visibleRows.length, 0);
  const rowStart = sortedRows.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rowEnd = Math.min(page * PAGE_SIZE, sortedRows.length);

  const resetPage = () => {
    setPage(1);
    setWindowStart(1);
  };

  const handleWindowChange = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  const handleOsSort = () => {
    setOsSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    resetPage();
  };

  const copyUuid = async (uuid: string) => {
    try {
      await copyText(uuid);
      showToast("success", "복사 완료", "UUID가 복사 되었습니다");
    } catch {
      showToast("warning", "복사 실패", "UUID를 다시 선택해주세요.");
    }
  };

  return (
    <section className={styles.bodyStack} aria-label="활성 현황 작업">
      <Card className={styles.summaryCard} aria-label="활성 현황 안내">
        <div>
          <h2>활성 현황</h2>
          <p>서비스별 유저 접속 상태를 확인합니다.</p>
        </div>
      </Card>

      <section className={styles.layout} aria-label="활성 현황 본문">
        <Card className={styles.serviceCard} aria-label="서비스 선택">
          <div className={styles.serviceBody}>
            <SearchInputDemo
              inputLabel="서비스 선택"
              onClear={() => {
                setSelectedService("");
                setUuidKeyword("");
                setOsSortDirection(null);
                resetPage();
              }}
              onSearch={(value) => {
                setSelectedService(value);
                setUuidKeyword("");
                setOsSortDirection(null);
                resetPage();
              }}
              placeholder="서비스명을 입력"
              searchLabel="조회"
              suggestions={[...serviceSuggestions]}
            />
          </div>
        </Card>

        <Card className={[styles.listCard, localStyles.listCard, hasSelectedService ? "" : styles.listCardEmpty].join(" ")}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2>유저 목록</h2>
            </div>
            {hasSelectedService ? <span className={styles.sectionCount}>총 {sortedRows.length}건</span> : null}
          </div>

          {hasSelectedService ? (
            <>
              <div className={localStyles.tableFilter}>
                <SearchInputDemo
                  inputLabel="UUID 검색"
                  onClear={() => {
                    setUuidKeyword("");
                    resetPage();
                  }}
                  onSearch={(value) => {
                    setUuidKeyword(value);
                    resetPage();
                  }}
                  placeholder="UUID를 입력"
                  searchLabel="조회"
                />
              </div>

              <div className="table-wrap">
                <table className="table-fixed">
                  <colgroup>
                    <col className={localStyles.uuidCol} />
                    <col className={localStyles.statusCol} />
                    <col className={localStyles.osCol} />
                    <col className={localStyles.versionCol} />
                    <col className={localStyles.deviceCol} />
                    <col className={localStyles.accessCol} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>유저 UUID</th>
                      <th>상태</th>
                      <th>
                        <button className={styles.sortButton} onClick={handleOsSort} type="button">
                          <span>OS</span>
                          {osSortDirection ? (
                            <Icon
                              className={styles.sortIconActive}
                              name={osSortDirection === "asc" ? "arrowUp" : "arrowDown"}
                              size={12}
                            />
                          ) : (
                            <span className={styles.sortIdleMark} aria-hidden="true">-</span>
                          )}
                        </button>
                      </th>
                      <th>버전</th>
                      <th>기기</th>
                      <th>접속 일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => {
                      const status = statusMeta[row.status];

                      return (
                        <tr key={row.uuid}>
                          <td>
                            <button
                              className={localStyles.uuidButton}
                              onClick={() => copyUuid(row.uuid)}
                              title="UUID 복사"
                              type="button"
                            >
                              {row.uuid}
                            </button>
                          </td>
                          <td><Badge variant={status.variant}>{status.label}</Badge></td>
                          <td>
                            <Icon
                              className={localStyles.osIcon}
                              name={row.os === "Android" ? "symbolAndroid" : "symbolIOS"}
                              size={24}
                              title={row.os}
                            />
                          </td>
                          <td><strong className={styles.versionText}>{row.version}</strong></td>
                          <td>{row.device}</td>
                          <td>{formatDate(row.lastAccessAt)}</td>
                        </tr>
                      );
                    })}
                    {Array.from({ length: emptyRows }, (_, rowIndex) => (
                      <tr
                        aria-hidden="true"
                        className={styles.tableEmptyRow}
                        key={`empty-active-status-row-${rowIndex}`}
                      >
                        {Array.from({ length: TABLE_COLUMN_COUNT }, (_, cellIndex) => (
                          <td key={`empty-active-status-cell-${rowIndex}-${cellIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.tableFooter}>
                <span>{rowStart}-{rowEnd} / {sortedRows.length}건</span>
                <Pagination
                  current={page}
                  onChange={setPage}
                  onWindowChange={handleWindowChange}
                  total={totalPages}
                  windowStart={windowStart}
                />
              </div>
            </>
          ) : (
            <p className={styles.listPlaceholder}>위에서 서비스를 선택해주세요.</p>
          )}
        </Card>
      </section>
    </section>
  );
}

function createUuid(index: number) {
  const sequence = (index + 1).toString(16).padStart(12, "0");
  const group = (index * 37 + 4096).toString(16).slice(0, 4).padStart(4, "0");

  return `b0b5${group}-a17e-4c${String(index % 10).padStart(2, "0")}-9d${group.slice(0, 2)}-${sequence}`;
}

function buildUserRows(referenceDate: Date): UserRow[] {
  return accessOffsets.map((offset, index) => {
    const lastAccessAt = subtractDays(referenceDate, offset);

    return {
      device: devices[index % devices.length],
      lastAccessAt,
      os: index % 2 === 0 ? "Android" : "iOS",
      status: getUserStatus(lastAccessAt, referenceDate),
      uuid: createUuid(index),
      version: versions[index % versions.length],
    };
  });
}

function getToday() {
  const today = new Date();

  return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
}

function getUserStatus(lastAccessAt: Date, referenceDate: Date): UserStatus {
  const daysSinceAccess = Math.floor((referenceDate.getTime() - lastAccessAt.getTime()) / DAY_IN_MS);

  if (daysSinceAccess <= 3) return "normal";
  if (daysSinceAccess <= 14) return "dormant";

  return "suspended";
}

function subtractDays(date: Date, days: number) {
  return new Date(date.getTime() - days * DAY_IN_MS);
}

function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back to a temporary textarea for browser contexts without clipboard permission.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}
