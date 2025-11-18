import { Request, Response } from "express";
import { UsersService } from "./users.service";

const service = new UsersService();

export class UsersController {
  static async list(req: Request, res: Response) {
    try {
      const users = await service.list();
      res.json(users);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error });
    }
  }
}
