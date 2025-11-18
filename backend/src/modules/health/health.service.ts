// src/modules/health/health.service.ts
export class HealthService {
  static getStatus() {
    return { status: "ok" };
  }
}
