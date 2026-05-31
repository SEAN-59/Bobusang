"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/badge/badge";
import { CheckIcon } from "@/components/checkbox-radio/checkbox-radio";
import { Dropdown, DropdownItem } from "@/components/dropdown/dropdown";
import { EmptyState } from "@/components/empty-state/empty-state";
import { Icon } from "@/components/icon/icon";
import { Pagination } from "@/components/pagination/pagination";

type Row = {
  name: string;
  platform: string;
  rate: number;
  send: number;
  status: "success" | "warning" | "danger" | "neutral";
  statusLabel: string;
};

type SortDirection = "asc" | "desc";
type SortColumn = "name" | "platform" | "send" | "rate";
type DropdownSortColumn = SortColumn | "status";

const rows: Row[] = [
  { name: "SPMS iOS", platform: "APNs", status: "success", statusLabel: "Active", send: 12450, rate: 98.2 },
  { name: "SPMS Android", platform: "FCM", status: "success", statusLabel: "Active", send: 8320, rate: 97.8 },
  { name: "Marketing", platform: "FCM", status: "warning", statusLabel: "Paused", send: 3100, rate: 94.1 },
  { name: "Legacy SDK", platform: "APNs", status: "neutral", statusLabel: "Inactive", send: 0, rate: 0 },
  { name: "Push Alpha", platform: "APNs", status: "success", statusLabel: "Active", send: 5210, rate: 99.1 },
  { name: "Push Beta", platform: "FCM", status: "danger", statusLabel: "Error", send: 1200, rate: 82.3 },
  { name: "Web Push", platform: "Web", status: "success", statusLabel: "Active", send: 4100, rate: 96.5 },
  { name: "Test SDK", platform: "APNs", status: "neutral", statusLabel: "Inactive", send: 0, rate: 0 },
];

const PAGE_SIZE = 4;

const sortableTableColumns = ["table-col-check", "table-col-service", "table-col-platform", "table-col-status", "table-col-send", "table-col-rate"];
const dropdownTableColumns = ["table-col-service-lg", "table-col-platform", "table-col-status", "table-col-send", "table-col-rate"];
const emptyTableColumns = ["table-col-check", "table-col-service-lg", "table-col-platform", "table-col-status", "table-col-send"];

