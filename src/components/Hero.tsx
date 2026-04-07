import React from "react";
import { useAppStore } from "../store/useAppStore";

interface HeroProps {
  totalArticles: number;
}

export const Hero: React.FC<HeroProps> = ({ totalArticles }) => {
  const { allTags } = useAppStore();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "64px 24px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 300,
          background: "radial-gradient(ellipse, #cdb4db22 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "20%",
          width: 200,
          height: 200,
          background: "radial-gradient(ellipse, #a2d2ff18 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: "20%",
          width: 200,
          height: 200,
          background: "radial-gradient(ellipse, #ffc8dd18 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 9999,
            border: "1px solid #cdb4db55",
            backgroundColor: "#cdb4db11",
            color: "#cdb4db",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#cdb4db",
              display: "inline-block",
              animation: "pulseDot 2s ease infinite",
            }}
          />
          Live from Dev.to
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
            fontFamily: "JetBrains Mono",
          }}
        >
          <span className="gradient-text">Gouranga's</span>
          <br />
          <span style={{ color: "var(--text)" }}>Dev Blog</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            maxWidth: 480,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          Exploring web development, open source, and the craft of building
          things on the internet. Published on{" "}
          <a
            href="https://dev.to/gouranga-das-khulna"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a2d2ff", textDecoration: "none" }}
          >
            dev.to
          </a>
          .
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <Stat value={totalArticles} label="Articles" color="#cdb4db" />
          <Stat value={allTags.length} label="Topics" color="#ffc8dd" />
          <Stat value="∞" label="Learning" color="#a2d2ff" />
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{
  value: number | string;
  label: string;
  color: string;
}> = ({ value, label, color }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
        fontWeight: 800,
        color,
        lineHeight: 1,
        fontFamily: "JetBrains Mono",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 11,
        color: "var(--muted)",
        marginTop: 4,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  </div>
);
