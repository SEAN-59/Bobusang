"use client";

import { type DragEvent, type InputHTMLAttributes, type ReactNode, type Ref, useId, useMemo, useRef, useState } from "react";

import { Dropdown, DropdownItem, SelectArrow } from "@/components/dropdown/dropdown";
import { Icon } from "@/components/icon/icon";
import { useToast } from "@/components/toast-snackbar/toast-snackbar";

type FieldRule = {
  label: string;
  test: (value: string) => boolean;
};

const emailRules: FieldRule[] = [
  { label: "올바른 이메일 형식", test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
];

const passwordRules: FieldRule[] = [
  { label: "8자 이상", test: (value) => value.length >= 8 },
  { label: "영문 대문자 포함", test: (value) => /[A-Z]/.test(value) },
  { label: "영문 소문자 포함", test: (value) => /[a-z]/.test(value) },
  { label: "숫자 포함", test: (value) => /[0-9]/.test(value) },
  { label: "특수문자 포함 (!@#$%^&*)", test: (value) => /[!@#$%^&*]/.test(value) },
];

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
};

export function TextInput({ className, ref, ...props }: TextInputProps) {
  return <input {...props} className={["input", className].filter(Boolean).join(" ")} ref={ref} />;
}

export function FormGroup({
  children,
  hint,
  label,
  required = false,
}: {
  children: ReactNode;
  hint?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required ? <span style={{ color: "var(--color-danger)", marginLeft: 2 }}>*</span> : null}
      </label>
      {children}
      {hint ? <p className="form-hint">{hint}</p> : null}
    </div>
  );
}

export function FormError({ children, id }: { children: ReactNode; id?: string }) {
  return <p className="form-error" id={id}>{children}</p>;
}

export function ValidationRules({
  forceFail = false,
  rules,
  value,
}: {
  forceFail?: boolean;
  rules: FieldRule[];
  value: string;
}) {
  return (
    <ul className="validation-list">
      {rules.map((rule) => {
        const hasValue = value.length > 0;
        const passed = rule.test(value);
        const className = !hasValue && !forceFail ? "validation-rule" : passed ? "validation-rule pass" : "validation-rule fail";
        return (
          <li className={className} key={rule.label}>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export function FormDemo() {
  const { showToast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: false, name: false, password: false });
  const [forceValidationFail, setForceValidationFail] = useState({ email: false, password: false });
  const [shakeFields, setShakeFields] = useState({ email: false, name: false, password: false });

  const submit = () => {
    const nextErrors = {
      email: !emailRules.every((rule) => rule.test(email)),
      name: name.trim().length === 0,
      password: !passwordRules.every((rule) => rule.test(password)),
    };
    setErrors(nextErrors);
    setForceValidationFail({
      email: email.length === 0,
      password: password.length === 0,
    });
    setShakeFields({ email: false, name: false, password: false });
    requestAnimationFrame(() => setShakeFields(nextErrors));

    const firstErrorRef = nextErrors.name ? nameRef : nextErrors.email ? emailRef : nextErrors.password ? passwordRef : null;

    if (firstErrorRef?.current) {
      firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.current.focus();
      return;
    }

    showToast("success", "가입 완료", "회원가입이 완료되었습니다.");
    setName("");
    setEmail("");
    setPassword("");
    setErrors({ email: false, name: false, password: false });
    setForceValidationFail({ email: false, password: false });
    setShakeFields({ email: false, name: false, password: false });
  };

  return (
    <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", margin: "0 auto", maxWidth: 360, padding: "var(--space-8)" }}>
      <h3 style={{ fontSize: "var(--font-size-lg)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--space-6)" }}>
        회원가입
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            이름 <span style={{ color: "var(--color-danger)" }}>*</span>
          </label>
          <input
            className={["input", errors.name ? "is-error" : "", shakeFields.name ? "shake" : ""].filter(Boolean).join(" ")}
            onChange={(event) => {
              setName(event.target.value);
              if (event.target.value.trim()) setErrors((current) => ({ ...current, name: false }));
            }}
            onAnimationEnd={() => setShakeFields((current) => ({ ...current, name: false }))}
            placeholder="홍길동"
            ref={nameRef}
            type="text"
            value={name}
          />
          {errors.name ? <p className="form-error">이름을 입력해주세요.</p> : null}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            이메일 <span style={{ color: "var(--color-danger)" }}>*</span>
          </label>
          <input
            className={["input", errors.email ? "is-error" : "", shakeFields.email ? "shake" : ""].filter(Boolean).join(" ")}
            onChange={(event) => {
              setEmail(event.target.value);
              setForceValidationFail((current) => ({ ...current, email: false }));
              if (emailRules.every((rule) => rule.test(event.target.value))) {
                setErrors((current) => ({ ...current, email: false }));
              }
            }}
            onAnimationEnd={() => setShakeFields((current) => ({ ...current, email: false }))}
            placeholder="name@example.com"
            ref={emailRef}
            type="text"
            value={email}
          />
          {errors.email ? <p className="form-error">올바른 이메일 형식을 입력해주세요.</p> : null}
          <ValidationRules forceFail={forceValidationFail.email} rules={emailRules} value={email} />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            비밀번호 <span style={{ color: "var(--color-danger)" }}>*</span>
          </label>
          <div className="input-icon-wrap">
            <input
              className={["input input-with-icon-right", errors.password ? "is-error" : "", shakeFields.password ? "shake" : ""].filter(Boolean).join(" ")}
              onChange={(event) => {
                setPassword(event.target.value);
                setForceValidationFail((current) => ({ ...current, password: false }));
              if (passwordRules.every((rule) => rule.test(event.target.value))) {
                setErrors((current) => ({ ...current, password: false }));
                }
              }}
              onAnimationEnd={() => setShakeFields((current) => ({ ...current, password: false }))}
              placeholder="비밀번호를 입력하세요"
              ref={passwordRef}
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <button
              className="input-icon input-icon-right input-icon-btn"
              onClick={() => setPasswordVisible((value) => !value)}
              tabIndex={-1}
              title="비밀번호 표시"
              type="button"
            >
              <Icon name={passwordVisible ? "visibilityOff" : "visibility"} size={16} />
            </button>
          </div>
          {errors.password ? <p className="form-error">아래 조건을 모두 충족해주세요.</p> : null}
          <ValidationRules forceFail={forceValidationFail.password} rules={passwordRules} value={password} />
        </div>

        <button className="btn btn-lg btn-primary" onClick={submit} style={{ marginTop: "var(--space-2)", width: "100%" }} type="button">
          가입하기
        </button>
      </div>
    </div>
  );
}

export function TextareaCounter() {
  const [value, setValue] = useState("");
  const color = value.length > 180 ? "var(--color-danger)" : value.length > 150 ? "var(--color-warning)" : "var(--color-text-muted)";

  return (
    <div className="textarea-field">
      <div style={{ alignItems: "baseline", display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
        <label className="form-label" style={{ marginBottom: 0 }}>
          내용
        </label>
        <span style={{ color, fontSize: "var(--font-size-xs)" }}>{value.length} / 200</span>
      </div>
      <textarea
        className="input textarea"
        maxLength={200}
        onChange={(event) => setValue(event.target.value)}
        placeholder="내용을 입력하세요..."
        rows={4}
        value={value}
      />
    </div>
  );
}

export function CustomSelectDemo({
  error = false,
  placeholder = "선택하세요",
}: {
  error?: boolean;
  placeholder?: string;
}) {
  const [selected, setSelected] = useState("");
  const label = selected || placeholder;

  return (
    <Dropdown
      label={
        <>
          <span style={{ color: selected ? "var(--color-text-primary)" : "var(--color-text-disabled)" }}>{label}</span>
          <SelectArrow />
        </>
      }
      triggerClassName={error && !selected ? "input custom-select-btn is-error" : "input custom-select-btn"}
      width="trigger"
    >
      <DropdownItem onClick={() => setSelected("")}>선택하세요</DropdownItem>
      <DropdownItem onClick={() => setSelected("iOS (APNs)")}>iOS (APNs)</DropdownItem>
      <DropdownItem onClick={() => setSelected("Android (FCM)")}>Android (FCM)</DropdownItem>
      <DropdownItem onClick={() => setSelected("Web Push")}>Web Push</DropdownItem>
    </Dropdown>
  );
}

export function SearchInputDemo({
  inputLabel = "검색어",
  onClear,
  onSearch,
  placeholder = "검색어를 입력하세요",
  searchOnEnter = true,
  searchLabel = "검색",
  suggestions = [],
}: {
  inputLabel?: string;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  searchOnEnter?: boolean;
  searchLabel?: string;
  suggestions?: string[];
}) {
  const { showToast } = useToast();
  const listboxId = useId();
  const [value, setValue] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(() => {
    const keyword = value.trim().toLowerCase();

    if (keyword.length < 2) return [];

    return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(keyword));
  }, [suggestions, value]);

  const search = (nextValue = value) => {
    const keyword = nextValue.trim();

    if (!keyword) {
      showToast("warning", "검색어 없음", "검색어를 입력해주세요.");
      return;
    }

    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    onSearch?.(keyword);
    showToast("info", "검색 중", `"${keyword}" 검색 결과를 불러옵니다.`);
  };

  const clear = () => {
    setSpinning(false);
    requestAnimationFrame(() => setSpinning(true));
    setValue("");
    setActiveSuggestionIndex(-1);
    setSuggestionsOpen(false);
    onClear?.();
    showToast("success", "초기화 완료", "검색 필터가 초기화되었습니다.");
  };

  const selectSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  };

  const moveActiveSuggestion = (nextIndex: number) => {
    const nextActiveIndex = (nextIndex + filteredSuggestions.length) % filteredSuggestions.length;

    setSuggestionsOpen(true);
    setActiveSuggestionIndex(nextActiveIndex);
    requestAnimationFrame(() => {
      menuRef.current
        ?.querySelector<HTMLElement>(`[data-suggestion-index="${nextActiveIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
    });
  };

  return (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <div className="input-icon-wrap" style={{ flex: 1, position: "relative" }}>
        <span className="input-icon input-icon-left">
          <Icon name="search" size={14} />
        </span>
        <input
          aria-label={inputLabel}
          aria-activedescendant={
            suggestionsOpen && activeSuggestionIndex >= 0
              ? `${listboxId}-option-${activeSuggestionIndex}`
              : undefined
          }
          aria-autocomplete="list"
          aria-controls={filteredSuggestions.length > 0 ? listboxId : undefined}
          aria-expanded={suggestionsOpen && filteredSuggestions.length > 0}
          className="input input-with-icon-left input-with-icon-right"
          onBlur={() => window.setTimeout(() => {
            setSuggestionsOpen(false);
            setActiveSuggestionIndex(-1);
          }, 120)}
          onChange={(event) => {
            setValue(event.target.value);
            setSuggestionsOpen(true);
            setActiveSuggestionIndex(-1);
          }}
          onFocus={() => setSuggestionsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && filteredSuggestions.length > 0) {
              event.preventDefault();
              moveActiveSuggestion(activeSuggestionIndex < 0 ? 0 : activeSuggestionIndex + 1);
              return;
            }

            if (event.key === "ArrowUp" && filteredSuggestions.length > 0) {
              event.preventDefault();
              moveActiveSuggestion(activeSuggestionIndex < 0 ? filteredSuggestions.length - 1 : activeSuggestionIndex - 1);
              return;
            }

            if (event.key === "Enter") {
              if (suggestionsOpen && activeSuggestionIndex >= 0 && activeSuggestionIndex < filteredSuggestions.length) {
                event.preventDefault();
                selectSuggestion(filteredSuggestions[activeSuggestionIndex]);
                return;
              }

              if (searchOnEnter) {
                event.preventDefault();
                search();
              }
            }

            if (event.key === "Escape") {
              setSuggestionsOpen(false);
              setActiveSuggestionIndex(-1);
            }
          }}
          placeholder={placeholder}
          role="combobox"
          type="text"
          value={value}
        />
        {value ? (
          <button
            className="input-icon input-icon-right input-icon-btn"
            onClick={() => {
              setValue("");
              setActiveSuggestionIndex(-1);
              setSuggestionsOpen(false);
            }}
            style={{ display: "flex", right: "var(--space-2)" }}
            title="초기화"
            type="button"
          >
            <Icon name="close" size={12} />
          </button>
        ) : null}
        {suggestionsOpen && filteredSuggestions.length > 0 ? (
          <div className="search-suggestion-menu" id={listboxId} ref={menuRef} role="listbox">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                className={[
                  "search-suggestion-item",
                  activeSuggestionIndex === index ? "is-active" : "",
                ].filter(Boolean).join(" ")}
                key={suggestion}
                aria-selected={activeSuggestionIndex === index}
                data-suggestion-index={index}
                id={`${listboxId}-option-${index}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(suggestion)}
                role="option"
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button className={spinning ? "btn btn-md btn-secondary refresh-btn is-spinning" : "btn btn-md btn-secondary refresh-btn"} onAnimationEnd={() => setSpinning(false)} onClick={clear} style={{ flexShrink: 0, padding: 0, width: 38 }} title="필터 초기화" type="button">
        <Icon className="refresh-icon" name="refresh" size={15} />
      </button>
      <button className="btn btn-md btn-primary" onClick={() => search()} type="button">
        {searchLabel}
      </button>
    </div>
  );
}

export function CurrencyInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="input-icon-wrap">
      <span className="input-icon input-icon-left" style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)" }}>
        ₩
      </span>
      <input
        className="input input-with-icon-both"
        inputMode="numeric"
        onChange={(event) => {
          const raw = event.target.value.replace(/[^0-9]/g, "");
          setValue(raw ? Number(raw).toLocaleString("ko-KR") : "");
        }}
        placeholder="0"
        type="text"
        value={value}
      />
      <span className="input-icon input-icon-right" style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-medium)", right: "var(--space-3)" }}>
        KRW
      </span>
    </div>
  );
}

export function PhoneInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="input-icon-wrap">
      <span className="input-icon input-icon-left">
        <Icon name="mobileSetting" size={14} />
      </span>
      <input
        className="input input-with-icon-left"
        inputMode="numeric"
        maxLength={13}
        onChange={(event) => setValue(formatPhone(event.target.value))}
        placeholder="010-0000-0000"
        type="text"
        value={value}
      />
    </div>
  );
}

export function FileDropDemo() {
  const [files, setFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [dragging, setDragging] = useState(false);

  const loadFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles(Array.from(fileList).map((file) => ({ name: file.name, size: file.size })));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    loadFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <label
        className="file-drop"
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDrop={onDrop}
        style={dragging ? { background: "var(--color-accent-light)", borderColor: "var(--color-accent)" } : undefined}
      >
        <input multiple onChange={(event) => loadFiles(event.target.files)} style={{ display: "none" }} type="file" />
        <div className="file-drop-icon">
          <Icon name="assignment" size={28} />
        </div>
        <p className="file-drop-title">파일을 여기에 끌어다 놓거나</p>
        <p className="file-drop-sub">
          <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>클릭하여 선택</span>하세요
        </p>
        <p className="file-drop-limit">PNG, JPG, PDF · 최대 10MB</p>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
        {files.map((file) => (
          <div className="file-item" key={`${file.name}-${file.size}`}>
            <Icon name="docs" size={14} />
            <span className="file-item-name">{file.name}</span>
            <span className="file-item-size">{formatFileSize(file.size)}</span>
            <button className="file-item-remove" onClick={() => setFiles((current) => current.filter((item) => item !== file))} type="button">
              <Icon name="close" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DateInputDemo() {
  const { showToast } = useToast();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const setRangeStart = (value: string) => {
    if (end && value > end) {
      setStart(end);
      showToast("warning", "날짜 범위 오류", "시작일이 종료일을 초과해 종료일로 조정했습니다.");
      return;
    }
    setStart(value);
  };

  const setRangeEnd = (value: string) => {
    if (start && value < start) {
      setEnd(start);
      showToast("warning", "날짜 범위 오류", "종료일이 시작일보다 이전이어서 시작일로 조정했습니다.");
      return;
    }
    setEnd(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">날짜 선택</label>
        <CalendarInput placeholder="YYYY-MM-DD" />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">날짜 범위</label>
        <div className="date-range-row">
          <CalendarInput onChange={setRangeStart} placeholder="시작일" value={start} />
          <span className="date-separator">~</span>
          <CalendarInput onChange={setRangeEnd} placeholder="종료일" value={end} />
        </div>
      </div>
    </div>
  );
}

function CalendarInput({
  onChange,
  placeholder,
  value: controlledValue,
}: {
  onChange?: (value: string) => void;
  placeholder: string;
  value?: string;
}) {
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const [month, setMonth] = useState(() => new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const value = controlledValue ?? uncontrolledValue;

  const days = useMemo(() => buildCalendarDays(month, value), [month, value]);

  const pick = (date: string) => {
    if (controlledValue === undefined) setUncontrolledValue(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className="input-icon-wrap">
      <input
        aria-haspopup="dialog"
        className={open ? "input input-with-icon-right date-input is-open" : "input input-with-icon-right date-input"}
        onClick={() => setOpen((current) => !current)}
        placeholder={placeholder}
        readOnly
        ref={inputRef}
        type="text"
        value={value}
      />
      <button className="input-icon input-icon-right input-icon-btn date-icon-btn" onClick={() => setOpen((current) => !current)} tabIndex={-1} type="button">
        <Icon name="calendar" size={14} />
      </button>
      <div
        className={open ? "cal-popup open" : "cal-popup"}
        style={{
          left: 0,
          position: "absolute",
          top: "calc(100% + 4px)",
        }}
      >
        <div className="cal-header">
          <button className="cal-nav" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))} type="button">
            <Icon name="chevronBackward" size={14} />
          </button>
          <span className="cal-title">{month.getFullYear()}년 {month.getMonth() + 1}월</span>
          <button className="cal-nav" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))} type="button">
            <Icon name="chevronForward" size={14} />
          </button>
        </div>
        <div className="cal-weekdays">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => <div className="cal-weekday" key={day}>{day}</div>)}
        </div>
        <div className="cal-days">
          {days.map((day) => (
            <button className={day.className} key={day.dateString} onClick={() => pick(day.dateString)} type="button">
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatPhone(value: string) {
  const raw = value.replace(/[^0-9]/g, "");
  if (raw.length <= 3) return raw;
  if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
}

function formatFileSize(size: number) {
  return size < 1024 * 1024 ? `${(size / 1024).toFixed(1)}KB` : `${(size / 1024 / 1024).toFixed(1)}MB`;
}

function buildCalendarDays(month: Date, selected: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay + index);
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const adjacent = date.getMonth() !== month.getMonth();
    const isToday = date.getTime() === today.getTime();
    const isSelected = dateString === selected;
    const className = [
      "cal-day",
      adjacent ? "cal-day-adjacent" : "",
      isToday && !isSelected ? "cal-day-today" : "",
      isSelected ? "cal-day-selected" : "",
      date.getDay() === 0 && !isSelected && !adjacent ? "cal-day-sunday" : "",
      date.getDay() === 6 && !isSelected && !adjacent ? "cal-day-saturday" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return { className, dateString, label: String(date.getDate()) };
  });
}
