"use client";

import { useState } from "react";

import { Button, Card, Icon, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, TextInput, useToast } from "@/components";

import styles from "../versions/versions.module.css";
import localStyles from "./setting-account.module.css";

type AccountRow = {
  createdAt: string;
  email: string;
  id: string;
  name: string;
};

const PAGE_SIZE = 6;
const TABLE_COLUMN_COUNT = 5;

const accountRows: AccountRow[] = [
  { createdAt: "2026. 05. 29", email: "sean@bobusang.local", id: "sean.admin", name: "Sean" },
  { createdAt: "2026. 05. 28", email: "minji@bobusang.local", id: "minji.ops", name: "Minji" },
  { createdAt: "2026. 05. 27", email: "jun@bobusang.local", id: "jun.manager", name: "Jun" },
  { createdAt: "2026. 05. 26", email: "hanna@bobusang.local", id: "hanna.service", name: "Hanna" },
  { createdAt: "2026. 05. 25", email: "doyun@bobusang.local", id: "doyun.viewer", name: "Doyun" },
  { createdAt: "2026. 05. 24", email: "yuri@bobusang.local", id: "yuri.support", name: "Yuri" },
  { createdAt: "2026. 05. 23", email: "taeho@bobusang.local", id: "taeho.admin", name: "Taeho" },
  { createdAt: "2026. 05. 22", email: "sora@bobusang.local", id: "sora.ops", name: "Sora" },
  { createdAt: "2026. 05. 21", email: "jiho@bobusang.local", id: "jiho.manager", name: "Jiho" },
  { createdAt: "2026. 05. 20", email: "nari@bobusang.local", id: "nari.service", name: "Nari" },
  { createdAt: "2026. 05. 19", email: "kyu@bobusang.local", id: "kyu.viewer", name: "Kyu" },
  { createdAt: "2026. 05. 18", email: "eun@bobusang.local", id: "eun.support", name: "Eun" },
  { createdAt: "2026. 05. 17", email: "mira@bobusang.local", id: "mira.admin", name: "Mira" },
  { createdAt: "2026. 05. 16", email: "leo@bobusang.local", id: "leo.ops", name: "Leo" },
  { createdAt: "2026. 05. 15", email: "arin@bobusang.local", id: "arin.manager", name: "Arin" },
  { createdAt: "2026. 05. 14", email: "hyun@bobusang.local", id: "hyun.service", name: "Hyun" },
  { createdAt: "2026. 05. 13", email: "daniel@bobusang.local", id: "daniel.viewer", name: "Daniel" },
  { createdAt: "2026. 05. 12", email: "bora@bobusang.local", id: "bora.support", name: "Bora" },
];

