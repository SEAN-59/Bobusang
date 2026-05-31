const spacingRows = [
  { name: "--space-1", px: "4px", rem: "0.25rem", width: 4 },
  { name: "--space-2", px: "8px", rem: "0.5rem", width: 8 },
  { name: "--space-3", px: "12px", rem: "0.75rem", width: 12 },
  { name: "--space-4", px: "16px", rem: "1rem", width: 16 },
  { name: "--space-5", px: "20px", rem: "1.25rem", width: 20 },
  { name: "--space-6", px: "24px", rem: "1.5rem", width: 24 },
  { name: "--space-8", px: "32px", rem: "2rem", width: 32 },
  { name: "--space-10", px: "40px", rem: "2.5rem", width: 40 },
  { name: "--space-12", px: "48px", rem: "3rem", width: 48 },
  { name: "--space-16", px: "64px", rem: "4rem", width: 64 },
  { name: "--space-20", px: "80px", rem: "5rem", width: 80 },
];

export function SpacingFoundation() {
  return (
    <section className="gl-section" id="s-spacing">
      <div className="gl-section-header">
        <p className="gl-section-label">Foundation</p>
        <h2 className="gl-section-title">Spacing</h2>
        <p className="gl-section-desc">4px 기본 단위 스케일.</p>
      </div>

      <div>
        {spacingRows.map((space) => (
          <div className="spacing-row" key={space.name}>
            <div className="spacing-bar" style={{ width: `${space.width}px` }} />
            <span className="spacing-meta">
              {space.name} = {space.px} / {space.rem}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