export function SortableTableDemo() {
  const [sort, setSort] = useState<{ col: SortColumn | null; dir: SortDirection }>({ col: null, dir: "asc" });
  const [page, setPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sortedRows = useMemo(() => {
    if (!sort.col) return rows;
    return [...rows].sort((a, b) => compare(a[sort.col!], b[sort.col!], sort.dir));
  }, [sort]);

  const visibleRows = sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const visibleIndexes = visibleRows.map((row) => rows.indexOf(row));
  const allVisibleSelected = visibleIndexes.length > 0 && visibleIndexes.every((index) => selected.has(index));
  const someVisibleSelected = visibleIndexes.some((index) => selected.has(index));
  const totalPages = Math.ceil(sortedRows.length / PAGE_SIZE);

  const toggleSort = (col: SortColumn) => {
    setSort((current) => ({
      col,
      dir: current.col === col && current.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
    setWindowStart(1);
  };

  const toggleRow = (row: Row, checked: boolean) => {
    const index = rows.indexOf(row);
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(index);
      else next.delete(index);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      visibleIndexes.forEach((index) => {
        if (checked) next.add(index);
        else next.delete(index);
      });
      return next;
    });
  };

  return (
    <div className="preview-body no-pad">
      <div style={{ alignItems: "center", background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", minHeight: 44, padding: "var(--space-3) var(--space-4)" }}>
        {selected.size > 0 ? (
          <div style={{ alignItems: "center", display: "flex", gap: "var(--space-2)" }}>
            <span style={{ color: "var(--color-accent)", fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-medium)" }}>
              {selected.size}개 선택됨
            </span>
            <button className="btn btn-sm btn-secondary" type="button">내보내기</button>
            <button className="btn btn-sm btn-danger" type="button">삭제</button>
          </div>
        ) : (
          <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>전체 {rows.length}개</span>
        )}
      </div>

      <div className="table-wrap" style={{ border: "none", borderBottom: "1px solid var(--color-border)", borderRadius: 0 }}>
        <table className="table-fixed">
          <colgroup>
            {sortableTableColumns.map((className) => (
              <col className={className} key={className} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="table-select-cell" style={{ textAlign: "center" }}>
                <label className="check-item" style={{ justifyContent: "center", margin: 0 }}>
                  <input checked={allVisibleSelected} onChange={(event) => toggleAll(event.target.checked)} type="checkbox" />
                  <span
                    className={
                      allVisibleSelected
                        ? "check-box check-box-checked"
                        : someVisibleSelected
                          ? "check-box check-box-indeterminate"
                          : "check-box"
                    }
                    style={{ height: 15, width: 15 }}
                  >
                    <svg height="9" viewBox="0 0 10 10" width="9">
                      <path className="check-path" d="M1.5 5l2.5 2.5 4.5-5" />
                      <line className="indeterminate-path" stroke="#fff" strokeLinecap="round" strokeWidth="2" x1="2" x2="8" y1="5" y2="5" />
                    </svg>
                  </span>
                </label>
              </th>
              <SortableHeader col="name" current={sort} label="서비스명" onClick={toggleSort} />
              <SortableHeader col="platform" current={sort} label="플랫폼" onClick={toggleSort} />
              <th>상태</th>
              <SortableHeader col="send" current={sort} label="전송량" onClick={toggleSort} />
              <SortableHeader col="rate" current={sort} label="성공률" onClick={toggleSort} />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const rowIndex = rows.indexOf(row);
              const checked = selected.has(rowIndex);
              return (
                <tr className={checked ? "tbl-selected" : ""} key={`${row.name}-${row.platform}`}>
                  <td className="table-select-cell" style={{ textAlign: "center" }}>
                    <label className="check-item" style={{ justifyContent: "center", margin: 0 }}>
                      <input checked={checked} onChange={(event) => toggleRow(row, event.target.checked)} type="checkbox" />
                      <span className="check-box" style={{ height: 15, width: 15 }}>
                        <CheckIcon size={9} />
                      </span>
                    </label>
                  </td>
                  <td>{row.name}</td>
                  <td>{row.platform}</td>
                  <td><Badge variant={row.status}>{row.statusLabel}</Badge></td>
                  <td>{row.send ? row.send.toLocaleString() : "—"}</td>
                  <td>{row.rate ? `${row.rate}%` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", padding: "var(--space-3) var(--space-5)" }}>
        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)" }}>
          {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sortedRows.length)} / 전체 {sortedRows.length}개
        </span>
        <Pagination
          current={page}
          onChange={setPage}
          onWindowChange={(next) => {
            setWindowStart(next);
            setPage(next);
          }}
          total={totalPages}
          windowStart={windowStart}
        />
      </div>
    </div>
  );
}

export function DropdownSortTableDemo() {
  const [sort, setSort] = useState<{ col: DropdownSortColumn | null; dir: SortDirection | "none" }>({ col: null, dir: "none" });
  const data = useMemo(() => {
    if (!sort.col || sort.dir === "none") return rows;
    return [...rows].sort((a, b) => compare(valueFor(a, sort.col!), valueFor(b, sort.col!), sort.dir as SortDirection));
  }, [sort]);

  const cols: Array<{ col: DropdownSortColumn; label: string }> = [
    { col: "name", label: "서비스명" },
    { col: "platform", label: "플랫폼" },
    { col: "status", label: "상태" },
    { col: "send", label: "전송량" },
    { col: "rate", label: "성공률" },
  ];

  return (
    <div className="table-wrap" style={{ border: "none", borderRadius: 0 }}>
      <table className="table-fixed">
        <colgroup>
          {dropdownTableColumns.map((className) => (
            <col className={className} key={className} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col.col}>
                <span className="table-sort-dropdown">
                  <span className="table-title-label">{col.label}</span>
                  <Dropdown
                    ariaLabel={`${col.label} 정렬 메뉴`}
                    label={<TableTitleChevron />}
                    menuClassName="table-sort-menu"
                    rootClassName="table-title-dropdown"
                    triggerClassName="table-title-menu"
                  >
                    <DropdownItem active={sort.col === col.col && sort.dir === "asc"} onClick={() => setSort({ col: col.col, dir: "asc" })}>오름차순 <Icon name="arrowUp" size={14} /></DropdownItem>
                    <DropdownItem active={sort.col === col.col && sort.dir === "desc"} onClick={() => setSort({ col: col.col, dir: "desc" })}>내림차순 <Icon name="arrowDown" size={14} /></DropdownItem>
                    <DropdownItem active={!sort.col || sort.dir === "none"} onClick={() => setSort({ col: null, dir: "none" })}>정렬 해제 <SortPairIcon /></DropdownItem>
                  </Dropdown>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`${row.name}-${row.platform}`}>
              <td>{row.name}</td>
              <td>{row.platform}</td>
              <td><Badge variant={row.status}>{row.statusLabel}</Badge></td>
              <td>{row.send ? row.send.toLocaleString() : "—"}</td>
              <td>{row.rate ? `${row.rate}%` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyTableDemo() {
  return (
    <div className="table-wrap" style={{ border: "none", borderRadius: 0 }}>
      <table className="table-fixed">
        <colgroup>
          {emptyTableColumns.map((className) => (
            <col className={className} key={className} />
          ))}
        </colgroup>
        <thead>
          <tr><th className="table-select-cell" /><th>서비스명</th><th>플랫폼</th><th>상태</th><th>전송량</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-empty-cell" colSpan={5} style={{ border: "none", padding: 0 }}>
              <EmptyState
                action={<button className="btn btn-md btn-primary" type="button">+ 서비스 추가</button>}
                description="등록된 서비스가 없습니다. 새 서비스를 추가하면 여기에 표시됩니다."
                icon={<Icon name="assignment" size={28} />}
                title="데이터가 없습니다"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SortableHeader({
  col,
  current,
  label,
  onClick,
}: {
  col: SortColumn;
  current: { col: SortColumn | null; dir: SortDirection };
  label: string;
  onClick: (col: SortColumn) => void;
}) {
  const active = current.col === col;
  return (
    <th className="th-sort" onClick={() => onClick(col)}>
      {label}
      {active ? (
        <Icon className={`sort-icon ${current.dir}`} name={current.dir === "asc" ? "arrowUp" : "arrowDown"} size={12} />
      ) : (
        <SortPairIcon />
      )}
    </th>
  );
}

function compare(a: string | number, b: string | number, dir: SortDirection) {
  const result = typeof a === "string" && typeof b === "string" ? a.localeCompare(b) : Number(a) - Number(b);
  return dir === "asc" ? result : -result;
}

function valueFor(row: Row, col: DropdownSortColumn) {
  return col === "status" ? row.statusLabel : row[col];
}

function TableTitleChevron() {
  return (
    <span className="table-title-chevron" aria-hidden="true">
      <Icon name="arrowDown" size={14} />
    </span>
  );
}

function SortPairIcon() {
  return (
    <span className="sort-icon sort-icon-pair" aria-hidden="true">
      <Icon name="arrowUp" size={9} />
      <Icon name="arrowDown" size={9} />
    </span>
  );
}
