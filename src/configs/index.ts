import dotenv from "dotenv";
dotenv.config();

interface IEnvVariables {
  DATABASE_URL: string;
  DATABASE_URL_DIRECT: string;
  PORT: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  BCRYPT_SALT_ROUND: string;
  APP_LOCAL_URL: string;
  COMMON_PASSWORD:string;
}
const loadEnvVariables = (): IEnvVariables => {
  const envVars: string[] = [
    "DATABASE_URL",
    "DATABASE_URL_DIRECT",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES_IN",
    "BCRYPT_SALT_ROUND",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES_IN",
    "APP_LOCAL_URL",
    "COMMON_PASSWORD",
  ];
  for (const varName of envVars) {
    if (!process.env[varName]) {
      throw new Error(`Required env variable missing: ${varName}`);
    }
  }
  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    DATABASE_URL_DIRECT: process.env.DATABASE_URL_DIRECT as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    APP_LOCAL_URL: process.env.APP_LOCAL_URL as string,
    COMMON_PASSWORD: process.env.COMMON_PASSWORD as string,
  };
};
export const envVars = loadEnvVariables();