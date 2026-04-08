import React from "react";

export const SkeletonCard: React.FC = () => (
  <div
    style={{
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    {/* Cover skeleton */}
    <div
      className="skeleton"
      style={{ paddingBottom: "52%", position: "relative" }}
    >
      <div style={{ position: "absolute", inset: 0 }} />
    </div>

    <div
      style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}
    >
      {/* Tags */}
      <div style={{ display: "flex", gap: 6 }}>
        <div
          className="skeleton"
          style={{ height: 18, width: 50, borderRadius: 9999 }}
        />
        <div
          className="skeleton"
          style={{ height: 18, width: 60, borderRadius: 9999 }}
        />
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="skeleton" style={{ height: 16, width: "90%" }} />
        <div className="skeleton" style={{ height: 16, width: "70%" }} />
      </div>

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div className="skeleton" style={{ height: 12, width: "100%" }} />
        <div className="skeleton" style={{ height: 12, width: "80%" }} />
      </div>

      {/* Footer */}
      <div
        style={{
          paddingTop: 12,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div className="skeleton" style={{ height: 14, width: 30 }} />
          <div className="skeleton" style={{ height: 14, width: 30 }} />
          <div className="skeleton" style={{ height: 14, width: 30 }} />
        </div>
        <div className="skeleton" style={{ height: 14, width: 60 }} />
      </div>
    </div>
  </div>
);
