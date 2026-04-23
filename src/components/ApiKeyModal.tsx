import { AlertCircle, Loader2, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { summarizeWithGemini, validateGeminiApiKey } from "../services/gemini";

interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSummary: (summary: string) => void;
  articleContent: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  open,
  onClose,
  onSummary,
  articleContent,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  // Load saved API key from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem("gemini_api_key");
      if (stored) {
        setSavedKey(stored);
        setApiKey(stored);
      }
    }
  }, [open]);

  const handleValidateAndSummarize = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key");
      return;
    }

    setValidating(true);
    setError(null);

    try {
      // First validate the API key
      const validation = await validateGeminiApiKey(apiKey);
      if (!validation.valid) {
        setError(
          validation.error || "Invalid API key. Please add a new API key.",
        );
        setValidating(false);
        return;
      }

      // If valid, proceed with summarization
      setLoading(true);
      const result = await summarizeWithGemini(apiKey, articleContent);

      if (!result.success) {
        setError(
          result.error ||
            "Failed to generate summary. Please add a new API key.",
        );
        setLoading(false);
        setValidating(false);
        return;
      }

      // Success - save API key to localStorage and call callback
      localStorage.setItem("gemini_api_key", apiKey);
      setSavedKey(apiKey);
      onSummary(result.summary);
      setError(null);
      onClose();
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`,
      );
    } finally {
      setLoading(false);
      setValidating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && apiKey.trim()) {
      handleValidateAndSummarize();
    }
  };

  const handleClearSavedKey = () => {
    localStorage.removeItem("gemini_api_key");
    setSavedKey(null);
    setApiKey("");
    setError(null);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
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
          maxWidth: 500,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          animation: "slideUp 0.3s ease",
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
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text)",
              margin: 0,
            }}
          >
            Gemini API Key
          </h2>
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
        <div style={{ padding: "24px" }}>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            Enter your Gemini API key to enable AI-powered article summaries.
            Your API key is only used locally in your browser and is never
            stored or sent to our servers.
          </p>

          {/* API Key Input */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError(null);
              }}
              onKeyPress={handleKeyPress}
              placeholder="sk-... or AIza..."
              disabled={loading || validating}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: 13,
                border: error ? "1px solid #ffafcc" : "1px solid var(--border)",
                borderRadius: 8,
                backgroundColor: "var(--surface2)",
                color: "var(--text)",
                fontFamily: "JetBrains Mono",
                opacity: loading || validating ? 0.6 : 1,
                cursor: loading || validating ? "not-allowed" : "text",
                transition: "all 0.15s",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: 12,
                borderRadius: 8,
                backgroundColor: "#ffafcc18",
                border: "1px solid #ffafcc44",
                color: "#ffafcc",
                fontSize: 12,
                marginBottom: 16,
                lineHeight: 1.4,
              }}
            >
              <AlertCircle size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>
                  {error.includes("Invalid API key") ||
                  error.includes("Failed to generate")
                    ? "Add new API key:"
                    : "Error:"}
                </p>
                <p style={{ margin: 0 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Saved Key Status */}
          {savedKey && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
                borderRadius: 8,
                backgroundColor: "#a2d2ff18",
                border: "1px solid #a2d2ff44",
                color: "#a2d2ff",
                fontSize: 12,
                marginBottom: 20,
              }}
            >
              <span>✓ Saved API key loaded (you can change it above)</span>
              <button
                onClick={handleClearSavedKey}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#a2d2ff",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#a2d2ff22";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "transparent";
                }}
                title="Clear saved API key"
              >
                <Trash2 size={11} />
                Forget
              </button>
            </div>
          )}

          {/* Help Link */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted)",
                margin: "0 0 8px 0",
              }}
            >
              Don't have an API key?{" "}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#a2d2ff",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#bde0fe";
                  (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                    "underline";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#a2d2ff";
                  (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                    "none";
                }}
              >
                Get API key
              </a>
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted)",
                margin: "0 0 8px 0",
              }}
            >
              <a
                href="https://ai.google.dev/gemini-api/docs"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#a2d2ff",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#bde0fe";
                  (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                    "underline";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#a2d2ff";
                  (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                    "none";
                }}
              >
                API documentation
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={onClose}
              disabled={loading || validating}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface2)",
                color: "var(--text)",
                cursor: loading || validating ? "not-allowed" : "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s",
                opacity: loading || validating ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading && !validating) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "var(--surface3)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--surface2)";
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleValidateAndSummarize}
              disabled={!apiKey.trim() || loading || validating}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid #a2d2ff55",
                backgroundColor: "#a2d2ff18",
                color: "#a2d2ff",
                cursor:
                  !apiKey.trim() || loading || validating
                    ? "not-allowed"
                    : "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: !apiKey.trim() || loading || validating ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (apiKey.trim() && !loading && !validating) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#a2d2ff33";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#a2d2ff18";
              }}
            >
              {loading || validating ? (
                <Loader2
                  size={13}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : null}
              {loading
                ? "Summarizing..."
                : validating
                  ? "Validating..."
                  : "Generate Summary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
