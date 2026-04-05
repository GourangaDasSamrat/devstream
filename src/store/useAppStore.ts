import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DevToArticle, ThemeMode, FilterState } from "../types";

interface AppState {
  // Articles
  articles: DevToArticle[];
  filteredArticles: DevToArticle[];
  loading: boolean;
  error: string | null;

  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Modal
  selectedArticle: DevToArticle | null;
  modalOpen: boolean;
  openModal: (article: DevToArticle) => void;
  closeModal: () => void;

  // Actions
  setArticles: (articles: DevToArticle[]) => void;
  setFilteredArticles: (articles: DevToArticle[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // All tags extracted from articles
  allTags: string[];
  setAllTags: (tags: string[]) => void;
}

const defaultFilters: FilterState = {
  tags: [],
  sort: "latest",
  search: "",
  page: 1,
  perPage: 9,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      articles: [],
      filteredArticles: [],
      loading: false,
      error: null,
      theme: "system",
      filters: defaultFilters,
      selectedArticle: null,
      modalOpen: false,
      allTags: [],

      setTheme: (theme) => set({ theme }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      openModal: (article) =>
        set({ selectedArticle: article, modalOpen: true }),
      closeModal: () => set({ modalOpen: false, selectedArticle: null }),

      setArticles: (articles) => set({ articles }),
      setFilteredArticles: (filteredArticles) => set({ filteredArticles }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setAllTags: (allTags) => set({ allTags }),
    }),
    {
      name: "devstream-store",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
