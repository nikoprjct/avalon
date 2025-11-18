// src/index.ts
import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import createApp from "./app";

dotenv.config();

const app = createApp();

AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Database connected");

    await AppDataSource.runMigrations();
    console.log("✅ Migrations applied");

    const PORT = Number(process.env.BACKEND_PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB initialization error:", err);
    process.exit(1);
  });
