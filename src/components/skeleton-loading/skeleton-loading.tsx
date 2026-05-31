export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={["skeleton", className].filter(Boolean).join(" ")} />;
}

export function SkeletonCard({ variant = "media" }: { variant?: "media" | "profile" }) {
  if (variant === "profile") {
    return (
      <div className="skeleton-card">
        <div style={{ alignItems: "center", display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          <Skeleton className="skeleton-avatar" />
          <div style={{ flex: 1 }}>
            <Skeleton className="skeleton-text" />
            <Skeleton className="skeleton-text" />
          </div>
        </div>
        <Skeleton className="skeleton-text" />
        <Skeleton className="skeleton-text" />
        <Skeleton className="skeleton-text" />
      </div>
    );
  }

  return (
    <div className="skeleton-card">
      <Skeleton className="skeleton-thumb" />
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-text" />
      <Skeleton className="skeleton-text" />
      <Skeleton className="skeleton-text" />
    </div>
  );
}
