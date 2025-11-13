import { Client } from "minio";

if (!process.env.S3_ENDPOINT || !process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
  throw new Error("S3 env variables missing");
}

export const minioClient = new Client({
  endPoint: process.env.S3_ENDPOINT.replace(/^https?:\/\//, ""),
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY
});
