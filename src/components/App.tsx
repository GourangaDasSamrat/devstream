import {
    AlertCircle,
    Calendar,
    Clock,
    ExternalLink,
    Heart,
    Loader2,
    MessageCircle,
    Tag,
    X,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { devtoApi } from "../services";
import { useAppStore } from "../store";
import type { DevToArticle } from "../types";

/** Dev.to single-article endpoint returns tag_list as a comma-separated string.
 *  This helper ensures it's always a clean string[]. */
function normalizeTagList(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return (raw as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export const BlogModal: React.FC = () => {
  const { modalOpen, selectedArticle, closeModal } = useAppStore();
  const [fullArticle, setFullArticle] = useState<DevToArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFull = useCallback(async (article: DevToArticle) => {
    setLoading(true);
    setError(null);
    try {
      const data = await devtoApi.getArticleById(article.id);
      setFullArticle({
        ...data,
        tag_list: normalizeTagList(
          data.tag_list as unknown as string | string[],
        ),
      });
    } catch {
      setError("Failed to load full article. Please try opening on Dev.to.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (modalOpen && selectedArticle) {
      setFullArticle(null);
      fetchFull(selectedArticle);
    }
  }, [modalOpen, selectedArticle]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeModal]);

  // Prevent background scroll
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (!modalOpen || !selectedArticle) return null;

  const article = fullArticle || selectedArticle;
  const cover = article.cover_image || article.social_image;

  return (
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px 16px",
        overflowY: "auto",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 780,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          animation: "slideUp 0.3s ease",
          marginTop: 0,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "var(--surface)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                color: "#cdb4db",
                backgroundColor: "#cdb4db18",
                border: "1px solid #cdb4db33",
                padding: "2px 8px",
                borderRadius: 9999,
                fontWeight: 600,
              }}
            >
              Preview
            </span>
            {loading && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                <Loader2
                  size={11}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Loading...
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #a2d2ff55",
                backgroundColor: "#a2d2ff18",
                color: "#a2d2ff",
                textDecoration: "none",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
                fontWeight: 600,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#a2d2ff33";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#a2d2ff18";
              }}
            >
              <ExternalLink size={11} />
              Open on Dev.to
            </a>
            <button
              onClick={closeModal}
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
        </div>

        {/* Scrollable content */}
        <div style={{ maxHeight: "calc(90vh - 60px)", overflowY: "auto" }}>
          {/* Cover */}
          {cover && (
            <div
              style={{
                position: "relative",
                paddingBottom: "42%",
                overflow: "hidden",
              }}
            >
              <img
                src={cover}
                alt={article.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div style={{ padding: "28px 28px 40px" }}>
            {/* Tags */}
            {article.tag_list.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 16,
                }}
              >
                {article.tag_list.map((tag, i) => {
                  const colors = [
                    "#cdb4db",
                    "#ffc8dd",
                    "#ffafcc",
                    "#bde0fe",
                    "#a2d2ff",
                  ];
                  const c = colors[i % colors.length];
                  return (
                    <span
                      key={tag}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        fontSize: 10,
                        fontWeight: 600,
                        color: c,
                        backgroundColor: `${c}18`,
                        border: `1px solid ${c}33`,
                      }}
                    >
                      <Tag size={8} />#{tag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 800,
                lineHeight: 1.3,
                color: "var(--text)",
                marginBottom: 16,
              }}
            >
              {article.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                paddingBottom: 20,
                borderBottom: "1px solid var(--border)",
                marginBottom: 24,
              }}
            >
              <MetaItem
                icon={<Calendar size={12} />}
                value={article.readable_publish_date}
              />
              <MetaItem
                icon={<Clock size={12} />}
                value={`${article.reading_time_minutes} min read`}
              />
              <MetaItem
                icon={<Heart size={12} />}
                value={`${article.positive_reactions_count} reactions`}
                color="#ffc8dd"
              />
              <MetaItem
                icon={<MessageCircle size={12} />}
                value={`${article.comments_count} comments`}
                color="#bde0fe"
              />
            </div>

            {/* Error state */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: "#ffafcc18",
                  border: "1px solid #ffafcc44",
                  color: "#ffafcc",
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Loading skeleton */}
            {loading && !fullArticle && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[100, 90, 100, 70, 100, 85, 60].map((w, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{ height: 14, width: `${w}%` }}
                  />
                ))}
              </div>
            )}

            {/* Markdown content */}
            {fullArticle?.body_markdown && (
              <div className="prose-custom">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {fullArticle.body_markdown}
                </ReactMarkdown>
              </div>
            )}

            {/* Fallback description */}
            {!loading && !fullArticle?.body_markdown && !error && (
              <p
                style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}
              >
                {article.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const MetaItem: React.FC<{
  icon: React.ReactNode;
  value: string;
  color?: string;
}> = ({ icon, value, color }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      color: color || "var(--muted)",
    }}
  >
    {icon} {value}
  </span>
);
