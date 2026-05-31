const typographyRows = [
  {
    label: "4xl / Bold",
    meta: "3rem · 700",
    text: "서비스 제목",
    style: {
      fontSize: "var(--font-size-4xl)",
      fontWeight: 700,
      letterSpacing: "var(--letter-spacing-tight)",
      lineHeight: 1.15,
    },
  },
  {
    label: "3xl / Bold",
    meta: "2.25rem · 700",
    text: "페이지 제목",
    style: {
      fontSize: "var(--font-size-3xl)",
      fontWeight: 700,
      letterSpacing: "var(--letter-spacing-tight)",
    },
  },
  {
    label: "2xl / Semibold",
    meta: "1.875rem · 600",
    text: "섹션 제목",
    style: { fontSize: "var(--font-size-2xl)", fontWeight: 600 },
  },
  {
    label: "xl / Semibold",
    meta: "1.5rem · 600",
    text: "카드 타이틀",
    style: { fontSize: "var(--font-size-xl)", fontWeight: 600 },
  },
  {
    label: "lg / Medium",
    meta: "1.25rem · 500",
    text: "소제목 텍스트",
    style: { fontSize: "var(--font-size-lg)", fontWeight: 500 },
  },
  {
    label: "base / Regular",
    meta: "1rem · 400",
    text: "본문 텍스트입니다. 일반적인 콘텐츠와 설명에 사용됩니다.",
    style: {},
  },
  {
    label: "sm / Regular",
    meta: "0.875rem · 400",
    text: "보조 텍스트, 레이블, 설명에 사용됩니다.",
    style: { color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" },
  },
  {
    label: "xs / Medium",
    meta: "0.75rem · 500",
    text: "CAPTION · LABEL · OVERLINE",
    style: {
      color: "var(--color-text-muted)",
      fontSize: "var(--font-size-xs)",
      fontWeight: 500,
      letterSpacing: "var(--letter-spacing-wide)",
    },
  },
] as const;

export function TypographyFoundation() {
  return (
    <section className="gl-section" id="s-typography">
      <div className="gl-section-header">
        <p className="gl-section-label">Foundation</p>
        <h2 className="gl-section-title">Typography</h2>
        <p className="gl-section-desc">
          Noto Sans KR 단일 패밀리. 크기보다 웨이트로 위계를 표현합니다.
        </p>
      </div>

      {typographyRows.map((row) => (
        <div className="type-row" key={row.label}>
          <div className="type-meta">
            <p>{row.label}</p>
            <span>{row.meta}</span>
          </div>
          <div style={row.style}>{row.text}</div>
        </div>
      ))}
    </section>
  );
}
