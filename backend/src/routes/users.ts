import { Router, Request, Response } from "express";
import { redis } from "../services/redis";
import { pool } from "../services/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const cache = await redis.get("users");
    if (cache) return res.json(JSON.parse(cache));

    const { rows } = await pool.query("SELECT * FROM users LIMIT 10");
    await redis.set("users", JSON.stringify(rows), "EX", 60);
    res.json(rows);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error });
  }
});

export default router;
