/// <reference types="vite/client" />

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_DEVTO_USERNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

