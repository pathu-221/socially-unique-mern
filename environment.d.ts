declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ATLAS_URI: string;
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_SECRET_KEY: string;
      CLOUDINARY_CLOUD_NAME: string;
    }
  }
}
export { };