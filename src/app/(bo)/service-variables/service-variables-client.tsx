"use client";

import { useState } from "react";

import {
  Button,
  Card,
  Icon,
  Pagination,
  SearchInputDemo,
  TextInput,
  useToast,
} from "@/components";

import styles from "../versions/versions.module.css";
import localStyles from "./service-variables.module.css";

type VariableRow = {
  createdAt: string;
  key: string;
  value: string;
};
type FormMode = "create" | "edit";

const PAGE_SIZE = 6;
const TABLE_COLUMN_COUNT = 4;

const variableSeeds = [
  ["app.feature.notice", "true"],
  ["app.notice.title", "필수 점검 안내"],
  ["app.notice.body", "서비스 안정화를 위한 점검이 예정되어 있습니다."],
  ["app.theme.mode", "system"],
  ["app.home.banner", "main_spring_2026"],
  ["app.home.quick_menu", "delivery,payment,coupon"],
  ["app.update.channel", "stable"],
  ["app.support.phone", "1588-0000"],
  ["app.support.email", "support@bobusang.local"],
  ["app.policy.version", "2026.05"],
  ["payment.card.enabled", "true"],
  ["payment.wallet.enabled", "false"],
  ["payment.min_amount", "1000"],
  ["payment.max_amount", "3000000"],
  ["coupon.enabled", "true"],
  ["coupon.default_rate", "5"],
  ["coupon.welcome_code", "WELCOME_BBS"],
  ["push.enabled", "true"],
  ["push.quiet_start", "22:00"],
  ["push.quiet_end", "08:00"],
  ["location.required", "false"],
  ["location.precision", "city"],
  ["delivery.enabled", "true"],
  ["delivery.default_eta", "30"],
  ["delivery.free_amount", "50000"],
  ["inventory.reserve_minutes", "15"],
  ["inventory.low_stock", "10"],
  ["login.social.kakao", "true"],
  ["login.social.apple", "true"],
  ["login.guest.enabled", "false"],
  ["security.session_minutes", "120"],
  ["security.otp.enabled", "false"],
  ["analytics.enabled", "true"],
  ["analytics.sample_rate", "0.25"],
  ["review.enabled", "true"],
  ["review.min_length", "10"],
  ["cs.chat.enabled", "true"],
  ["cs.chat.open_time", "09:00"],
  ["cs.chat.close_time", "18:00"],
  ["experiment.checkout_v2", "disabled"],
] as const;

const variableRows: VariableRow[] = variableSeeds.map(([key, value], index) => ({
  createdAt: `2026. 05. ${String(29 - (index % 14)).padStart(2, "0")}`,
  key,
  value,
}));

const serviceSuggestions = [
  "Bobusang",
  "Bobsang",
  "Bobusang Admin",
  "Bobusang Partner",
  "Bundleman",
  "Wondercart",
] as const;

