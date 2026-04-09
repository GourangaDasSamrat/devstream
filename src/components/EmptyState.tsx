import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export const EmptyState: React.FC = () => {
  const { resetFilters } = useAppStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          backgroundColor: "var(--surface2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchX size={28} style={{ color: "var(--muted)" }} />
      </div>

      <div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 6,
          }}
        >
          No articles found
        </h3>
        <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 300 }}>
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>

      <button
        onClick={resetFilters}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid #cdb4db55",
          backgroundColor: "#cdb4db18",
          color: "#cdb4db",
          cursor: "pointer",
          fontSize: 12,
          fontFamily: "JetBrains Mono",
          fontWeight: 600,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#cdb4db33";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#cdb4db18";
        }}
      >
        <RotateCcw size={12} />
        Clear all filters
      </button>
    </div>
  );
};
