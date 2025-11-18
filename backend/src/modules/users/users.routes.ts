import { Router } from "express";
import { UsersController } from "./users.controller";

const router = Router();
router.get("/", UsersController.list);

export default router;
