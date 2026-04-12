import type { DevToArticle } from "../types";

const BASE_URL = "https://dev.to/api";
const USERNAME = import.meta.env.VITE_DEVTO_USERNAME as string;

export const devtoApi = {
  async getArticles(): Promise<DevToArticle[]> {
    const allArticles: DevToArticle[] = [];
    let page = 1;
    const perPage = 30;

    while (true) {
      const res = await fetch(
        `${BASE_URL}/articles?username=${USERNAME}&page=${page}&per_page=${perPage}`,
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
    const res = await fetch(`${BASE_URL}/articles/${USERNAME}/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch article");
    return res.json();
  },

  async getArticleById(id: number): Promise<DevToArticle> {
    const res = await fetch(`${BASE_URL}/articles/${id}`);
    if (!res.ok) throw new Error("Failed to fetch article");
    return res.json();
  },
};
