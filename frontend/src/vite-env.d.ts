interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly LAMBDA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
