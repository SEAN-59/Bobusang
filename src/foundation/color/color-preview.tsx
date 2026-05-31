export function ColorFoundation() {
  return (
    <section className="gl-section" id="s-color">
      <div className="gl-section-header">
        <p className="gl-section-label">Foundation</p>
        <h2 className="gl-section-title">Color</h2>
        <p className="gl-section-desc">
          포인트 컬러는 HSL Hue 값 하나만 교체하면 전체 파생 색상이 자동으로 바뀝니다.
        </p>
      </div>

      <div className="gl-sub">
        <p className="gl-sub-title">Accent - 파생 6단계</p>
        <div className="swatch-grid">
          <Swatch label="accent" value="--color-accent" color="var(--color-accent)" />
          <Swatch label="accent-hover" value="--color-accent-hover" color="var(--color-accent-hover)" />
          <Swatch label="accent-light" value="--color-accent-light" color="var(--color-accent-light)" />
          <Swatch label="accent-subtle" value="--color-accent-subtle" color="var(--color-accent-subtle)" />
          <Swatch label="accent-border" value="--color-accent-border" color="var(--color-accent-border)" />
          <Swatch label="accent-text" value="--color-accent-text" color="var(--color-accent-text)" />
        </div>
      </div>

      <div className="gl-sub">
        <p className="gl-sub-title">Neutral</p>
        <div className="swatch-grid">
          <Swatch label="bg" value="#ffffff" color="#ffffff" hasBorder />
          <Swatch label="bg-secondary" value="#f8f8f8" color="var(--color-bg-secondary)" />
          <Swatch label="bg-tertiary" value="#f0f0f0" color="var(--color-bg-tertiary)" />
          <Swatch label="border" value="#e5e5e5" color="var(--color-border)" />
          <Swatch label="text-muted" value="#999999" color="var(--color-text-muted)" />
          <Swatch label="text-primary" value="#111111" color="var(--color-text-primary)" />
        </div>
      </div>

      <div className="gl-sub">
        <p className="gl-sub-title">Semantic</p>
        <div className="swatch-grid">
          <Swatch label="success" value="hsl(142,60%,42%)" color="var(--color-success)" />
          <Swatch label="warning" value="hsl(38,90%,48%)" color="var(--color-warning)" />
          <Swatch label="danger" value="hsl(0,68%,50%)" color="var(--color-danger)" />
          <Swatch label="info" value="hsl(200,70%,44%)" color="var(--color-info)" />
        </div>
      </div>
    </section>
  );
}

function Swatch({
  label,
  value,
  color,
  hasBorder = false,
}: {
  label: string;
  value: string;
  color: string;
  hasBorder?: boolean;
}) {
  return (
    <div className="swatch">
      <div
        className="swatch-color"
        style={{
          background: color,
          borderBottom: hasBorder ? "1px solid var(--color-border)" : undefined,
        }}
      />
      <div className="swatch-info">
        <p>{label}</p>
        <span>{value}</span>
      </div>
    </div>
  );
}
