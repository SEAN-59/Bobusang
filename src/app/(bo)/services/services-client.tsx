"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Card,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  SearchInputDemo,
  TextInput,
  Tooltip,
  useToast,
} from "@/components";

import styles from "../versions/versions.module.css";
import localStyles from "./services.module.css";

type ServiceRow = {
  apiKey: string;
  bundleId: string;
  createdAt: string;
  description: string;
  serviceName: string;
  status: "active" | "paused" | "ready";
};

const PAGE_SIZE = 6;
const TABLE_COLUMN_COUNT = 6;

const serviceRows: ServiceRow[] = Array.from({ length: 18 }, (_, index) => {
  const names = ["Bobusang", "Bobusang Admin", "Bobusang Partner", "Bundleman", "Wondercart", "Market Link"];
  const bundleBases = [
    "com.bobusang.app",
    "com.bobusang.admin",
    "com.bobusang.partner",
    "com.bundleman.app",
    "com.wondercart.app",
    "com.marketlink.app",
  ];
  const statusList: ServiceRow["status"][] = ["active", "active", "ready", "paused"];
  const serviceName = names[index % names.length];
  const sequence = String(index + 1).padStart(2, "0");
  const keySuffix = bundleBases[index % bundleBases.length].replace(/[^a-z0-9]/g, "_");

  return {
    apiKey: `bbs_live_${sequence}_${keySuffix}`,
    bundleId: `${bundleBases[index % bundleBases.length]}.${sequence}`,
    createdAt: `2026. 05. ${String(20 - (index % 12)).padStart(2, "0")}`,
    description: `${serviceName} 운영 설정을 관리하는 템플릿 항목입니다.`,
    serviceName: `${serviceName} ${sequence}`,
    status: statusList[index % statusList.length],
  };
});

const serviceSuggestions = [
  "Bobusang",
  "Bobsang",
  "Bobusang Admin",
  "Bobusang Partner",
  "Bundleman",
  "Wondercart",
] as const;

const statusMeta: Record<ServiceRow["status"], { label: string }> = {
  active: { label: "사용 중" },
  paused: { label: "미사용" },
  ready: { label: "미사용" },
};

