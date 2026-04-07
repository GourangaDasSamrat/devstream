import React, { useState, useEffect } from "react";
import { Sun, Moon, Monitor, GitFork, Link2, Rss, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import type { ThemeMode } from "../types";

const ThemeIcon = ({ theme }: { theme: ThemeMode }) => {
  if (theme === "light") return <Sun size={15} />;
  if (theme === "dark") return <Moon size={15} />;
  return <Monitor size={15} />;
};

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const themeOptions: ThemeMode[] = ["light", "dark", "system"];
  const themeLabels = { light: "Light", dark: "Dark", system: "System" };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "var(--surface)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "linear-gradient(135deg, #cdb4db, #a2d2ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "JetBrains Mono",
                }}
              >
                D
              </span>
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 18,
                fontFamily: "JetBrains Mono",
                background:
                  "linear-gradient(135deg, #cdb4db, #ffc8dd, #a2d2ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DevStream
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Social links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginRight: 8,
              }}
            >
              <NavLink
                href="https://github.com/GourangaDasSamrat"
                icon={<GitFork size={15} />}
                label="GitHub"
              />
              <NavLink
                href="https://www.linkedin.com/in/gouranga-das-samrat/"
                icon={<Link2 size={15} />}
                label="LinkedIn"
              />
              <NavLink
                href="https://dev.to/gouranga-das-khulna"
                icon={<Rss size={15} />}
                label="Dev.to"
              />
            </div>

            {/* Theme toggle */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--surface2)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "JetBrains Mono",
                  transition: "all 0.15s",
                }}
              >
                <ThemeIcon theme={theme} />
                <span>{themeLabels[theme]}</span>
              </button>

              {themeOpen && (
                <>
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                    onClick={() => setThemeOpen(false)}
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
                      minWidth: 130,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    {themeOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTheme(t);
                          setThemeOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "7px 10px",
                          borderRadius: 7,
                          border: "none",
                          backgroundColor:
                            theme === t ? "var(--surface2)" : "transparent",
                          color: theme === t ? "#cdb4db" : "var(--text)",
                          cursor: "pointer",
                          fontSize: 12,
                          fontFamily: "JetBrains Mono",
                          fontWeight: theme === t ? 600 : 400,
                          textAlign: "left",
                          transition: "all 0.15s",
                        }}
                      >
                        <ThemeIcon theme={t} />
                        {themeLabels[t]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      borderRadius: 8,
      border: "1px solid var(--border)",
      backgroundColor: "var(--surface2)",
      color: "var(--muted)",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.15s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "#cdb4db";
      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#cdb4db";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
      (e.currentTarget as HTMLAnchorElement).style.borderColor =
        "var(--border)";
    }}
  >
    {icon}
  </a>
);
