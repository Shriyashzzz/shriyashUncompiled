import dotenv from "dotenv";

dotenv.config();

interface Config {
  DATABASE_URL: string;
  port: number;
  nodeEnv: string;
  JWT_SECRET: string;
  SMTP_PORT: number;
  SMTP_HOST: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  FROM_EMAIL: string;
  API_SERVER_URL: string;
  REDIS_URL: string;
  FEEDBACK_TO_EMAIL: string;
}

if (!process.env.JWT_SECRET) {
  throw new Error(
    "CRITICAL CONFIG ERROR: process.env.JWT_SECRET is not defined.",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "CRITICAL CONFIG ERROR: process.env.DATABASE_URL is not defined.",
  );
}
if (!process.env.API_SERVER_URL) {
  throw new Error(
    "CRITICAL CONFIG ERROR: process.env.API_SERVER_URL is not defined.",
  );
}

if (
  !process.env.FROM_EMAIL ||
  !process.env.SMTP_HOST ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASSWORD ||
  !process.env.SMTP_PORT
) {
  throw new Error(
    "CRITICAL CONFIG ERROR: SMTP Variable not defined, Double check",
  );
}

if (!process.env.REDIS_URL) {
  throw new Error("CRITICAL CONFIG ERROR: REDIS_URL Variable not defined.");
}
const config: Config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.ENV || "DEV",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
  API_SERVER_URL: process.env.API_SERVER_URL,
  REDIS_URL: process.env.REDIS_URL,
  // Where reader feedback lands. Defaults to FROM_EMAIL, which ImprovMX
  // forwards to the primary inbox.
  FEEDBACK_TO_EMAIL: process.env.FEEDBACK_TO_EMAIL || process.env.FROM_EMAIL,
} satisfies Config;

export default config;