export function ServiceVariablesClient() {
  const { showToast } = useToast();
  const [hasSelectedService, setHasSelectedService] = useState(false);
  const [formKey, setFormKey] = useState("");
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [formValue, setFormValue] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1);

  const totalPages = Math.ceil(variableRows.length / PAGE_SIZE);
  const visibleRows = variableRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const emptyRows = Math.max(PAGE_SIZE - visibleRows.length, 0);
  const rowStart = (page - 1) * PAGE_SIZE + 1;
  const rowEnd = Math.min(page * PAGE_SIZE, variableRows.length);

  const resetPage = () => {
    setPage(1);
    setWindowStart(1);
  };

  const handleWindowChange = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  const openCreateForm = () => {
    setFormMode("create");
    setFormKey("");
    setFormValue("");
    setIsRegisterOpen(true);
  };

  const openEditForm = (row: VariableRow) => {
    setFormMode("edit");
    setFormKey(row.key);
    setFormValue(row.value);
    setIsRegisterOpen(true);
  };

  const copyVariableKey = async (key: string) => {
    try {
      await copyText(key);
      showToast("success", "복사 완료", "키 값이 복사 되었습니다");
    } catch {
      showToast("warning", "복사 실패", "키 값을 다시 선택해주세요.");
    }
  };

  const formTitle = formMode === "edit" ? "변수 수정" : "변수 등록";

  return (
    <section className={styles.bodyStack} aria-label="서비스 변수 작업">
      <Card className={styles.summaryCard} aria-label="서비스 변수 작업">
        <div>
          <h2>서비스 변수</h2>
          <p>서비스별 앱 설정 값을 관리합니다.</p>
        </div>
        <div className={styles.summaryActions}>
          <Button aria-expanded={isRegisterOpen} onClick={openCreateForm}>
            등록하기
          </Button>
        </div>
      </Card>

      <section className={styles.layout} aria-label="서비스 변수 본문">
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
                <h2>{formTitle}</h2>
                <button
                  aria-label={`${formTitle} 닫기`}
                  className={styles.formCloseButton}
                  onClick={() => setIsRegisterOpen(false)}
                  type="button"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              {hasSelectedService ? (
                <div className={styles.formStack}>
                  <div className={localStyles.variableForm}>
                    <label className="form-group">
                      <span className="form-label">Key<span className={styles.required}>*</span></span>
                      <TextInput
                        onChange={(event) => setFormKey(event.target.value)}
                        placeholder="예: app.feature.notice"
                        value={formKey}
                      />
                    </label>

                    <label className="form-group">
                      <span className="form-label">Value<span className={styles.required}>*</span></span>
                      <TextInput
                        onChange={(event) => setFormValue(event.target.value)}
                        placeholder="예: true"
                        value={formValue}
                      />
                    </label>

                    <Button className={styles.saveButton}>
                      {formMode === "edit" ? "수정하기" : "저장하기"}
                    </Button>
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
              <h2>변수 목록</h2>
            </div>
            {hasSelectedService ? <span className={styles.sectionCount}>총 {variableRows.length}건</span> : null}
          </div>

          {hasSelectedService ? (
            <>
              <div className="table-wrap">
                <table className="table-fixed">
                  <colgroup>
                    <col className="table-col-service-lg" />
                    <col className="table-col-service-lg" />
                    <col className="table-col-rate" />
                    <col className="table-col-status" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>등록일</th>
                      <th>수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => (
                      <tr key={row.key}>
                        <td>
                          <button
                            className={localStyles.keyCopyButton}
                            onClick={() => copyVariableKey(row.key)}
                            title="Key 복사"
                            type="button"
                          >
                            <strong className={localStyles.keyText}>{row.key}</strong>
                          </button>
                        </td>
                        <td className={localStyles.valueCell}>{row.value}</td>
                        <td>{row.createdAt}</td>
                        <td>
                          <Button
                            aria-label={`${row.key} 수정`}
                            onClick={() => openEditForm(row)}
                            size="sm"
                            variant="secondary"
                          >
                            수정
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: emptyRows }, (_, rowIndex) => (
                      <tr
                        aria-hidden="true"
                        className={styles.tableEmptyRow}
                        key={`empty-variable-row-${rowIndex}`}
                      >
                        {Array.from({ length: TABLE_COLUMN_COUNT }, (_, cellIndex) => (
                          <td key={`empty-variable-cell-${rowIndex}-${cellIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.tableFooter}>
                <span>{rowStart}-{rowEnd} / {variableRows.length}건</span>
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

async function copyText(value: string) {
  const copyEventSucceeded = copyWithEvent(value);

  if (copyEventSucceeded) return;

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");

    if (copied) return;
  } finally {
    document.body.removeChild(textarea);
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Some embedded browser shells block clipboard writes even during direct clicks.
    }
  }
}

function copyWithEvent(value: string) {
  let handled = false;
  const handleCopy = (event: ClipboardEvent) => {
    event.clipboardData?.setData("text/plain", value);
    event.preventDefault();
    handled = true;
  };

  document.addEventListener("copy", handleCopy);

  try {
    return document.execCommand("copy") || handled;
  } finally {
    document.removeEventListener("copy", handleCopy);
  }
}
