declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_API_ADDRESS: string;
      }
    }
  }
  export {};
  