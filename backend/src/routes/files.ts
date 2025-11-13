import { Router, Response, Request } from "express";
import multer from "multer";
import { minioClient } from "../services/minio";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const BUCKET = process.env.S3_BUCKET || "avalon";

// Типизация Request с файлом
interface MulterRequest extends Request {
  file?: Express.Multer.File; // ? — теперь может быть undefined
}

// Проверка и создание бакета
minioClient.bucketExists(BUCKET)
  .then(exists => {
    if (!exists) {
      return minioClient.makeBucket(BUCKET, "").then(() => console.log(`✅ Bucket "${BUCKET}" created`));
    }
    console.log(`✅ Bucket "${BUCKET}" exists`);
  })
  .catch(console.error);

// Загрузка файла
router.post("/upload", upload.single("file"), async (req: MulterRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const objectName = req.file.originalname;
    await minioClient.putObject(BUCKET, objectName, req.file.buffer);
    res.json({ message: "File uploaded", objectName });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error });
  }
});

// Скачивание файла
router.get("/download/:filename", async (req: Request, res: Response) => {
  const filename = req.params.filename;

  if (!filename) {
    return res.status(400).json({ error: "Filename required" });
  }

  try {
    // Non-null assertion: говорим TS, что filename точно строка
    const stream = await minioClient.getObject(BUCKET, filename!);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    stream.pipe(res);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    res.status(404).json({ error });
  }
});



// Список файлов
router.get("/list", async (req: Request, res: Response) => {
  const objects: string[] = [];
  const stream = minioClient.listObjectsV2(BUCKET, "", true);

  stream.on("data", (obj) => {
    if (obj.name) {         // <-- проверка
      objects.push(obj.name);
    }
  });

  stream.on("end", () => res.json(objects));
  stream.on("error", (err: Error) => res.status(500).json({ error: err.message }));
});

export default router;
