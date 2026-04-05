export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string;
  readable_publish_date: string;
  published_at: string;
  tag_list: string[];
  tags: string;
  slug: string;
  path: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  page_views_count: number;
  reading_time_minutes: number;
  body_markdown?: string;
  body_html?: string;
  user: {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
}

export type ThemeMode = "light" | "dark" | "system";

export type SortOption = "latest" | "oldest" | "popular" | "reactions";

export interface FilterState {
  tags: string[];
  sort: SortOption;
  search: string;
  page: number;
  perPage: number;
}

export interface AlgoliaHit {
  objectID: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  published_at: string;
  reading_time_minutes: number;
  cover_image: string | null;
  positive_reactions_count: number;
}
