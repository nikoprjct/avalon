import dotenv from "dotenv";
import path from "path";

// Загружаем .env, который лежит на два уровня выше (в /opt/avalon/dev/.env)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT || 5432),
    DB_USER: process.env.POSTGRES_USER!,
    DB_PASS: process.env.POSTGRES_PASSWORD!,
    DB_NAME: process.env.POSTGRES_DB!,
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: Number(process.env.REDIS_PORT!),
};