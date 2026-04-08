import React from "react";
import { Heart, MessageCircle, Clock, ExternalLink, Eye } from "lucide-react";
import type { DevToArticle } from "../types";
import { useAppStore } from "../store/useAppStore";

const TAG_COLORS = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"];

interface BlogCardProps {
  article: DevToArticle;
  index?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, index = 0 }) => {
  const { openModal, setFilters, filters } = useAppStore();

  const toggleTag = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    setFilters({ tags: next, page: 1 });
  };

  const coverImage = article.cover_image || article.social_image;

  return (
    <article
      className="blog-card fade-in"
      style={{
        animationDelay: `${index * 0.05}s`,
        opacity: 0,
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => openModal(article)}
    >
      {/* Cover image */}
      {coverImage && (
        <div
          style={{
            position: "relative",
            paddingBottom: "52%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={coverImage}
            alt={article.title}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1)";
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {/* Tags */}
        {article.tag_list.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {article.tag_list.slice(0, 3).map((tag, i) => (
              <span
                key={tag}
                onClick={(e) => toggleTag(tag, e)}
                style={{
                  padding: "2px 8px",
                  borderRadius: 9999,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: TAG_COLORS[i % TAG_COLORS.length],
                  backgroundColor: `${TAG_COLORS[i % TAG_COLORS.length]}18`,
                  border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}33`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "JetBrains Mono",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.backgroundColor =
                    `${TAG_COLORS[i % TAG_COLORS.length]}33`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.backgroundColor =
                    `${TAG_COLORS[i % TAG_COLORS.length]}18`;
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.4,
            color: "var(--text)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 12,
            color: "var(--muted)",
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid var(--border)",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StatChip
              icon={<Heart size={11} />}
              value={article.positive_reactions_count}
              color="#ffc8dd"
            />
            <StatChip
              icon={<MessageCircle size={11} />}
              value={article.comments_count}
              color="#bde0fe"
            />
            <StatChip
              icon={<Clock size={11} />}
              value={`${article.reading_time_minutes}m`}
              color="#cdb4db"
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>
              {article.readable_publish_date}
            </span>
            <ActionBtn
              icon={<ExternalLink size={11} />}
              href={article.url}
              title="Open on Dev.to"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal(article);
              }}
              title="Preview article"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 8px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface2)",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: 10,
                fontFamily: "JetBrains Mono",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#cdb4db";
                (e.currentTarget as HTMLButtonElement).style.color = "#cdb4db";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--muted)";
              }}
            >
              <Eye size={11} /> Preview
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const StatChip: React.FC<{
  icon: React.ReactNode;
  value: number | string;
  color: string;
}> = ({ icon, value, color }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 3,
      fontSize: 11,
      color: "var(--muted)",
    }}
  >
    <span style={{ color }}>{icon}</span>
    {value}
  </span>
);

const ActionBtn: React.FC<{
  icon: React.ReactNode;
  href?: string;
  title: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ icon, href, title, onClick }) => {
  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: 6,
    border: "1px solid var(--border)",
    backgroundColor: "var(--surface2)",
    color: "var(--muted)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.15s",
  };
  const hover = (e: React.MouseEvent, enter: boolean) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = enter ? "#a2d2ff" : "var(--border)";
    el.style.color = enter ? "#a2d2ff" : "var(--muted)";
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        style={style}
        onClick={onClick}
        onMouseEnter={(e) => hover(e, true)}
        onMouseLeave={(e) => hover(e, false)}
      >
        {icon}
      </a>
    );
  }
  return (
    <button
      title={title}
      style={style}
      onClick={onClick}
      onMouseEnter={(e) => hover(e, true)}
      onMouseLeave={(e) => hover(e, false)}
    >
      {icon}
    </button>
  );
};
