// src/app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

// Роуты модулей
import healthRoutes from "./modules/health/health.routes";
import usersRoutes from "./modules/users/users.routes";
import authRoutes from "./modules/auth/auth.routes";
import filesRoutes from "./modules/files/files.routes";
import classRoutes from "./modules/sys/sysClass.routes";

export default function createApp(): Application {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API маршруты
  app.use("/api/health", healthRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/files", filesRoutes);
  app.use("/api/sys/classes", classRoutes);

  // Глобальный обработчик ошибок
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  return app;
}
