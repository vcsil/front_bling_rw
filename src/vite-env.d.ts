/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_BASE_URL: string;
    // mais variáveis de ambiente...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
