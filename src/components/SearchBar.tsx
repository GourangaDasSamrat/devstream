import React, { useCallback, useRef } from "react";
import { Search, X } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { useDebouncedCallback } from "../hooks/useDebounce";

export const SearchBar: React.FC = () => {
  const { filters, setFilters } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilters({ search: value, page: 1 });
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFilters({ search: "", page: 1 });
  };

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
      <Search
        size={14}
        style={{
          position: "absolute",
          left: 13,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--muted)",
          pointerEvents: "none",
        }}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search articles..."
        defaultValue={filters.search}
        onChange={handleChange}
        style={{
          width: "100%",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          fontFamily: "JetBrains Mono",
          fontSize: 13,
          padding: "9px 36px 9px 36px",
          borderRadius: 8,
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#cdb4db";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border)";
        }}
      />
      {filters.search && (
        <button
          onClick={clearSearch}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
