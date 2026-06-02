import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useAppStore } from "../store";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  total,
  perPage,
}) => {
  const { setFilters } = useAppStore();

  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    setFilters({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page numbers
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        paddingTop: 24,
      }}
    >
      <span style={{ fontSize: 12, color: "var(--muted)" }}>
        Showing {from}–{to} of {total} articles
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <PageBtn
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          icon={<ChevronLeft size={14} />}
        />

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`dot-${i}`}
              style={{ padding: "0 6px", color: "var(--muted)", fontSize: 13 }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              style={{
                minWidth: 34,
                height: 34,
                borderRadius: 8,
                border: `1px solid ${currentPage === p ? "#cdb4db" : "var(--border)"}`,
                backgroundColor:
                  currentPage === p ? "#cdb4db22" : "var(--surface2)",
                color: currentPage === p ? "#cdb4db" : "var(--text)",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "JetBrains Mono",
                fontWeight: currentPage === p ? 700 : 400,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== p) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#cdb4db";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#cdb4db";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== p) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--text)";
                }
              }}
            >
              {p}
            </button>
          ),
        )}

        <PageBtn
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={<ChevronRight size={14} />}
        />
      </div>

      {/* Per page selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>Per page:</span>
        {[6, 9, 12, 18].map((n) => (
          <button
            key={n}
            onClick={() => setFilters({ perPage: n, page: 1 })}
            style={{
              minWidth: 30,
              height: 26,
              borderRadius: 6,
              border: `1px solid ${perPage === n ? "#a2d2ff" : "var(--border)"}`,
              backgroundColor: perPage === n ? "#a2d2ff22" : "var(--surface2)",
              color: perPage === n ? "#a2d2ff" : "var(--muted)",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "JetBrains Mono",
              fontWeight: perPage === n ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

const PageBtn: React.FC<{
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}> = ({ onClick, disabled, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: 34,
      height: 34,
      borderRadius: 8,
      border: "1px solid var(--border)",
      backgroundColor: "var(--surface2)",
      color: disabled ? "var(--border)" : "var(--text)",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.15s",
    }}
    onMouseEnter={(e) => {
      if (!disabled)
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#cdb4db";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.borderColor =
        "var(--border)";
    }}
  >
    {icon}
  </button>
);
