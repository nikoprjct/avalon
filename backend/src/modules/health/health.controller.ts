// src/modules/health/health.controller.ts
import { Request, Response } from "express";
import { HealthService } from "./health.service";

export class HealthController {
  static getStatus(req: Request, res: Response) {
    res.json(HealthService.getStatus());
  }
}