export function ServicesClient() {
  const { showToast } = useToast();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRow, setSelectedRow] = useState<ServiceRow | null>(null);
  const [windowStart, setWindowStart] = useState(1);

  const filteredRows = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) return serviceRows;

    return serviceRows.filter((row) => {
      const status = statusMeta[row.status].label;

      return [
        row.serviceName,
        row.bundleId,
        row.apiKey,
        status,
      ].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [searchKeyword]);

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);
  const visibleRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const emptyRows = Math.max(PAGE_SIZE - visibleRows.length, 0);
  const rowStart = filteredRows.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rowEnd = Math.min(page * PAGE_SIZE, filteredRows.length);

  const resetPage = () => {
    setPage(1);
    setWindowStart(1);
  };

  const handleWindowChange = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  const copyBundleId = async (bundleId: string) => {
    try {
      await copyText(bundleId);
      showToast("success", "복사 완료", "번들 id가 복사 되었습니다");
    } catch {
      showToast("warning", "복사 실패", "번들 ID를 다시 선택해주세요.");
    }
  };

  const copyApiKey = async (apiKey: string) => {
    try {
      await copyText(apiKey);
      showToast("success", "복사 완료", "API 키가 복사 되었습니다");
    } catch {
      showToast("warning", "복사 실패", "API 키를 다시 선택해주세요.");
    }
  };

  return (
    <section className={styles.bodyStack} aria-label="서비스 등록 작업">
      <Card className={styles.summaryCard} aria-label="서비스 작업">
        <div>
          <h2>서비스</h2>
          <p>앱에서 사용할 서비스와 식별 정보를 관리합니다.</p>
        </div>
        <div className={styles.summaryActions}>
          <Button aria-expanded={isRegisterOpen} onClick={() => setIsRegisterOpen(true)}>
            등록하기
          </Button>
        </div>
      </Card>

      <section className={styles.layout} aria-label="서비스 등록 본문">
        <Card className={styles.serviceCard} aria-label="서비스 조회">
          <div className={styles.serviceBody}>
            <SearchInputDemo
              inputLabel="서비스 조회"
              onClear={() => {
                setSearchKeyword("");
                resetPage();
              }}
              onSearch={(value) => {
                setSearchKeyword(value);
                resetPage();
              }}
              placeholder="서비스명을 입력"
              searchLabel="조회"
              suggestions={[...serviceSuggestions]}
            />
          </div>
        </Card>

        <section
          aria-hidden={!isRegisterOpen}
          className={[
            styles.registerDisclosure,
            isRegisterOpen ? styles.registerDisclosureOpen : "",
          ].join(" ")}
        >
          <div className={styles.registerDisclosureInner}>
            <Card className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>서비스 추가</h2>
                <button
                  aria-label="서비스 추가 닫기"
                  className={styles.formCloseButton}
                  onClick={() => setIsRegisterOpen(false)}
                  type="button"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              <div className={styles.formStack}>
                <div className={[styles.formMatrix, localStyles.serviceFormMatrix].join(" ")}>
                  <label className={["form-group", styles.platformField].join(" ")}>
                    <span className="form-label">서비스명<span className={styles.required}>*</span></span>
                    <TextInput placeholder="예: Bobusang Admin" />
                  </label>

                  <label className={["form-group", styles.versionField].join(" ")}>
                    <span className="form-label">번들 ID<span className={styles.required}>*</span></span>
                    <TextInput placeholder="예: com.bobusang.admin" />
                  </label>

                  <label className={["form-group", localStyles.urlField].join(" ")}>
                    <span className="form-label">관리 URL</span>
                    <TextInput placeholder="https://..." type="url" />
                  </label>

                  <label className={["form-group", localStyles.memoField].join(" ")}>
                    <span className="form-label">메모</span>
                    <textarea className={["input", styles.updateTextarea].join(" ")} placeholder="서비스 운영에 필요한 메모를 입력하세요." rows={7} />
                  </label>
                </div>
                <div className={localStyles.formActionRow}>
                  <Button className={styles.saveButton}>
                    저장하기
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Card className={styles.listCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2>서비스 목록</h2>
            </div>
            <span className={styles.sectionCount}>총 {filteredRows.length}건</span>
          </div>

          <div className="table-wrap">
            <table className="table-fixed">
              <colgroup>
                <col className="table-col-service-lg" />
                <col className="table-col-platform" />
                <col className="table-col-status" />
                <col className="table-col-rate" />
                <col className="table-col-rate" />
                <col className="table-col-status" />
              </colgroup>
              <thead>
                <tr>
                  <th>서비스명</th>
                  <th>번들 ID</th>
                  <th>상태</th>
                  <th>API 키</th>
                  <th>등록일</th>
                  <th>더보기</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => {
                  const isActive = row.status === "active";

                  return (
                    <tr key={row.bundleId}>
                      <td><strong className={styles.versionText}>{row.serviceName}</strong></td>
                      <td className={localStyles.bundleCell}>
                        <Tooltip message={row.bundleId}>
                          <button
                            className={localStyles.bundleButton}
                            onClick={() => copyBundleId(row.bundleId)}
                            title="번들 ID 복사"
                            type="button"
                          >
                            번들 ID
                          </button>
                        </Tooltip>
                      </td>
                      <td className={localStyles.statusCell}>
                        <label
                          aria-label={isActive ? "사용 중" : "미사용"}
                          className="toggle"
                          title={isActive ? "사용 중" : "미사용"}
                        >
                          <input defaultChecked={isActive} type="checkbox" />
                          <span className="toggle-track" />
                        </label>
                      </td>
                      <td className={localStyles.keyCell}>
                        <Tooltip message={row.apiKey}>
                          <button
                            className={localStyles.keyButton}
                            onClick={() => copyApiKey(row.apiKey)}
                            title="API 키 복사"
                            type="button"
                          >
                            Key
                          </button>
                        </Tooltip>
                      </td>
                      <td>{row.createdAt}</td>
                      <td>
                        <Button
                          aria-label={`${row.serviceName} 상세 더보기`}
                          onClick={() => setSelectedRow(row)}
                          size="sm"
                          variant="secondary"
                        >
                          더보기
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {Array.from({ length: emptyRows }, (_, rowIndex) => (
                  <tr
                    aria-hidden="true"
                    className={styles.tableEmptyRow}
                    key={`empty-service-row-${rowIndex}`}
                  >
                    {Array.from({ length: TABLE_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`empty-service-cell-${rowIndex}-${cellIndex}`}>&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.tableFooter}>
            <span>{rowStart}-{rowEnd} / {filteredRows.length}건</span>
            <Pagination
              current={page}
              onChange={setPage}
              onWindowChange={handleWindowChange}
              total={totalPages}
              windowStart={windowStart}
            />
          </div>
        </Card>
      </section>

      <Modal isOpen={selectedRow !== null} onClose={() => setSelectedRow(null)}>
        <ModalHeader onClose={() => setSelectedRow(null)}>서비스 상세</ModalHeader>
        <ModalBody>
          {selectedRow ? (
            <dl className={styles.detailList}>
              <div className={[styles.detailItem, styles.detailItemPrimary].join(" ")}>
                <dt>설명</dt>
                <dd className={styles.detailContent}>{selectedRow.description}</dd>
              </div>
              <div className={styles.detailMetaGrid}>
                <div className={styles.detailItem}>
                  <dt>번들 ID</dt>
                  <dd className={styles.detailValue}>{selectedRow.bundleId}</dd>
                </div>
                <div className={styles.detailItem}>
                  <dt>등록일</dt>
                  <dd className={styles.detailValue}>{selectedRow.createdAt}</dd>
                </div>
              </div>
            </dl>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setSelectedRow(null)} variant="secondary">
            닫기
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
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
