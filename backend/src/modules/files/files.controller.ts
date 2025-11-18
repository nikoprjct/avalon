import { Request, Response } from "express";
import { FilesService } from "./files.service";

const service = new FilesService();

export class FilesController {
  
  static async upload(req: Request, res: Response) {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const result = await service.uploadFile(req.file.buffer, req.file.originalname);
      res.json({ message: "File uploaded", file: result });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error });
    }
  }

  static async download(req: Request, res: Response) {
    try {
      const filename = req.params.filename;
      if (!filename) return res.status(400).json({ error: "Filename required" });

      const stream = await service.downloadFile(filename);
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      stream.pipe(res);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      res.status(404).json({ error });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const files = await service.listFiles();
      res.json(files);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const filename = req.params.filename;
      if (!filename) return res.status(400).json({ error: "Filename required" });

      await service.deleteFile(filename);
      res.json({ message: "File deleted" });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error });
    }
  }
}
