import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import type { SortOption } from "../types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Most Popular" },
  { value: "reactions", label: "Most Reactions" },
];

const TAG_COLORS = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"];

export const Filters: React.FC<{ total: number }> = ({ total }) => {
  const { filters, setFilters, resetFilters, allTags } = useAppStore();
  const [sortOpen, setSortOpen] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const activeSort = SORT_OPTIONS.find((o) => o.value === filters.sort)!;
  const hasActiveFilters = filters.tags.length > 0 || filters.sort !== "latest";
  const visibleTags = tagsExpanded ? allTags : allTags.slice(0, 20);

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    setFilters({ tags: next, page: 1 });
  };

  const removeTag = (tag: string) => {
    setFilters({ tags: filters.tags.filter((t) => t !== tag), page: 1 });
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SlidersHorizontal size={14} style={{ color: "#cdb4db" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
            Filters
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--muted)",
              backgroundColor: "var(--surface2)",
              padding: "2px 7px",
              borderRadius: 9999,
            }}
          >
            {total} articles
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid var(--border)",
                backgroundColor: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#ffafcc";
                (e.currentTarget as HTMLButtonElement).style.color = "#ffafcc";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--muted)";
              }}
            >
              <RotateCcw size={11} /> Reset
            </button>
          )}

          {/* Sort dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface2)",
                color: "var(--text)",
                cursor: "pointer",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
                transition: "all 0.15s",
              }}
            >
              {activeSort.label}
              <ChevronDown
                size={11}
                style={{
                  transition: "transform 0.2s",
                  transform: sortOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>
            {sortOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  onClick={() => setSortOpen(false)}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    marginTop: 6,
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 4,
                    zIndex: 50,
                    minWidth: 160,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setFilters({ sort: opt.value, page: 1 });
                        setSortOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "7px 10px",
                        borderRadius: 7,
                        border: "none",
                        textAlign: "left",
                        backgroundColor:
                          filters.sort === opt.value
                            ? "var(--surface2)"
                            : "transparent",
                        color:
                          filters.sort === opt.value
                            ? "#cdb4db"
                            : "var(--text)",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "JetBrains Mono",
                        fontWeight: filters.sort === opt.value ? 600 : 400,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active tag chips */}
      {filters.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {filters.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 9999,
                backgroundColor: "#cdb4db22",
                border: "1px solid #cdb4db55",
                color: "#cdb4db",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              #{tag}
              <button
                onClick={() => removeTag(tag)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#cdb4db",
                  display: "flex",
                  padding: 0,
                }}
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag cloud */}
      {allTags.length > 0 && (
        <div>
          <p
            style={{
              fontSize: 11,
              color: "var(--muted)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Filter by tag
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {visibleTags.map((tag, i) => {
              const active = filters.tags.includes(tag);
              const color = TAG_COLORS[i % TAG_COLORS.length];
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: "3px 9px",
                    borderRadius: 9999,
                    border: `1px solid ${active ? color : "var(--border)"}`,
                    backgroundColor: active ? `${color}22` : "var(--surface2)",
                    color: active ? color : "var(--muted)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontFamily: "JetBrains Mono",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        color;
                      (e.currentTarget as HTMLButtonElement).style.color =
                        color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--muted)";
                    }
                  }}
                >
                  #{tag}
                </button>
              );
            })}
            {allTags.length > 20 && (
              <button
                onClick={() => setTagsExpanded(!tagsExpanded)}
                style={{
                  padding: "3px 9px",
                  borderRadius: 9999,
                  border: "1px dashed var(--border)",
                  backgroundColor: "transparent",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontSize: 11,
                  fontFamily: "JetBrains Mono",
                  transition: "all 0.15s",
                }}
              >
                {tagsExpanded ? "− Less" : `+${allTags.length - 20} more`}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
