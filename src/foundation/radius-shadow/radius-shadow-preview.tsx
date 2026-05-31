const radiusItems = [
  { label: "sm / 4px", value: "var(--radius-sm)" },
  { label: "md / 8px", value: "var(--radius-md)" },
  { label: "lg / 12px", value: "var(--radius-lg)" },
  { label: "xl / 16px", value: "var(--radius-xl)" },
  { label: "2xl / 24px", value: "var(--radius-2xl)" },
  { label: "full", value: "var(--radius-full)" },
];

const shadowItems = [
  { label: "none (border)", style: { border: "1px solid var(--color-border)" } },
  { label: "xs", style: { boxShadow: "var(--shadow-xs)" } },
  { label: "sm", style: { boxShadow: "var(--shadow-sm)" } },
  { label: "md", style: { boxShadow: "var(--shadow-md)" } },
  { label: "lg", style: { boxShadow: "var(--shadow-lg)" } },
  { label: "xl", style: { boxShadow: "var(--shadow-xl)" } },
];

export function RadiusShadowFoundation() {
  return (
    <section className="gl-section" id="s-radius">
      <div className="gl-section-header">
        <p className="gl-section-label">Foundation</p>
        <h2 className="gl-section-title">Radius &amp; Shadow</h2>
        <p className="gl-section-desc">
          그림자는 최소한으로 사용합니다. 경계는 border 또는 여백으로 표현하는 것을 권장합니다.
        </p>
      </div>

      <div className="gl-sub">
        <p className="gl-sub-title">Border Radius</p>
        <div className="radius-grid">
          {radiusItems.map((item) => (
            <div className="radius-item" key={item.label}>
              <div className="radius-box" style={{ borderRadius: item.value }} />
              <div className="radius-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="gl-sub">
        <p className="gl-sub-title">Shadow</p>
        <div className="shadow-grid">
          {shadowItems.map((item) => (
            <div className="shadow-item" key={item.label}>
              <div className="shadow-box" style={item.style} />
              <div className="shadow-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
