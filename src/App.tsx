import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { BlogCard } from "./components/BlogCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { Pagination } from "./components/Pagination";
import { BlogModal } from "./components/BlogModal";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { Footer } from "./components/Footer";
import { useArticles } from "./hooks/useArticles";
import { useTheme } from "./hooks/useTheme";
import { useAppStore } from "./store/useAppStore";

function App() {
  useTheme();
  const { articles, total, totalPages, loading, error } = useArticles();
  const { filters, articles: allArticles } = useAppStore();

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          padding: "0 24px",
        }}
      >
        <Hero totalArticles={allArticles.length} />
        <div style={{ marginBottom: 20 }}>
          <SearchBar />
        </div>
        <div style={{ marginBottom: 32 }}>
          {loading && allArticles.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{ height: 22, width: 60, borderRadius: 9999 }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Filters total={total} />
          )}
        </div>
        {error ? (
          <ErrorState message={error} />
        ) : loading && allArticles.length === 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {Array.from({ length: filters.perPage }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {articles.map((article, i) => (
                <BlogCard key={article.id} article={article} index={i} />
              ))}
            </div>
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              total={total}
              perPage={filters.perPage}
            />
          </>
        )}
      </main>
      <Footer />
      <BlogModal />
    </div>
  );
}

export default App;
