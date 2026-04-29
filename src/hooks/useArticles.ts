import { useEffect, useMemo } from "react";
import { devtoApi } from "../services/devto";
import { useAppStore } from "../store/useAppStore";
import type { DevToArticle } from "../types";

export function useArticles() {
  const {
    articles,
    loading,
    error,
    filters,
    setArticles,
    setLoading,
    setError,
    setAllTags,
  } = useAppStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await devtoApi.getArticles();
        setArticles(data);
        // Extract all unique tags
        const tags = Array.from(
          new Set(data.flatMap((a) => a.tag_list)),
        ).sort();
        setAllTags(tags);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    // Always fetch fresh data on component mount
    // This ensures latest blog is always shown
    load();

    // Refresh data every 5 minutes to keep it fresh
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter + sort + search
  const filtered = useMemo<DevToArticle[]>(() => {
    let result = [...articles];

    // Tag filter
    if (filters.tags.length > 0) {
      result = result.filter((a) =>
        filters.tags.every((tag) => a.tag_list.includes(tag)),
      );
    }

    // Search filter (local fallback)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tag_list.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Sort
    switch (filters.sort) {
      case "latest":
        result.sort(
          (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime(),
        );
        break;
      case "popular":
        result.sort(
          (a, b) => b.public_reactions_count - a.public_reactions_count,
        );
        break;
      case "reactions":
        result.sort(
          (a, b) => b.positive_reactions_count - a.positive_reactions_count,
        );
        break;
    }

    return result;
  }, [articles, filters.tags, filters.search, filters.sort]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / filters.perPage);
  const paginated = filtered.slice(
    (filters.page - 1) * filters.perPage,
    filters.page * filters.perPage,
  );

  return {
    articles: paginated,
    allFiltered: filtered,
    total: filtered.length,
    totalPages,
    loading,
    error,
  };
}
