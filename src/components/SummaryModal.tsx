import { Check, Copy, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

interface SummaryModalProps {
  open: boolean;
  summary: string;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  open,
  summary,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      onKeyDown={handleEscape}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          animation: "slideUp 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} style={{ color: "#cdb4db" }} />
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
              }}
            >
              AI Summary
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface2)",
              color: "var(--muted)",
              cursor: "pointer",
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
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            maxHeight: "calc(80vh - 120px)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--text)",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {summary}
          </div>
        </div>

        {/* Footer with buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            padding: "16px 24px",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--surface2)",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #cdb4db55",
              backgroundColor: "#cdb4db18",
              color: "#cdb4db",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#cdb4db33";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#cdb4db18";
              }
            }}
          >
            {copied ? (
              <>
                <Check size={13} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy
              </>
            )}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--surface3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--surface)";
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
