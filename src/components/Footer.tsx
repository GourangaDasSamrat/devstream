import React from "react";
import { GitFork, Link2, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
        marginTop: 80,
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: "linear-gradient(135deg, #cdb4db, #a2d2ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                  D
                </span>
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 15,
                  background: "linear-gradient(135deg, #cdb4db, #a2d2ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                DevStream
              </span>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--muted)",
                maxWidth: 260,
                lineHeight: 1.6,
              }}
            >
              A personal blog aggregator fetching posts from Dev.to for Gouranga
              Das Samrat.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              style={{
                fontSize: 10,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              Connect
            </p>
            <FooterLink
              href="https://github.com/GourangaDasSamrat"
              icon={<GitFork size={12} />}
              label="GitHub @GourangaDasSamrat"
            />
            <FooterLink
              href="https://www.linkedin.com/in/gouranga-das-samrat/"
              icon={<Link2 size={12} />}
              label="LinkedIn"
            />
            <FooterLink
              href="https://dev.to/gouranga-das-khulna"
              icon={<ExternalLink size={12} />}
              label="Dev.to Profile"
            />
          </div>

          {/* License */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
              MIT License · Open Source
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "flex-end",
              }}
            >
              Made with{" "}
              <Heart size={10} style={{ color: "#ffc8dd", fill: "#ffc8dd" }} />{" "}
              by Gouranga Das Samrat
            </p>
            <p style={{ fontSize: 10, color: "var(--border)", marginTop: 4 }}>
              Powered by Dev.to API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "var(--muted)",
      textDecoration: "none",
      transition: "color 0.15s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "#cdb4db";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
    }}
  >
    {icon} {label}
  </a>
);
