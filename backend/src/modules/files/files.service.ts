// /src/modules/files/files.service.ts
import { Client as MinioClient } from "minio";
import { Readable } from "stream";

export class FilesService {
  private bucket: string;
  private minioClient: MinioClient;

  constructor() {
    // Проверка обязательных env переменных
    const endpoint = process.env.S3_ENDPOINT;
    const accessKey = process.env.S3_ACCESS_KEY;
    const secretKey = process.env.S3_SECRET_KEY;
    const bucket = process.env.S3_BUCKET || "avalon";

    if (!endpoint || !accessKey || !secretKey) {
      throw new Error("S3 env variables missing");
    }

    this.bucket = bucket;
    this.minioClient = new MinioClient({
      endPoint: endpoint.replace(/^https?:\/\//, ""), // гарантируем строку
      port: 443,
      useSSL: true,
      accessKey,
      secretKey,
    });

    // Создание бакета, если не существует
    this.minioClient.bucketExists(this.bucket)
      .then(exists => {
        if (!exists) {
          return this.minioClient.makeBucket(this.bucket, "").then(() => console.log(`✅ Bucket "${this.bucket}" created`));
        }
        console.log(`✅ Bucket "${this.bucket}" exists`);
      })
      .catch(console.error);
  }

  async uploadFile(buffer: Buffer, filename: string): Promise<string> {
    await this.minioClient.putObject(this.bucket, filename, buffer);
    return filename;
  }

  async downloadFile(filename: string): Promise<Readable> {
    return this.minioClient.getObject(this.bucket, filename);
  }

  async listFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const objects: string[] = [];
      const stream = this.minioClient.listObjectsV2(this.bucket, "", true);

      stream.on("data", obj => { if (obj.name) objects.push(obj.name); });
      stream.on("end", () => resolve(objects));
      stream.on("error", err => reject(err));
    });
  }

  async deleteFile(filename: string): Promise<void> {
    await this.minioClient.removeObject(this.bucket, filename);
  }
}
