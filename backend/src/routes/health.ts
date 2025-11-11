import { Router } from 'express';
const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.ENV || 'dev' });
});

export default router;