export function SettingAccountClient() {
  const { showToast } = useToast();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [resetPassword, setResetPassword] = useState("");
  const [resetTarget, setResetTarget] = useState<AccountRow | null>(null);
  const [windowStart, setWindowStart] = useState(1);

  const totalPages = Math.ceil(accountRows.length / PAGE_SIZE);
  const visibleRows = accountRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const emptyRows = Math.max(PAGE_SIZE - visibleRows.length, 0);
  const rowStart = (page - 1) * PAGE_SIZE + 1;
  const rowEnd = Math.min(page * PAGE_SIZE, accountRows.length);

  const handleWindowChange = (nextWindowStart: number) => {
    setWindowStart(nextWindowStart);
    setPage(nextWindowStart);
  };

  const openResetModal = (row: AccountRow) => {
    setResetPassword(createTemporaryPassword());
    setResetTarget(row);
  };

  const closeResetModal = () => {
    setResetTarget(null);
    setResetPassword("");
  };

  const copyResetPassword = async () => {
    try {
      await copyText(resetPassword);
      showToast("success", "복사 완료", "임시 비밀번호가 복사 되었습니다");
    } catch {
      showToast("warning", "복사 실패", "비밀번호를 다시 선택해주세요.");
    }
  };

  return (
    <section className={styles.bodyStack} aria-label="계정 관리 작업">
      <Card className={styles.summaryCard} aria-label="계정 관리 안내">
        <div>
          <h2>계정 관리</h2>
          <p>관리자 계정과 접근 권한을 관리합니다.</p>
        </div>
        <div className={styles.summaryActions}>
          <Button aria-expanded={isRegisterOpen} onClick={() => setIsRegisterOpen(true)}>
            등록하기
          </Button>
        </div>
      </Card>

      <section className={styles.layout} aria-label="계정 관리 본문">
        <section
          aria-hidden={!isRegisterOpen}
          className={[
            styles.registerDisclosure,
            localStyles.accountDisclosure,
            isRegisterOpen ? styles.registerDisclosureOpen : "",
          ].join(" ")}
        >
          <div className={styles.registerDisclosureInner}>
            <Card className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>계정 추가</h2>
                <button
                  aria-label="계정 추가 닫기"
                  className={styles.formCloseButton}
                  onClick={() => setIsRegisterOpen(false)}
                  type="button"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              <div className={styles.formStack}>
                <div className={localStyles.accountForm}>
                  <label className="form-group">
                    <span className="form-label">이름<span className={styles.required}>*</span></span>
                    <TextInput placeholder="예: Sean" />
                  </label>

                  <label className="form-group">
                    <span className="form-label">아이디<span className={styles.required}>*</span></span>
                    <TextInput placeholder="예: sean.admin" />
                  </label>

                  <label className="form-group">
                    <span className="form-label">이메일<span className={styles.required}>*</span></span>
                    <TextInput placeholder="예: sean@bobusang.local" type="email" />
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
              <h2>계정 목록</h2>
            </div>
            <span className={styles.sectionCount}>총 {accountRows.length}건</span>
          </div>

          <div className="table-wrap">
            <table className="table-fixed">
              <colgroup>
                <col className="table-col-service" />
                <col className="table-col-service" />
                <col className="table-col-service-lg" />
                <col className="table-col-rate" />
                <col className="table-col-status" />
              </colgroup>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>아이디</th>
                  <th>이메일</th>
                  <th>등록일</th>
                  <th>초기화</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id}>
                    <td><strong className={localStyles.accountName}>{row.name}</strong></td>
                    <td>{row.id}</td>
                    <td className={localStyles.emailCell}>{row.email}</td>
                    <td>{row.createdAt}</td>
                    <td>
                      <Button
                        aria-label={`${row.name} 비밀번호 초기화`}
                        onClick={() => openResetModal(row)}
                        size="sm"
                        variant="secondary"
                      >
                        초기화
                      </Button>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRows }, (_, rowIndex) => (
                  <tr
                    aria-hidden="true"
                    className={styles.tableEmptyRow}
                    key={`empty-account-row-${rowIndex}`}
                  >
                    {Array.from({ length: TABLE_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`empty-account-cell-${rowIndex}-${cellIndex}`}>&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.tableFooter}>
            <span>{rowStart}-{rowEnd} / {accountRows.length}건</span>
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

      <Modal isOpen={resetTarget !== null} onClose={closeResetModal}>
        <ModalHeader onClose={closeResetModal}>비밀번호 초기화</ModalHeader>
        <ModalBody>
          {resetTarget ? (
            <div className={localStyles.resetModalStack}>
              <p className={localStyles.resetNotice}>
                비밀번호가 초기화되었습니다. 아래 임시 비밀번호를 복사해 전달해주세요.
              </p>
              <button
                className={localStyles.passwordCopyCard}
                onClick={copyResetPassword}
                title="임시 비밀번호 복사"
                type="button"
              >
                <span className={localStyles.passwordLabel}>변경된 비밀번호</span>
                <strong className={localStyles.passwordValue}>
                  {resetPassword}
                </strong>
                <span className={localStyles.passwordCopyIcon}>
                  <Icon name="copy" size={20} />
                </span>
              </button>
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeResetModal} variant="secondary">
            닫기
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}

function createTemporaryPassword() {
  return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
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
