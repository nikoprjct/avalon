import { Router } from "express";
import { FilesController } from "./files.controller";

const router = Router();
router.post("/upload", FilesController.upload);
router.get("/download/:filename", FilesController.download);
router.get("/list", FilesController.list);
router.delete("/:filename", FilesController.delete);

export default router;
