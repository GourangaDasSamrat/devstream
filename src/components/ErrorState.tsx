import { AlertTriangle, RefreshCw } from "lucide-react";
import React from "react";
import { devtoApi } from "../services";
import { useAppStore } from "../store";

export const ErrorState: React.FC<{ message: string }> = ({ message }) => {
  const { setArticles, setLoading, setError, setAllTags } = useAppStore();

  const retry = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await devtoApi.getArticles();
      setArticles(data);
      const tags = Array.from(new Set(data.flatMap((a) => a.tag_list))).sort();
      setAllTags(tags);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

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
          backgroundColor: "#ffafcc18",
          border: "1px solid #ffafcc33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertTriangle size={28} style={{ color: "#ffafcc" }} />
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
          Failed to load articles
        </h3>
        <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 340 }}>
          {message}
        </p>
      </div>

      <button
        onClick={retry}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid #ffafcc55",
          backgroundColor: "#ffafcc18",
          color: "#ffafcc",
          cursor: "pointer",
          fontSize: 12,
          fontFamily: "JetBrains Mono",
          fontWeight: 600,
          transition: "all 0.15s",
        }}
      >
        <RefreshCw size={12} /> Try again
      </button>
    </div>
  );
};
