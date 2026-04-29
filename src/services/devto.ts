import type { DevToArticle } from "../types";

const BASE_URL = "https://dev.to/api";
const USERNAME = import.meta.env.VITE_DEVTO_USERNAME;

// Common fetch options to prevent cookie issues and ensure fresh data
const fetchOptions: RequestInit = {
  credentials: "omit",
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    pragma: "no-cache",
  },
};

export const devtoApi = {
  async getArticles(): Promise<DevToArticle[]> {
    const allArticles: DevToArticle[] = [];
    let page = 1;
    const perPage = 30;

    while (true) {
      // Add timestamp to URL to bypass Cloudflare/CDN caching
      const timestamp = Date.now();
      const res = await fetch(
        `${BASE_URL}/articles?username=${USERNAME}&page=${page}&per_page=${perPage}&t=${timestamp}`,
        fetchOptions,
      );
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data: DevToArticle[] = await res.json();
      if (data.length === 0) break;
      allArticles.push(...data);
      if (data.length < perPage) break;
      page++;
    }

    return allArticles;
  },

  async getArticleBySlug(slug: string): Promise<DevToArticle> {
    const timestamp = Date.now();
    const res = await fetch(
      `${BASE_URL}/articles/${USERNAME}/${slug}?t=${timestamp}`,
      fetchOptions,
    );
    if (!res.ok) throw new Error("Failed to fetch article");
    return res.json();
  },

  async getArticleById(id: number): Promise<DevToArticle> {
    const timestamp = Date.now();
    const res = await fetch(
      `${BASE_URL}/articles/${id}?t=${timestamp}`,
      fetchOptions,
    );
    if (!res.ok) throw new Error("Failed to fetch article");
    return res.json();
  },
};
