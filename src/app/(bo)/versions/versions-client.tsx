"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  SearchInputDemo,
  SelectArrow,
  TextInput,
} from "@/components";

import styles from "./versions.module.css";

type SortColumn = "platform" | "version";
type SortDirection = "asc" | "desc";
type SortState = {
  column: SortColumn;
  direction: SortDirection;
};
type VersionRow = {
  contentVisible: boolean;
  createdAt: string;
  file: string;
  forceUpdate: boolean;
  platform: "Android" | "iOS";
  storeDeploy: boolean;
  updateContent: string;
  updateUrl: string;
  updateVisible: boolean;
  version: string;
};

const PAGE_SIZE = 6;
const TABLE_COLUMN_COUNT = 8;

const versionRows: VersionRow[] = Array.from({ length: 40 }, (_, index) => {
  const platform = index % 2 === 0 ? "Android" : "iOS";
  const major = Math.floor(index / 9);
  const minor = Math.floor((index % 9) / 3);
  const patch = index % 3;
  const version = `${major}.${minor}.${patch}`;
  const filePlatform = platform.toLowerCase();
  const extension = platform === "Android" ? "apk" : "ipa";

  return {
    contentVisible: index % 4 !== 1,
    createdAt: `2026. 05. ${String(16 - (index % 12)).padStart(2, "0")}`,
    file: `bobusang-${filePlatform}-${version}.${extension}`,
    forceUpdate: index % 7 === 0,
    platform,
    storeDeploy: platform === "iOS" || index % 5 === 0,
    updateContent: `${platform} ${version} 배포 안내입니다. 변경 내용과 배포 경로를 확인합니다.`,
    updateUrl: `https://download.bobusang.local/${filePlatform}/${version}`,
    updateVisible: index % 3 !== 0,
    version,
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

export function VersionsClient() {
  const [hasSelectedService, setHasSelectedService] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedVersionRow, setSelectedVersionRow] = useState<VersionRow | null>(null);
  const [sorts, setSorts] = useState<SortState[]>([]);
  const [windowStart, setWindowStart] = useState(1);

  const sortedRows = useMemo(() => {
    if (sorts.length === 0) return versionRows;

    return [...versionRows].sort((a, b) => {
      for (const sort of sorts) {
        const result = compareVersionRow(a, b, sort.column);

        if (result !== 0) {
          return sort.direction === "asc" ? result : -result;
        }
      }

      return 0;
    });
  }, [sorts]);

  const totalPages = Math.ceil(sortedRows.length / PAGE_SIZE);
  const visibleRows = sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const emptyRows = Math.max(PAGE_SIZE - visibleRows.length, 0);
  const rowStart = (page - 1) * PAGE_SIZE + 1;
  const rowEnd = Math.min(page * PAGE_SIZE, sortedRows.length);

  const resetPage = () => {
    setPage(1);
    setWindowStart(1);
  };

  const handleSort = (column: SortColumn) => {
    setSorts((current) => {
      const existingSort = current.find((sort) => sort.column === column);

      if (!existingSort) {
        return [...current, { column, direction: "asc" }];
      }

      return current.map((sort) => (
        sort.column === column
          ? { ...sort, direction: sort.direction === "asc" ? "desc" : "asc" }
          : sort
      ));
    });
    resetPage();
  };

  const handleWindowChange = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  return (
    <section className={styles.bodyStack} aria-label="버전 관리 작업">
      <Card className={styles.summaryCard} aria-label="앱 버전 작업">
        <div>
          <h2>앱 버전</h2>
          <p>앱 업데이트 버전과 배포 파일을 관리합니다.</p>
        </div>
        <div className={styles.summaryActions}>
          <Button aria-expanded={isRegisterOpen} onClick={() => setIsRegisterOpen(true)}>
            등록하기
          </Button>
        </div>
      </Card>

      <section className={styles.layout} aria-label="버전 관리 본문">
        <Card className={styles.serviceCard} aria-label="서비스 조회">
          <div className={styles.serviceBody}>
            <SearchInputDemo
              inputLabel="서비스 조회"
              onClear={() => {
                setHasSelectedService(false);
                resetPage();
              }}
              onSearch={() => {
                setHasSelectedService(true);
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
                <h2>앱 버전 등록</h2>
                <button
                  aria-label="앱 버전 등록 닫기"
                  className={styles.formCloseButton}
                  onClick={() => setIsRegisterOpen(false)}
                  type="button"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              {hasSelectedService ? (
                <div className={styles.formStack}>
                  <div className={styles.formMatrix}>
                    <label className={["form-group", styles.platformField].join(" ")}>
                      <span className="form-label">플랫폼</span>
                      <span className="select-wrap">
                        <select className="input select-input" defaultValue="android">
                          <option value="android">Android</option>
                          <option value="ios">iOS</option>
                        </select>
                        <SelectArrow />
                      </span>
                    </label>

                    <label className={["form-group", styles.versionField].join(" ")}>
                      <span className="form-label">버전<span className={styles.required}>*</span></span>
                      <TextInput placeholder="예: 1.4.3" />
                    </label>

                    <label className={["form-group", styles.urlField].join(" ")}>
                      <span className="form-label">URL</span>
                      <TextInput placeholder="https://..." type="url" />
                    </label>

                    <div className={styles.optionStack}>
                      <h3 className={styles.optionTitle}>업데이트 옵션</h3>
                      <div className={styles.optionPanel}>
                        <div className={styles.optionBox}>
                          <Checkbox>강제 업데이트</Checkbox>
                        </div>
                        <div className={styles.optionBox}>
                          <Checkbox defaultChecked>선택 업데이트</Checkbox>
                        </div>
                        <div className={styles.optionBox}>
                          <Checkbox defaultChecked>내용 표시</Checkbox>
                        </div>
                        <div className={styles.optionBox}>
                          <Checkbox>스토어 배포</Checkbox>
                        </div>
                      </div>
                    </div>

                    <label className={["form-group", styles.updateField].join(" ")}>
                      <span className="form-label">업데이트 내용</span>
                      <textarea className={["input", styles.updateTextarea].join(" ")} placeholder="앱 업데이트 안내에 표시할 내용을 입력하세요." rows={7} />
                    </label>

                    <div className={["form-group", styles.fileField].join(" ")}>
                      <span className="form-label">파일 업로드</span>
                      <div className={styles.fileDropBox}>
                        <span className={styles.fileDropText}>배포 파일 선택</span>
                        <Button size="md" variant="secondary">파일 선택</Button>
                      </div>
                      <Button block className={styles.saveButton}>
                        저장하기
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className={styles.formPlaceholder}>위에서 서비스를 조회해주세요.</p>
              )}
            </Card>
          </div>
        </section>

        <Card className={[styles.listCard, hasSelectedService ? "" : styles.listCardEmpty].join(" ")}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2>앱 버전 목록</h2>
            </div>
            {hasSelectedService ? <span className={styles.sectionCount}>총 {versionRows.length}건</span> : null}
          </div>

          {hasSelectedService ? (
            <>
              <div className="table-wrap">
                <table className="table-fixed">
                  <colgroup>
                    <col className="table-col-platform" />
                    <col className="table-col-rate" />
                    <col className="table-col-status" />
                    <col className="table-col-status" />
                    <col className="table-col-status" />
                    <col className="table-col-status" />
                    <col className="table-col-rate" />
                    <col className="table-col-service" />
                  </colgroup>
                  <thead>
                    <tr>
                      <SortHeader column="platform" label="플랫폼" onClick={handleSort} sorts={sorts} />
                      <SortHeader column="version" label="버전" onClick={handleSort} sorts={sorts} />
                      <th>강제</th>
                      <th>선택</th>
                      <th>표시</th>
                      <th>스토어</th>
                      <th>등록일</th>
                      <th>더보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => (
                      <tr key={`${row.platform}-${row.version}-${row.createdAt}`}>
                        <td>
                          <Icon
                            className={styles.platformIcon}
                            name={row.platform === "Android" ? "symbolAndroid" : "symbolIOS"}
                            size={24}
                            title={row.platform}
                          />
                        </td>
                        <td><strong className={styles.versionText}>{row.version}</strong></td>
                        <td><UsageMark active={row.forceUpdate} /></td>
                        <td><UsageMark active={row.updateVisible} /></td>
                        <td><UsageMark active={row.contentVisible} /></td>
                        <td><UsageMark active={row.storeDeploy} /></td>
                        <td>{row.createdAt}</td>
                        <td>
                          <Button
                            aria-label={`${row.platform} ${row.version} 상세 더보기`}
                            onClick={() => setSelectedVersionRow(row)}
                            size="sm"
                            variant="secondary"
                          >
                            더보기
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: emptyRows }, (_, rowIndex) => (
                      <tr
                        aria-hidden="true"
                        className={styles.tableEmptyRow}
                        key={`empty-version-row-${rowIndex}`}
                      >
                        {Array.from({ length: TABLE_COLUMN_COUNT }, (_, cellIndex) => (
                          <td key={`empty-version-cell-${rowIndex}-${cellIndex}`}>&nbsp;</td>
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

      <Modal isOpen={selectedVersionRow !== null} onClose={() => setSelectedVersionRow(null)}>
        <ModalHeader onClose={() => setSelectedVersionRow(null)}>버전 상세</ModalHeader>
        <ModalBody>
          {selectedVersionRow ? (
            <dl className={styles.detailList}>
              <div className={[styles.detailItem, styles.detailItemPrimary].join(" ")}>
                <dt>업데이트 내용</dt>
                <dd className={styles.detailContent}>{selectedVersionRow.updateContent}</dd>
              </div>
              <div className={styles.detailMetaGrid}>
                <div className={styles.detailItem}>
                  <dt>URL</dt>
                  <dd className={styles.detailValue}>{selectedVersionRow.updateUrl}</dd>
                </div>
                <div className={styles.detailItem}>
                  <dt>파일 명</dt>
                  <dd className={styles.detailValue}>{selectedVersionRow.file}</dd>
                </div>
              </div>
            </dl>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setSelectedVersionRow(null)} variant="secondary">
            닫기
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}

function SortHeader({
  column,
  label,
  onClick,
  sorts,
}: {
  column: SortColumn;
  label: string;
  onClick: (column: SortColumn) => void;
  sorts: SortState[];
}) {
  const activeSort = sorts.find((sort) => sort.column === column);

  return (
    <th>
      <button className={styles.sortButton} onClick={() => onClick(column)} type="button">
        <span>{label}</span>
        {activeSort ? (
          <Icon
            className={styles.sortIconActive}
            name={activeSort.direction === "asc" ? "arrowUp" : "arrowDown"}
            size={12}
          />
        ) : (
          <span className={styles.sortIdleMark} aria-hidden="true">-</span>
        )}
      </button>
    </th>
  );
}

function compareVersionRow(a: VersionRow, b: VersionRow, column: SortColumn) {
  if (column === "version") {
    return compareVersion(a.version, b.version);
  }

  return a.platform.localeCompare(b.platform);
}

function UsageMark({ active }: { active: boolean }) {
  return (
    <span className={[styles.usageMark, active ? styles.usageMarkActive : ""].filter(Boolean).join(" ")}>
      {active ? "O" : "X"}
    </span>
  );
}

function compareVersion(a: string, b: string) {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  const max = Math.max(aParts.length, bParts.length);

  for (let index = 0; index < max; index += 1) {
    const diff = (aParts[index] ?? 0) - (bParts[index] ?? 0);
    if (diff !== 0) return diff;
  }

  return 0;
}
